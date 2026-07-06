'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function GeneratorForm({ templates, lists }: { templates: any[], lists: any[] }) {
  const [templateId, setTemplateId] = useState('')
  const [listId, setListId] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      alert('Please sign in')
      setLoading(false)
      return
    }

    // Check subscription status
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_subscribed')
      .eq('id', user.id)
      .single()

    if (!profile?.is_subscribed) {
      alert('You need an active subscription to generate pages. Please upgrade your plan!')
      setLoading(false)
      return
    }

    // 1. Get all cities for the selected list

    const { data: cities, error: citiesError } = await supabase
      .from('cities')
      .select('id, city_name, state_name, slug')
      .eq('list_id', listId)

    if (citiesError || !cities) {
      alert('Error fetching cities: ' + citiesError?.message)
      setLoading(false)
      return
    }

    // 2. Map cities to generated pages
    const pages = cities.map(city => ({
      user_id: user.id,
      template_id: templateId,
      city_id: city.id,
      slug: `services-in-${city.slug}`, // Simple slug generation
      is_published: true,
    }))

    const { error: pagesError } = await supabase.from('generated_pages').insert(pages)

    setLoading(false)

    if (pagesError) {
      alert('Error generating pages: ' + pagesError.message)
      return
    }

    router.push('/dashboard/pages')
    router.refresh()
  }

  return (
    <form onSubmit={handleGenerate} className="space-y-6 p-6 border rounded-xl bg-white shadow-sm">
      <div>
        <label className="block text-sm font-medium mb-1">Select Template</label>
        <select
          value={templateId}
          onChange={(e) => setTemplateId(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        >
          <option value="">Choose a template...</option>
          {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Select City List</label>
        <select
          value={listId}
          onChange={(e) => setListId(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        >
          <option value="">Choose a list...</option>
          {lists.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 disabled:opacity-50 transition"
      >
        {loading ? 'Generating Pages...' : '🚀 Generate Landing Pages'}
      </button>
    </form>
  )
}
