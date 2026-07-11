import { getProductionOrders } from '@/lib/cosmic'
import PageHeader from '@/components/PageHeader'
import ProductionOrderCard from '@/components/ProductionOrderCard'
import EmptyState from '@/components/EmptyState'

export const revalidate = 60

export default async function ProductionOrdersPage() {
  const orders = await getProductionOrders()

  return (
    <div>
      <PageHeader
        icon="🧵"
        title="Production Orders"
        description="Client garment orders with specifications and delivery dates."
      />
      {orders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <ProductionOrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <EmptyState icon="🧵" title="No production orders yet" message="Add production orders in Cosmic to see them here." />
      )}
    </div>
  )
}