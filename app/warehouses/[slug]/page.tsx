// app/warehouses/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getWarehouse, getMetafieldValue } from '@/lib/cosmic'

export const revalidate = 60

export default async function WarehouseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const warehouse = await getWarehouse(slug)

  if (!warehouse) {
    notFound()
  }

  const rows: { label: string; value: string }[] = [
    { label: 'Type', value: getMetafieldValue(warehouse.metadata?.warehouse_type) || '—' },
    { label: 'Location', value: getMetafieldValue(warehouse.metadata?.location) || '—' },
    { label: 'Manager', value: getMetafieldValue(warehouse.metadata?.manager) || '—' },
  ]

  return (
    <div className="max-w-3xl">
      <Link href="/warehouses" className="text-brand-600 hover:underline text-sm">
        ← Back to Warehouses
      </Link>
      <h1 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900">
        {getMetafieldValue(warehouse.metadata?.name) || warehouse.title}
      </h1>

      <div className="mt-6 bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between px-5 py-4">
            <span className="text-gray-500">{row.label}</span>
            <span className="font-medium text-gray-900">{row.value}</span>
          </div>
        ))}
      </div>

      {getMetafieldValue(warehouse.metadata?.notes) && (
        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-2">Notes</h2>
          <p className="text-gray-600 whitespace-pre-line">
            {getMetafieldValue(warehouse.metadata?.notes)}
          </p>
        </div>
      )}
    </div>
  )
}