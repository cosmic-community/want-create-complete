// app/production-orders/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProductionOrder, getMetafieldValue, formatCurrency, formatDate } from '@/lib/cosmic'
import StatusBadge from '@/components/StatusBadge'

export const revalidate = 60

export default async function ProductionOrderDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const order = await getProductionOrder(slug)

  if (!order) {
    notFound()
  }

  const customer = order.metadata?.customer
  const status = getMetafieldValue(order.metadata?.status)

  const rows: { label: string; value: string }[] = [
    {
      label: 'Customer',
      value: customer ? getMetafieldValue(customer.metadata?.name) || customer.title : '—',
    },
    { label: 'Quantity', value: `${typeof order.metadata?.quantity === 'number' ? order.metadata.quantity : 0}` },
    { label: 'Unit Price', value: formatCurrency(order.metadata?.unit_price) },
    { label: 'Order Date', value: formatDate(order.metadata?.order_date) },
    { label: 'Delivery Date', value: formatDate(order.metadata?.delivery_date) },
  ]

  return (
    <div className="max-w-3xl">
      <Link href="/production-orders" className="text-brand-600 hover:underline text-sm">
        ← Back to Production Orders
      </Link>
      <div className="mt-3 flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {getMetafieldValue(order.metadata?.order_number) || order.title}
        </h1>
        {status && <StatusBadge status={status} />}
      </div>

      <p className="mt-3 text-gray-600">
        {getMetafieldValue(order.metadata?.garment_description)}
      </p>

      <div className="mt-6 bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between px-5 py-4">
            <span className="text-gray-500">{row.label}</span>
            <span className="font-medium text-gray-900">{row.value}</span>
          </div>
        ))}
      </div>

      {getMetafieldValue(order.metadata?.specifications) && (
        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-2">Specifications</h2>
          <p className="text-gray-600 whitespace-pre-line">
            {getMetafieldValue(order.metadata?.specifications)}
          </p>
        </div>
      )}

      {getMetafieldValue(order.metadata?.notes) && (
        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-2">Notes</h2>
          <p className="text-gray-600 whitespace-pre-line">
            {getMetafieldValue(order.metadata?.notes)}
          </p>
        </div>
      )}
    </div>
  )
}