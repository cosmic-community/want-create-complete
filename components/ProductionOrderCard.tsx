import Link from 'next/link'
import type { ProductionOrder } from '@/types'
import { getMetafieldValue, formatDate } from '@/lib/cosmic'
import StatusBadge from '@/components/StatusBadge'

export default function ProductionOrderCard({ order }: { order: ProductionOrder }) {
  const customer = order.metadata?.customer
  const status = getMetafieldValue(order.metadata?.status)
  const qty = order.metadata?.quantity

  return (
    <Link
      href={`/production-orders/${order.slug}`}
      className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-brand-300 transition-all"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">
            {getMetafieldValue(order.metadata?.order_number) || order.title}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {customer ? getMetafieldValue(customer.metadata?.name) || customer.title : '—'}
          </p>
        </div>
        {status && <StatusBadge status={status} />}
      </div>
      <p className="mt-3 text-sm text-gray-600 line-clamp-2">
        {getMetafieldValue(order.metadata?.garment_description) || '—'}
      </p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-500">
          Qty: <span className="font-semibold text-gray-900">{typeof qty === 'number' ? qty : 0}</span>
        </span>
        <span className="text-gray-500">Due {formatDate(order.metadata?.delivery_date)}</span>
      </div>
    </Link>
  )
}