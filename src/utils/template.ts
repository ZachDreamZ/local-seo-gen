export function resolveTemplate(content: string, variables: Record<string, string>) {
  return content.replace(/\{\{(.*?)\}\}/g, (match, key) => {
    return variables[key.trim()] || match
  })
}
