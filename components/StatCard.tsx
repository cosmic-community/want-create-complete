import Link from 'next/link'

interface StatCardProps {
  label: string
  value: string | number
  icon: string
  href: string
  accent?: string
}

export default function StatCard({ label, value, icon, href, accent = 'bg-brand-50 text-brand-700' }: StatCardProps) {
  return (
    <Link
      href={href}
      className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-brand-300 transition-all"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${accent}`}>
          {icon}
        </div>
      </div>
    </Link>
  )
}