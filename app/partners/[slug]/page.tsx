// app/partners/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBusinessPartner, getMetafieldValue, formatCurrency } from '@/lib/cosmic'

export const revalidate = 60

export default async function PartnerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const partner = await getBusinessPartner(slug)

  if (!partner) {
    notFound()
  }

  const currency = getMetafieldValue(partner.metadata?.currency) || 'USD'

  const rows: { label: string; value: string }[] = [
    { label: 'Partner Type', value: getMetafieldValue(partner.metadata?.partner_type) || '—' },
    { label: 'Contact Person', value: getMetafieldValue(partner.metadata?.contact_person) || '—' },
    { label: 'Email', value: getMetafieldValue(partner.metadata?.email) || '—' },
    { label: 'Phone', value: getMetafieldValue(partner.metadata?.phone) || '—' },
    { label: 'Country', value: getMetafieldValue(partner.metadata?.country) || '—' },
    { label: 'Currency', value: currency },
    { label: 'Opening Balance', value: formatCurrency(partner.metadata?.opening_balance, currency) },
  ]

  return (
    <div className="max-w-3xl">
      <Link href="/partners" className="text-brand-600 hover:underline text-sm">
        ← Back to Partners
      </Link>
      <h1 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900">
        {getMetafieldValue(partner.metadata?.name) || partner.title}
      </h1>

      <div className="mt-6 bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between px-5 py-4">
            <span className="text-gray-500">{row.label}</span>
            <span className="font-medium text-gray-900">{row.value}</span>
          </div>
        ))}
      </div>

      {getMetafieldValue(partner.metadata?.notes) && (
        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-2">Notes</h2>
          <p className="text-gray-600 whitespace-pre-line">
            {getMetafieldValue(partner.metadata?.notes)}
          </p>
        </div>
      )}
    </div>
  )
}