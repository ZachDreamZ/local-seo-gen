import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { resolveTemplate } from '@/utils/template'
import { Metadata } from 'next'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: page } = await supabase
    .from('generated_pages')
    .select(`
      templates ( name ),
      cities ( city_name, state_name )
    `)
    .eq('slug', slug)
    .single()

  if (!page) return { title: 'Page Not Found' }

  const city = page.cities as any
  const title = `${page.templates?.name || 'Our Services'} in ${city?.city_name}, ${city?.state_name}`
  
  return {
    title,
    description: `Professional ${page.templates?.name || 'services'} in ${city?.city_name}, ${city?.state_name}. Contact us today!`,
  }
}

export default async function PublicPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: page, error: pageError } = await supabase
    .from('generated_pages')
    .select(`
      id,
      is_published,
      templates ( content ),
      cities ( city_name, state_name, custom_data )
    `)
    .eq('slug', slug)
    .single()

  if (pageError || !page || !page.is_published) {
    notFound()
  }

  const template = page.templates as any
  const city = page.cities as any

  const variables: Record<string, string> = {
    city: city.city_name,
    state: city.state_name || '',
    ...city.custom_data,
  }

  const finalContent = resolveTemplate(template.content, variables)

  return (
    <div 
      className="max-w-4xl mx-auto p-8"
      dangerouslySetInnerHTML={{ __html: finalContent }} 
    />
  )
}
