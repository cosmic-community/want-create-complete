interface EmptyStateProps {
  icon?: string
  title: string
  message?: string
}

export default function EmptyState({ icon = '📭', title, message }: EmptyStateProps) {
  return (
    <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {message && <p className="mt-1 text-gray-500">{message}</p>}
    </div>
  )
}