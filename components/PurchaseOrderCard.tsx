import Link from 'next/link'
import type { PurchaseOrder } from '@/types'
import { getMetafieldValue, formatCurrency, formatDate } from '@/lib/cosmic'
import StatusBadge from '@/components/StatusBadge'

export default function PurchaseOrderCard({ order }: { order: PurchaseOrder }) {
  const supplier = order.metadata?.supplier
  const currency = getMetafieldValue(order.metadata?.currency) || 'USD'
  const status = getMetafieldValue(order.metadata?.status)

  return (
    <Link
      href={`/purchase-orders/${order.slug}`}
      className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-brand-300 transition-all"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">
            {getMetafieldValue(order.metadata?.po_number) || order.title}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {supplier ? getMetafieldValue(supplier.metadata?.name) || supplier.title : '—'}
          </p>
        </div>
        {status && <StatusBadge status={status} />}
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-500">{formatDate(order.metadata?.order_date)}</span>
        <span className="font-semibold text-gray-900">
          {formatCurrency(order.metadata?.total_amount, currency)}
        </span>
      </div>
    </Link>
  )
}