// Device entity types

export interface Device {
  id: string
  deviceCode: string
  deviceName: string
  deviceModel: string
  location: string
  plcBrand: string
  protocol: string
  lastMaintenance: string
  status: DeviceStatus
  vacuumLevel: number
  temperature: number
  runtime: number
}

export type DeviceStatus = "running" | "standby" | "fault" | "stopped" | "maintenance"

export interface DeviceAlert {
  id: string
  alertTime: string
  deviceCode: string
  alertLevel: AlertLevel
  alertContent: string
  status: AlertStatus
  handler: string
}

export type AlertLevel = "urgent" | "important" | "normal"
export type AlertStatus = "open" | "in_progress" | "resolved"
