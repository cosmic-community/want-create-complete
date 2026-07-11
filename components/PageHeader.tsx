interface PageHeaderProps {
  title: string
  description?: string
  icon?: string
}

export default function PageHeader({ title, description, icon }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
        {icon && <span className="text-3xl">{icon}</span>}
        {title}
      </h1>
      {description && <p className="mt-2 text-gray-600">{description}</p>}
    </div>
  )
}