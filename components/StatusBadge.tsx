interface StatusBadgeProps {
  status: string
}

const colorMap: Record<string, string> = {
  Draft: 'bg-gray-100 text-gray-700',
  Pending: 'bg-yellow-100 text-yellow-800',
  Approved: 'bg-blue-100 text-blue-800',
  Received: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
  'In Production': 'bg-indigo-100 text-indigo-800',
  Completed: 'bg-green-100 text-green-800',
  Shipped: 'bg-teal-100 text-teal-800',
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  if (!status) return null
  const classes = colorMap[status] || 'bg-gray-100 text-gray-700'
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes}`}>
      {status}
    </span>
  )
}