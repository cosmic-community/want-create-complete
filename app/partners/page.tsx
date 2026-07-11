import { getBusinessPartners } from '@/lib/cosmic'
import PageHeader from '@/components/PageHeader'
import PartnerCard from '@/components/PartnerCard'
import EmptyState from '@/components/EmptyState'

export const revalidate = 60

export default async function PartnersPage() {
  const partners = await getBusinessPartners()

  return (
    <div>
      <PageHeader
        icon="🏢"
        title="Suppliers & Customers"
        description="Manage your business partners, suppliers, and customers."
      />
      {partners.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {partners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      ) : (
        <EmptyState icon="🏢" title="No business partners yet" message="Add partners in Cosmic to see them here." />
      )}
    </div>
  )
}