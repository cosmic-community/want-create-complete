import Link from 'next/link'
import type { BusinessPartner } from '@/types'
import { getMetafieldValue, formatCurrency } from '@/lib/cosmic'

export default function PartnerCard({ partner }: { partner: BusinessPartner }) {
  const type = getMetafieldValue(partner.metadata?.partner_type)
  const currency = getMetafieldValue(partner.metadata?.currency) || 'USD'
  const balance = partner.metadata?.opening_balance

  const typeColor =
    type === 'Supplier'
      ? 'bg-purple-100 text-purple-800'
      : type === 'Customer'
      ? 'bg-green-100 text-green-800'
      : 'bg-blue-100 text-blue-800'

  return (
    <Link
      href={`/partners/${partner.slug}`}
      className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-brand-300 transition-all"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">
            {getMetafieldValue(partner.metadata?.name) || partner.title}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {getMetafieldValue(partner.metadata?.contact_person) || '—'}
          </p>
        </div>
        {type && (
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${typeColor}`}>
            {type}
          </span>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-500">
          {getMetafieldValue(partner.metadata?.country) || '—'}
        </span>
        <span className="font-semibold text-gray-900">
          {formatCurrency(balance, currency)}
        </span>
      </div>
    </Link>
  )
}