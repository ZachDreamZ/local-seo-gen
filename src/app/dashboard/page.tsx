import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/dashboard/templates" className="p-6 border rounded-lg hover:bg-zinc-50 transition-colors">
          <h2 className="text-xl font-semibold mb-2">Templates</h2>
          <p className="text-zinc-600">Manage your SEO page templates</p>
        </Link>
        <Link href="/dashboard/generator" className="p-6 border rounded-lg hover:bg-zinc-50 transition-colors">
          <h2 className="text-xl font-semibold mb-2">Generator</h2>
          <p className="text-zinc-600">Generate new programmatic pages</p>
        </Link>
        <Link href="/dashboard/city-lists" className="p-6 border rounded-lg hover:bg-zinc-50 transition-colors">
          <h2 className="text-xl font-semibold mb-2">City Lists</h2>
          <p className="text-zinc-600">Manage your target cities CSVs</p>
        </Link>
        <Link href="/dashboard/pages" className="p-6 border rounded-lg hover:bg-zinc-50 transition-colors">
          <h2 className="text-xl font-semibold mb-2">Generated Pages</h2>
          <p className="text-zinc-600">View and manage all created pages</p>
        </Link>
      </div>
    </div>
  );
}
