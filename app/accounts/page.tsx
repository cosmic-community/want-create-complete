import { getChartAccounts, getMetafieldValue } from '@/lib/cosmic'
import PageHeader from '@/components/PageHeader'
import EmptyState from '@/components/EmptyState'
import type { AccountType } from '@/types'

export const revalidate = 60

const typeColors: Record<string, string> = {
  Asset: 'bg-green-100 text-green-800',
  Liability: 'bg-red-100 text-red-800',
  Equity: 'bg-blue-100 text-blue-800',
  Revenue: 'bg-teal-100 text-teal-800',
  Expense: 'bg-orange-100 text-orange-800',
}

export default async function AccountsPage() {
  const accounts = await getChartAccounts()

  return (
    <div>
      <PageHeader
        icon="📒"
        title="Chart of Accounts"
        description="The complete accounting structure for the company."
      />
      {accounts.length > 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">Code</th>
                  <th className="text-left px-5 py-3 font-medium">Account Name</th>
                  <th className="text-left px-5 py-3 font-medium">Type</th>
                  <th className="text-left px-5 py-3 font-medium">Parent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {accounts.map((account) => {
                  const type = getMetafieldValue(account.metadata?.account_type)
                  const parent = account.metadata?.parent_account
                  const color = typeColors[type] || 'bg-gray-100 text-gray-700'
                  return (
                    <tr key={account.id} className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-mono text-gray-700">
                        {getMetafieldValue(account.metadata?.account_code) || '—'}
                      </td>
                      <td className="px-5 py-3 font-medium text-gray-900">
                        {getMetafieldValue(account.metadata?.account_name) || account.title}
                      </td>
                      <td className="px-5 py-3">
                        {type && (
                          <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
                            {type}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-gray-600">
                        {parent
                          ? getMetafieldValue(parent.metadata?.account_name) || parent.title
                          : '—'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState icon="📒" title="No accounts yet" message="Add accounts in Cosmic to see them here." />
      )}
    </div>
  )
}