'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { href: '/', label: 'Dashboard', icon: '📊' },
  { href: '/partners', label: 'Suppliers & Customers', icon: '🏢' },
  { href: '/products', label: 'Products & Materials', icon: '📦' },
  { href: '/warehouses', label: 'Warehouses', icon: '🏬' },
  { href: '/purchase-orders', label: 'Purchase Orders', icon: '🛒' },
  { href: '/production-orders', label: 'Production Orders', icon: '🧵' },
  { href: '/accounts', label: 'Chart of Accounts', icon: '📒' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle */}
      <div className="md:hidden flex items-center justify-between bg-brand-800 text-white px-4 py-3 sticky top-0 z-30">
        <span className="font-bold flex items-center gap-2">
          <span>🧵</span> Future Fashion ERP
        </span>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          className="p-2 rounded hover:bg-brand-700"
        >
          <span className="block w-5 h-0.5 bg-white mb-1" />
          <span className="block w-5 h-0.5 bg-white mb-1" />
          <span className="block w-5 h-0.5 bg-white" />
        </button>
      </div>

      <aside
        className={`${
          open ? 'block' : 'hidden'
        } md:block md:fixed md:inset-y-0 md:left-0 md:w-64 bg-brand-900 text-white z-40`}
      >
        <div className="hidden md:flex items-center gap-2 px-6 py-6 border-b border-brand-800">
          <span className="text-2xl">🧵</span>
          <div>
            <p className="font-bold leading-tight">Future Fashion</p>
            <p className="text-xs text-brand-300">ERP System</p>
          </div>
        </div>
        <nav className="px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? 'bg-brand-600 text-white font-semibold'
                    : 'text-brand-100 hover:bg-brand-800'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}