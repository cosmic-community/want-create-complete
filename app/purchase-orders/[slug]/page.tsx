// app/purchase-orders/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPurchaseOrder, getMetafieldValue, formatCurrency, formatDate } from '@/lib/cosmic'
import StatusBadge from '@/components/StatusBadge'
import type { LineItem } from '@/types'

export const revalidate = 60

export default async function PurchaseOrderDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const order = await getPurchaseOrder(slug)

  if (!order) {
    notFound()
  }

  const supplier = order.metadata?.supplier
  const currency = getMetafieldValue(order.metadata?.currency) || 'USD'
  const status = getMetafieldValue(order.metadata?.status)
  const lineItems: LineItem[] = Array.isArray(order.metadata?.line_items)
    ? order.metadata.line_items
    : []

  return (
    <div className="max-w-4xl">
      <Link href="/purchase-orders" className="text-brand-600 hover:underline text-sm">
        ← Back to Purchase Orders
      </Link>
      <div className="mt-3 flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {getMetafieldValue(order.metadata?.po_number) || order.title}
        </h1>
        {status && <StatusBadge status={status} />}
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Supplier</p>
          <p className="font-semibold text-gray-900 mt-1">
            {supplier ? getMetafieldValue(supplier.metadata?.name) || supplier.title : '—'}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Order Date</p>
          <p className="font-semibold text-gray-900 mt-1">
            {formatDate(order.metadata?.order_date)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="font-semibold text-gray-900 mt-1">
            {formatCurrency(order.metadata?.total_amount, currency)}
          </p>
        </div>
      </div>

      {lineItems.length > 0 && (
        <div className="mt-6 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Line Items</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="text-left px-5 py-2 font-medium">Description</th>
                  <th className="text-right px-5 py-2 font-medium">Qty</th>
                  <th className="text-right px-5 py-2 font-medium">Unit Price</th>
                  <th className="text-right px-5 py-2 font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {lineItems.map((item, index) => (
                  <tr key={index}>
                    <td className="px-5 py-3 text-gray-900">
                      {getMetafieldValue(item.description) || '—'}
                    </td>
                    <td className="px-5 py-3 text-right text-gray-700">
                      {typeof item.quantity === 'number' ? item.quantity : '—'}
                    </td>
                    <td className="px-5 py-3 text-right text-gray-700">
                      {formatCurrency(item.unit_price, currency)}
                    </td>
                    <td className="px-5 py-3 text-right font-medium text-gray-900">
                      {formatCurrency(item.total, currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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