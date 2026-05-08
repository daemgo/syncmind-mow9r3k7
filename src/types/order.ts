// Order entity types

export interface Order {
  id: string
  orderNo: string
  customerName: string
  productSpec: string
  material: string
  quantity: number
  coatingColor: string
  filmThicknessReq: number
  deliveryDate: string
  status: OrderStatus
  progress: number
  batchCount: number
}

export type OrderStatus = "pending" | "in_progress" | "cooling" | "completed" | "delivered"
