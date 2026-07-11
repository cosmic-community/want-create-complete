import Link from 'next/link'
import type { Warehouse } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function WarehouseCard({ warehouse }: { warehouse: Warehouse }) {
  return (
    <Link
      href={`/warehouses/${warehouse.slug}`}
      className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-brand-300 transition-all"
    >
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center text-xl">
          🏬
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">
            {getMetafieldValue(warehouse.metadata?.name) || warehouse.title}
          </h3>
          <p className="text-sm text-gray-500">
            {getMetafieldValue(warehouse.metadata?.warehouse_type) || 'General'}
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-1 text-sm text-gray-600">
        <p>📍 {getMetafieldValue(warehouse.metadata?.location) || '—'}</p>
        <p>👤 {getMetafieldValue(warehouse.metadata?.manager) || '—'}</p>
      </div>
    </Link>
  )
}