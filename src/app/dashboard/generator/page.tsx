import { createAdminClient } from '@/utils/supabase/admin'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function GeneratorPage() {
  const supabase = createAdminClient()

  const { data: templates } = await supabase.from('templates').select('*')
  const { data: lists } = await supabase.from('city_lists').select('*')

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Generate Pages</h1>
      <GeneratorForm templates={templates || []} lists={lists || []} />
    </div>
  )
}

import GeneratorForm from '@/components/GeneratorForm'
