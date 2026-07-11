// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

// Type literals for select values
export type PartnerType = 'Supplier' | 'Customer' | 'Both';
export type ItemType = 'Raw Material' | 'Operating Supply' | 'Finished Good';
export type WarehouseType = 'Raw Materials' | 'Finished Goods' | 'Supplies' | 'General';
export type POStatus = 'Draft' | 'Pending' | 'Approved' | 'Received' | 'Cancelled';
export type ProductionStatus = 'Pending' | 'In Production' | 'Completed' | 'Shipped' | 'Cancelled';
export type AccountType = 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';

// Line item shape for purchase orders
export interface LineItem {
  description?: string;
  quantity?: number;
  unit_price?: number;
  total?: number;
}

export interface BusinessPartner extends CosmicObject {
  type: 'business-partners';
  metadata: {
    name?: string;
    partner_type?: PartnerType;
    contact_person?: string;
    email?: string;
    phone?: string;
    country?: string;
    currency?: string;
    opening_balance?: number;
    notes?: string;
  };
}

export interface Warehouse extends CosmicObject {
  type: 'warehouses';
  metadata: {
    name?: string;
    warehouse_type?: WarehouseType;
    location?: string;
    manager?: string;
    notes?: string;
  };
}

export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    name?: string;
    sku?: string;
    item_type?: ItemType;
    unit_of_measure?: string;
    unit_cost?: number;
    current_stock?: number;
    warehouse?: Warehouse;
    description?: string;
    image?: CosmicImage;
  };
}

export interface PurchaseOrder extends CosmicObject {
  type: 'purchase-orders';
  metadata: {
    po_number?: string;
    supplier?: BusinessPartner;
    order_date?: string;
    currency?: string;
    status?: POStatus;
    line_items?: LineItem[];
    total_amount?: number;
    notes?: string;
  };
}

export interface ProductionOrder extends CosmicObject {
  type: 'production-orders';
  metadata: {
    order_number?: string;
    customer?: BusinessPartner;
    garment_description?: string;
    quantity?: number;
    order_date?: string;
    delivery_date?: string;
    status?: ProductionStatus;
    specifications?: string;
    unit_price?: number;
    notes?: string;
  };
}

export interface ChartAccount extends CosmicObject {
  type: 'chart-of-accounts';
  metadata: {
    account_code?: string;
    account_name?: string;
    account_type?: AccountType;
    parent_account?: ChartAccount;
    description?: string;
  };
}

// API response type
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}