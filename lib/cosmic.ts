import { createBucketClient } from '@cosmicjs/sdk'
import type {
  BusinessPartner,
  Product,
  Warehouse,
  PurchaseOrder,
  ProductionOrder,
  ChartAccount,
} from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safely render metadata values in JSX
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export function formatCurrency(amount: number | undefined, currency = 'USD'): string {
  const value = typeof amount === 'number' ? amount : 0
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(value)
  } catch {
    return `$${value.toFixed(2)}`
  }
}

export function formatDate(dateString: string | undefined): string {
  if (!dateString) return '—'
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export async function getBusinessPartners(): Promise<BusinessPartner[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'business-partners' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as BusinessPartner[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch business partners')
  }
}

export async function getBusinessPartner(slug: string): Promise<BusinessPartner | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'business-partners', slug })
      .depth(1)
    return response.object as BusinessPartner
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch business partner')
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Product[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch products')
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'products', slug })
      .depth(1)
    return response.object as Product
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch product')
  }
}

export async function getWarehouses(): Promise<Warehouse[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'warehouses' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Warehouse[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch warehouses')
  }
}

export async function getWarehouse(slug: string): Promise<Warehouse | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'warehouses', slug })
      .depth(1)
    return response.object as Warehouse
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch warehouse')
  }
}

export async function getPurchaseOrders(): Promise<PurchaseOrder[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'purchase-orders' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as PurchaseOrder[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch purchase orders')
  }
}

export async function getPurchaseOrder(slug: string): Promise<PurchaseOrder | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'purchase-orders', slug })
      .depth(1)
    return response.object as PurchaseOrder
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch purchase order')
  }
}

export async function getProductionOrders(): Promise<ProductionOrder[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'production-orders' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as ProductionOrder[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch production orders')
  }
}

export async function getProductionOrder(slug: string): Promise<ProductionOrder | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'production-orders', slug })
      .depth(1)
    return response.object as ProductionOrder
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch production order')
  }
}

export async function getChartAccounts(): Promise<ChartAccount[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'chart-of-accounts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as ChartAccount[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch chart of accounts')
  }
}