'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Papa from 'papaparse'

export default function CityUploadForm({ listId }: { listId: string }) {
  const [uploading, setUploading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const data = results.data
          .filter((row: any) => row.city || row.City) // Basic validation: must have a city
          .map((row: any) => ({
            list_id: listId,
            city_name: row.city || row.City,
            state_name: row.state || row.State,
            slug: row.slug || `${(row.city || row.City)?.toLowerCase().replace(/\s+/g, '-')}-${(row.state || row.State)?.toLowerCase().replace(/\s+/g, '-')}`,
            custom_data: { ...row },
          }))

        const { error } = await supabase.from('cities').insert(data)

        if (error) {
          alert('Error uploading cities: ' + error.message)
        } else {
          router.refresh()
        }
        setUploading(false)
      },
    })
  }

  return (
    <div className="p-6 border-2 border-dashed rounded-xl bg-gray-50 text-center">
      <h3 className="text-lg font-medium mb-2">Upload Cities CSV</h3>
      <p className="text-sm text-gray-500 mb-4">
        Expected columns: city, state, slug (optional).
      </p>
      <div className="flex justify-center">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          disabled={uploading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
      {uploading && <p className="mt-2 text-blue-600 text-sm animate-pulse">Processing cities...</p>}
    </div>
  )
}
