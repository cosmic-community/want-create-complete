import { getProducts } from '@/lib/cosmic'
import PageHeader from '@/components/PageHeader'
import ProductCard from '@/components/ProductCard'
import EmptyState from '@/components/EmptyState'

export const revalidate = 60

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div>
      <PageHeader
        icon="📦"
        title="Products & Materials"
        description="Raw materials, operating supplies, and finished goods inventory."
      />
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState icon="📦" title="No products yet" message="Add products in Cosmic to see them here." />
      )}
    </div>
  )
}