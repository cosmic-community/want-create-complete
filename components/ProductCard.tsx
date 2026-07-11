import Link from 'next/link'
import type { Product } from '@/types'
import { getMetafieldValue, formatCurrency } from '@/lib/cosmic'

export default function ProductCard({ product }: { product: Product }) {
  const image = product.metadata?.image
  const stock = product.metadata?.current_stock
  const type = getMetafieldValue(product.metadata?.item_type)

  return (
    <Link
      href={`/products/${product.slug}`}
      className="block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-brand-300 transition-all"
    >
      <div className="aspect-video bg-gray-100 overflow-hidden">
        {image ? (
          <img
            src={`${image.imgix_url}?w=600&h=340&fit=crop&auto=format,compress`}
            alt={getMetafieldValue(product.metadata?.name) || product.title}
            width={300}
            height={170}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300">
            📦
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-gray-900">
            {getMetafieldValue(product.metadata?.name) || product.title}
          </h3>
          {type && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              {type}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">
          SKU: {getMetafieldValue(product.metadata?.sku) || '—'}
        </p>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-gray-600">
            Stock: <span className="font-semibold">{typeof stock === 'number' ? stock : 0}</span>{' '}
            {getMetafieldValue(product.metadata?.unit_of_measure)}
          </span>
          <span className="font-semibold text-gray-900">
            {formatCurrency(product.metadata?.unit_cost)}
          </span>
        </div>
      </div>
    </Link>
  )
}