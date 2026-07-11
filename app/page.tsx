import {
  getBusinessPartners,
  getProducts,
  getWarehouses,
  getPurchaseOrders,
  getProductionOrders,
  getChartAccounts,
  formatCurrency,
  getMetafieldValue,
} from '@/lib/cosmic'
import StatCard from '@/components/StatCard'
import ProductionOrderCard from '@/components/ProductionOrderCard'
import PurchaseOrderCard from '@/components/PurchaseOrderCard'
import EmptyState from '@/components/EmptyState'

export const revalidate = 60

export default async function DashboardPage() {
  const [partners, products, warehouses, purchaseOrders, productionOrders, accounts] =
    await Promise.all([
      getBusinessPartners(),
      getProducts(),
      getWarehouses(),
      getPurchaseOrders(),
      getProductionOrders(),
      getChartAccounts(),
    ])

  const inventoryValue = products.reduce((sum, p) => {
    const cost = typeof p.metadata?.unit_cost === 'number' ? p.metadata.unit_cost : 0
    const stock = typeof p.metadata?.current_stock === 'number' ? p.metadata.current_stock : 0
    return sum + cost * stock
  }, 0)

  const recentProduction = productionOrders.slice(0, 3)
  const recentPurchase = purchaseOrders.slice(0, 3)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Future Fashion Ready-Made Garments — Operations Overview
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard
          label="Business Partners"
          value={partners.length}
          icon="🏢"
          href="/partners"
        />
        <StatCard
          label="Products & Materials"
          value={products.length}
          icon="📦"
          href="/products"
          accent="bg-green-50 text-green-700"
        />
        <StatCard
          label="Warehouses"
          value={warehouses.length}
          icon="🏬"
          href="/warehouses"
          accent="bg-yellow-50 text-yellow-700"
        />
        <StatCard
          label="Purchase Orders"
          value={purchaseOrders.length}
          icon="🛒"
          href="/purchase-orders"
          accent="bg-purple-50 text-purple-700"
        />
        <StatCard
          label="Production Orders"
          value={productionOrders.length}
          icon="🧵"
          href="/production-orders"
          accent="bg-indigo-50 text-indigo-700"
        />
        <StatCard
          label="Chart Accounts"
          value={accounts.length}
          icon="📒"
          href="/accounts"
          accent="bg-teal-50 text-teal-700"
        />
      </div>

      <div className="bg-gradient-to-r from-brand-600 to-brand-800 rounded-xl p-6 text-white mb-8">
        <p className="text-brand-100 text-sm">Estimated Inventory Value</p>
        <p className="text-3xl font-bold mt-1">{formatCurrency(inventoryValue)}</p>
        <p className="text-brand-200 text-xs mt-1">
          Based on {products.length} products at current stock levels
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Production Orders</h2>
          {recentProduction.length > 0 ? (
            <div className="space-y-4">
              {recentProduction.map((order) => (
                <ProductionOrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <EmptyState icon="🧵" title="No production orders" />
          )}
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Purchase Orders</h2>
          {recentPurchase.length > 0 ? (
            <div className="space-y-4">
              {recentPurchase.map((order) => (
                <PurchaseOrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <EmptyState icon="🛒" title="No purchase orders" />
          )}
        </section>
      </div>
    </div>
  )
}