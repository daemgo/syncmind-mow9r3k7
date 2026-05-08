// Quality and batch entity types

export interface Batch {
  id: string
  batchNo: string
  orderNo: string
  customerName: string
  productSpec: string
  coatingColor: string
  filmThickness: number
  adhesion: string
  productionTime: string
  qualityStatus: QualityStatus
  deviceCode: string
}

export type QualityStatus = "pending" | "pass" | "fail" | "rework"

export interface QualityReport {
  id: string
  reportNo: string
  templateName: string
  batchNo: string
  customerName: string
  generatedAt: string
  createdBy: string
}

export interface SpcAlert {
  id: string
  triggerTime: string
  paramName: string
  actualValue: number
  upperLimit: number
  lowerLimit: number
  deviationType: string
}

export interface Inspection {
  id: string
  inspectionNo: string
  batchNo: string
  inspectionType: string
  result: string
  inspector: string
  inspectionTime: string
}
