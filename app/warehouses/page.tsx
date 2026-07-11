import { getWarehouses } from '@/lib/cosmic'
import PageHeader from '@/components/PageHeader'
import WarehouseCard from '@/components/WarehouseCard'
import EmptyState from '@/components/EmptyState'

export const revalidate = 60

export default async function WarehousesPage() {
  const warehouses = await getWarehouses()

  return (
    <div>
      <PageHeader
        icon="🏬"
        title="Warehouses"
        description="Storage locations for raw materials, supplies, and finished goods."
      />
      {warehouses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {warehouses.map((warehouse) => (
            <WarehouseCard key={warehouse.id} warehouse={warehouse} />
          ))}
        </div>
      ) : (
        <EmptyState icon="🏬" title="No warehouses yet" message="Add warehouses in Cosmic to see them here." />
      )}
    </div>
  )
}