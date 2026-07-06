'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function TemplateForm({ template = null }: { template?: any }) {
  const [name, setName] = useState(template?.name || '')
  const [content, setContent] = useState(template?.content || '')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('templates').upsert({
      id: template?.id,
      name,
      content,
      user_id: (await supabase.auth.getUser()).data.user?.id,
    })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    router.push('/dashboard/templates')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Template Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="e.g. Plumbing Home Page"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Content (Use {"{{city}}"}, {"{{state}}"}, {"{{service}}"} placeholders)
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-64 p-2 border rounded-lg font-mono text-sm"
          placeholder="Best plumbing services in {{city}}, {{state}}! We offer top-notch {{service}} for all your needs..."
          required
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Template'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/dashboard/templates')}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
