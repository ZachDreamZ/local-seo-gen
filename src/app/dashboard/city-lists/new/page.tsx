import CityListForm from '@/components/CityListForm'

export default async function NewCityListPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New City List</h1>
      <CityListForm />
    </div>
  )
}
