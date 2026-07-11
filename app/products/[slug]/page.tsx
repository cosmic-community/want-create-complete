// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProduct, getMetafieldValue, formatCurrency } from '@/lib/cosmic'

export const revalidate = 60

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const image = product.metadata?.image
  const warehouse = product.metadata?.warehouse

  const rows: { label: string; value: string }[] = [
    { label: 'SKU', value: getMetafieldValue(product.metadata?.sku) || '—' },
    { label: 'Item Type', value: getMetafieldValue(product.metadata?.item_type) || '—' },
    { label: 'Unit of Measure', value: getMetafieldValue(product.metadata?.unit_of_measure) || '—' },
    { label: 'Unit Cost', value: formatCurrency(product.metadata?.unit_cost) },
    {
      label: 'Current Stock',
      value: `${typeof product.metadata?.current_stock === 'number' ? product.metadata.current_stock : 0}`,
    },
    {
      label: 'Warehouse',
      value: warehouse ? getMetafieldValue(warehouse.metadata?.name) || warehouse.title : '—',
    },
  ]

  return (
    <div className="max-w-3xl">
      <Link href="/products" className="text-brand-600 hover:underline text-sm">
        ← Back to Products
      </Link>
      <h1 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900">
        {getMetafieldValue(product.metadata?.name) || product.title}
      </h1>

      {image && (
        <div className="mt-6 rounded-xl overflow-hidden border border-gray-200">
          <img
            src={`${image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
            alt={getMetafieldValue(product.metadata?.name) || product.title}
            width={600}
            height={300}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      <div className="mt-6 bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between px-5 py-4">
            <span className="text-gray-500">{row.label}</span>
            <span className="font-medium text-gray-900">{row.value}</span>
          </div>
        ))}
      </div>

      {getMetafieldValue(product.metadata?.description) && (
        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-2">Description</h2>
          <p className="text-gray-600 whitespace-pre-line">
            {getMetafieldValue(product.metadata?.description)}
          </p>
        </div>
      )}
    </div>
  )
}