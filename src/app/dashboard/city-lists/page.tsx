import { createAdminClient } from '@/utils/supabase/admin'

export const dynamic = 'force-dynamic'

export default async function CityListsPage() {
  const supabase = createAdminClient()

  const { data: lists, error } = await supabase
    .from('city_lists')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <div>Error loading city lists: {error.message}</div>
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">City Lists</h1>
        <a 
          href="/dashboard/city-lists/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create New List
        </a>
      </div>

      <div className="grid gap-4">
        {lists?.length === 0 && (
          <p className="text-gray-500 text-center py-12">No city lists found. Create your first one!</p>
        )}
        {lists?.map((list) => (
          <div key={list.id} className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 transition">
            <div>
              <h3 className="font-medium text-lg">{list.name}</h3>
              <p className="text-sm text-gray-500">Created on {new Date(list.created_at).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
              <a 
                href={`/dashboard/city-lists/${list.id}`} 
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Manage Cities
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
