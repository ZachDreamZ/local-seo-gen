import TemplateForm from '@/components/TemplateForm'

export const dynamic = 'force-dynamic'

export default async function NewTemplatePage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Template</h1>
      <TemplateForm />
    </div>
  )
}

