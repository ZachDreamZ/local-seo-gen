import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function TemplatesPage() {
  const supabase = await createClient()

  const { data: templates, error } = await supabase
    .from('templates')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <div>Error loading templates: {error.message}</div>
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Templates</h1>
        <a 
          href="/dashboard/templates/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Template
        </a>
      </div>

      <div className="grid gap-4">
        {templates?.length === 0 && (
          <p className="text-gray-500 text-center py-12">No templates found. Create your first one!</p>
        )}
        {templates?.map((template) => (
          <div key={template.id} className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 transition">
            <div>
              <h3 className="font-medium text-lg">{template.name}</h3>
              <p className="text-sm text-gray-500 truncate max-w-md">
                {template.content.substring(0, 100)}...
              </p>
            </div>
            <div className="flex gap-2">
              <a 
                href={`/dashboard/templates/edit/${template.id}`} 
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Edit
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
