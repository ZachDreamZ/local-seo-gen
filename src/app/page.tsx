import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f3ea] text-[#15120d]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-14">
        <div className="absolute inset-x-0 top-0 h-2 bg-[linear-gradient(90deg,#15120d,#d35f2d,#f0b44d,#2f6f5e)]" />

        <nav className="flex items-center justify-between py-6">
          <div className="font-mono text-sm font-bold uppercase tracking-[0.28em]">Local SEO Gen</div>
          <div className="flex items-center gap-3 text-sm font-medium">
            <Link href="/p/best-plumber-new-york" className="hidden rounded-full px-4 py-2 hover:bg-black/5 sm:inline-block">
              Live sample
            </Link>
            <Link href="/dashboard" className="rounded-full bg-[#15120d] px-5 py-2.5 text-white shadow-[6px_6px_0_#d35f2d] transition hover:-translate-y-0.5">
              Open dashboard
            </Link>
          </div>
        </nav>

        <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-[#15120d]/15 bg-white/55 px-4 py-2 font-mono text-xs uppercase tracking-[0.22em] text-[#6f3b24]">
              Programmatic local landing pages
            </p>
            <h1 className="max-w-4xl text-5xl font-black tracking-[-0.06em] sm:text-7xl lg:text-8xl">
              Turn one service template into every city page you need.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#51483b] sm:text-xl">
              Upload cities, write one reusable offer, generate clean SEO pages with city and state variables resolved server-side.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard/templates" className="rounded-full bg-[#d35f2d] px-7 py-4 text-center font-bold text-white shadow-[8px_8px_0_#15120d] transition hover:-translate-y-0.5">
                Create template
              </Link>
              <Link href="/dashboard/generator" className="rounded-full border border-[#15120d]/20 bg-white/70 px-7 py-4 text-center font-bold hover:bg-white">
                Generate pages
              </Link>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-[#15120d]/10 bg-[#15120d] p-4 text-white shadow-2xl">
            <div className="rounded-[1.5rem] bg-[#211b14] p-5">
              <div className="mb-5 flex gap-2">
                <span className="h-3 w-3 rounded-full bg-[#d35f2d]" />
                <span className="h-3 w-3 rounded-full bg-[#f0b44d]" />
                <span className="h-3 w-3 rounded-full bg-[#2f6f5e]" />
              </div>
              <div className="space-y-4 font-mono text-sm">
                <div className="rounded-2xl bg-white/8 p-4">
                  <span className="text-[#f0b44d]">Template</span>
                  <p className="mt-2 text-white/80">Best plumber in {'{{city}}'}, {'{{state}}'}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['New York, NY', 'Austin, TX', 'Miami, FL', 'Denver, CO'].map((city) => (
                    <div key={city} className="rounded-2xl bg-white/8 p-4 text-white/80">{city}</div>
                  ))}
                </div>
                <div className="rounded-2xl bg-[#2f6f5e] p-4 font-bold">/p/best-plumber-new-york → published</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
