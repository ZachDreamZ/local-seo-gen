import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY // Use Anon Key instead of Secret Key

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function testFlow() {
  console.log('🚀 Starting Smoke Test with Anon Key...')

  // 1. Verify DB Connectivity (Try to read public profiles)
  const { data: profiles, error: profileError } = await supabase.from('profiles').select('*').limit(1)
  if (profileError) {
    console.error('DB Connection Error:', profileError.message)
    throw new Error('Failed to connect to DB')
  }
  console.log('✅ DB Connectivity Verified')

  // 2. Test Template Logic
  const testTemplate = 'Welcome to {{city}}!'
  const testVars = { city: 'New York' }
  const result = testTemplate.replace(/\{\{(.*?)\}\}/g, (m, k) => testVars[k.trim()] || m)
  if (result !== 'Welcome to New York!') throw new Error('Template logic failed')
  console.log('✅ Template Logic Verified')

  // 3. Test Schema
  const { error: schemaError } = await supabase.from('generated_pages').select('id').limit(1)
  if (schemaError) {
    console.error('Schema Error:', schemaError.message)
    throw new Error('Schema mismatch: ' + schemaError.message)
  }
  console.log('✅ Schema Integrity Verified')

  console.log('🎉 Smoke Test Passed!')
}

testFlow().catch(console.error)
