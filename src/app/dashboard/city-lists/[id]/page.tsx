import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function ManageCitiesPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: list, error: listError } = await supabase
    .from('city_lists')
    .select('*')
    .eq('id', id)
    .single()

  if (listError || !list) {
    redirect('/dashboard/city-lists')
  }

  const { data: cities, error: citiesError } = await supabase
    .from('cities')
    .select('*')
    .eq('list_id', id)
    .order('city_name')

  if (citiesError) {
    return <div>Error loading cities: {citiesError.message}</div>
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">{list.name}</h1>
          <p className="text-gray-500">Manage cities for this campaign</p>
        </div>
        <a href="/dashboard/city-lists" className="text-gray-600 hover:underline">Back to Lists</a>
      </div>

      <CityUploadForm listId={id} />

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Cities in this List</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4">City</th>
                <th className="py-2 px-4">State</th>
                <th className="py-2 px-4">Slug</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cities?.map((city) => (
                <tr key={city.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{city.city_name}</td>
                  <td className="py-2 px-4">{city.state_name}</td>
                  <td className="py-2 px-4 font-mono text-xs">{city.slug}</td>
                  <td className="py-2 px-4">
                    <button className="text-red-600 hover:underline text-sm">Delete</button>
                  </td>
                </tr>
              ))}
              {cities?.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500">No cities added yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

import CityUploadForm from '@/components/CityUploadForm'
