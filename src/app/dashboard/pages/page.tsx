import { createClient } from '@/utils/supabase/server'

export default async function PagesPage() {
  const supabase = await createClient()

  const { data: pages, error } = await supabase
    .from('generated_pages')
    .select(`
      id,
      slug,
      is_published,
      templates ( name ),
      cities ( city_name )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    return <div>Error loading pages: {error.message}</div>
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Generated Pages</h1>
        <a 
          href="/dashboard/generator" 
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Generate More
        </a>
      </div>

      <div className="grid gap-4">
        {pages?.length === 0 && (
          <p className="text-gray-500 text-center py-12">No pages generated yet. Try the generator!</p>
        )}
        {pages?.map((page) => (
          <div key={page.id} className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 transition">
            <div>
              <h3 className="font-medium text-lg">
                {(page.cities as any)?.city_name} - {(page.templates as any)?.name}
              </h3>
              <p className="text-sm text-gray-500 font-mono">/p/{page.slug}</p>
            </div>
            <div className="flex gap-2">
              <a 
                href={`/p/${page.slug}`} 
                target="_blank"
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                View Page
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
