import { getPurchaseOrders } from '@/lib/cosmic'
import PageHeader from '@/components/PageHeader'
import PurchaseOrderCard from '@/components/PurchaseOrderCard'
import EmptyState from '@/components/EmptyState'

export const revalidate = 60

export default async function PurchaseOrdersPage() {
  const orders = await getPurchaseOrders()

  return (
    <div>
      <PageHeader
        icon="🛒"
        title="Purchase Orders"
        description="Orders for imported and locally sourced raw materials and supplies."
      />
      {orders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <PurchaseOrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <EmptyState icon="🛒" title="No purchase orders yet" message="Add purchase orders in Cosmic to see them here." />
      )}
    </div>
  )
}