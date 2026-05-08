// Mock data for 国彩真空 PVD 生产追溯系统

// 设备数据
export const devices = [
  { id: "1", deviceCode: "COAT-001", deviceName: "镀膜机#1", status: "running", vacuumLevel: 2.5e-3, temperature: 280, runtime: 8.5 },
  { id: "2", deviceCode: "COAT-002", deviceName: "镀膜机#2", status: "standby", vacuumLevel: 1.0e-3, temperature: 25, runtime: 0 },
  { id: "3", deviceCode: "COAT-003", deviceName: "镀膜机#3", status: "fault", vacuumLevel: 5.2e-3, temperature: 320, runtime: 3.2 },
  { id: "4", deviceCode: "COAT-004", deviceName: "镀膜机#4", status: "running", vacuumLevel: 2.8e-3, temperature: 275, runtime: 12.1 },
  { id: "5", deviceCode: "COAT-005", deviceName: "镀膜机#5", status: "maintenance", vacuumLevel: 1.5e-3, temperature: 30, runtime: 0 },
];

// 设备状态统计
export const deviceStats = {
  runningCount: 2,
  standbyCount: 1,
  faultCount: 1,
  stoppedCount: 1,
};

// 告警数据
export const alerts = [
  { id: "1", alertTime: "2026-05-08 09:15", deviceCode: "COAT-003", alertLevel: "urgent", alertContent: "真空度异常升高", status: "open", handler: "" },
  { id: "2", alertTime: "2026-05-08 08:30", deviceCode: "COAT-001", alertLevel: "important", alertContent: "温度超上限", status: "in_progress", handler: "张工" },
  { id: "3", alertTime: "2026-05-07 16:45", deviceCode: "COAT-004", alertLevel: "normal", alertContent: "气流量波动", status: "resolved", handler: "李师傅" },
];

// 订单数据
export const orders = [
  { id: "1", orderNo: "ORD-20260508-001", customerName: "宜家", productSpec: "不锈钢餐具", material: "stainless_steel", quantity: 5000, coatingColor: "ti_n_gold", filmThicknessReq: 3.0, deliveryDate: "2026-05-15", status: "in_progress", progress: 65, batchCount: 3 },
  { id: "2", orderNo: "ORD-20260507-002", customerName: "苏泊尔", productSpec: "压力锅内胆", material: "aluminum", quantity: 3000, coatingColor: "ti_n_black", filmThicknessReq: 2.5, deliveryDate: "2026-05-18", status: "in_progress", progress: 40, batchCount: 2 },
  { id: "3", orderNo: "ORD-20260506-003", customerName: "吉利汽车", productSpec: "轮毂配件", material: "aluminum", quantity: 1000, coatingColor: "ti_n_chrome", filmThicknessReq: 5.0, deliveryDate: "2026-05-20", status: "pending", progress: 0, batchCount: 0 },
  { id: "4", orderNo: "ORD-20260505-004", customerName: "沃尔玛", productSpec: "卫浴挂件", material: "zinc_alloy", quantity: 2000, coatingColor: "ti_n_chrome", filmThicknessReq: 2.0, deliveryDate: "2026-05-12", status: "cooling", progress: 90, batchCount: 2 },
  { id: "5", orderNo: "ORD-20260504-005", customerName: "哈尔斯", productSpec: "保温杯外壳", material: "stainless_steel", quantity: 8000, coatingColor: "ti_n_rose", filmThicknessReq: 2.5, deliveryDate: "2026-05-25", status: "completed", progress: 100, batchCount: 5 },
];

// 批次数据
export const batches = [
  { id: "1", batchNo: "BATCH-20260508-001", orderNo: "ORD-20260508-001", customerName: "宜家", productSpec: "不锈钢餐具", coatingColor: "ti_n_gold", filmThickness: 3.05, adhesion: "1级", productionTime: "2026-05-08 08:30", qualityStatus: "pass" },
  { id: "2", batchNo: "BATCH-20260508-002", orderNo: "ORD-20260508-001", customerName: "宜家", productSpec: "不锈钢餐具", coatingColor: "ti_n_gold", filmThickness: 2.98, adhesion: "1级", productionTime: "2026-05-08 10:15", qualityStatus: "pass" },
  { id: "3", batchNo: "BATCH-20260507-001", orderNo: "ORD-20260507-002", customerName: "苏泊尔", productSpec: "压力锅内胆", coatingColor: "ti_n_black", filmThickness: 2.52, adhesion: "1级", productionTime: "2026-05-07 14:00", qualityStatus: "pass" },
  { id: "4", batchNo: "BATCH-20260507-002", orderNo: "ORD-20260507-002", customerName: "苏泊尔", productSpec: "压力锅内胆", coatingColor: "ti_n_black", filmThickness: 2.48, adhesion: "2级", productionTime: "2026-05-07 16:30", qualityStatus: "rework" },
  { id: "5", batchNo: "BATCH-20260505-001", orderNo: "ORD-20260504-005", customerName: "哈尔斯", productSpec: "保温杯外壳", coatingColor: "ti_n_rose", filmThickness: 2.55, adhesion: "1级", productionTime: "2026-05-05 09:00", qualityStatus: "pass" },
];

// 配方数据
export const recipes = [
  { id: "1", recipeNo: "REC-001", recipeName: "宜家标准金", material: "stainless_steel", coatingColor: "ti_n_gold", version: "v2.1", status: "published", createdBy: "王总工", createdAt: "2026-04-15 10:30" },
  { id: "2", recipeNo: "REC-002", recipeName: "苏泊尔黑", material: "aluminum", coatingColor: "ti_n_black", version: "v1.3", status: "published", createdBy: "王总工", createdAt: "2026-04-10 14:20" },
  { id: "3", recipeNo: "REC-003", recipeName: "汽车铬", material: "aluminum", coatingColor: "ti_n_chrome", version: "v1.0", status: "draft", createdBy: "王总工", createdAt: "2026-05-01 09:00" },
];

// SPC 预警数据
export const spcAlerts = [
  { id: "1", triggerTime: "2026-05-08 09:15", paramName: "真空度", actualValue: 3.2e-3, upperLimit: 3.0e-3, lowerLimit: 1.0e-3, deviationType: "upper_violation" },
  { id: "2", triggerTime: "2026-05-08 08:45", paramName: "温度", actualValue: 285, upperLimit: 280, lowerLimit: 260, deviationType: "upper_violation" },
  { id: "3", triggerTime: "2026-05-07 16:30", paramName: "功率", actualValue: 8.2, upperLimit: 9.0, lowerLimit: 7.0, deviationType: "trend_alert" },
];

// 质量报告数据
export const qualityReports = [
  { id: "1", reportNo: "QR-20260508-001", templateName: "宜家标准", batchNo: "BATCH-20260508-001", customerName: "宜家", generatedAt: "2026-05-08 12:00", createdBy: "张主管" },
  { id: "2", reportNo: "QR-20260507-001", templateName: "苏泊尔标准", batchNo: "BATCH-20260507-001", customerName: "苏泊尔", generatedAt: "2026-05-07 18:30", createdBy: "张主管" },
];

// 首件检验数据
export const inspections = [
  { id: "1", inspectionNo: "INS-20260508-001", batchNo: "BATCH-20260508-002", inspectionType: "first_piece", result: "pass", inspector: "李师傅", inspectionTime: "2026-05-08 10:30" },
  { id: "2", inspectionNo: "INS-20260507-001", batchNo: "BATCH-20260507-002", inspectionType: "patrol", result: "fail", inspector: "李师傅", inspectionTime: "2026-05-07 16:45" },
];

// 投诉数据
export const complaints = [
  { id: "1", complaintNo: "CMP-20260501-001", customerName: "宜家", reason: "膜层脱落", batchNo: "BATCH-20260428-003", createdAt: "2026-05-01 10:00", status: "investigating", assignee: "王总工" },
  { id: "2", complaintNo: "CMP-20260425-001", customerName: "苏泊尔", reason: "色差", batchNo: "BATCH-20260424-001", createdAt: "2026-04-25 14:30", status: "resolved", assignee: "张主管" },
];

// 库存数据
export const inventory = [
  { id: "1", materialCode: "TGT-001", materialName: "钛靶材", materialType: "target", spec: "φ100*5mm", currentQty: 12, safetyQty: 5, stockStatus: "normal", supplier: "北京材料厂", supplierBatch: "BT-2026-001" },
  { id: "2", materialCode: "TGT-002", materialName: "铬靶材", materialType: "target", spec: "φ100*5mm", currentQty: 3, safetyQty: 5, stockStatus: "low", supplier: "上海材料厂", supplierBatch: "SH-2026-002" },
  { id: "3", materialCode: "GAS-001", materialName: "氩气", materialType: "gas", spec: "99.99%", currentQty: 45, safetyQty: 20, stockStatus: "normal", supplier: "气体公司", supplierBatch: "" },
  { id: "4", materialCode: "GAS-002", materialName: "氮气", materialType: "gas", spec: "99.99%", currentQty: 8, safetyQty: 15, stockStatus: "critical", supplier: "气体公司", supplierBatch: "" },
  { id: "5", materialCode: "AUX-001", materialName: "擦拭布", materialType: "auxiliary", spec: "标准", currentQty: 200, safetyQty: 50, stockStatus: "normal", supplier: "耗材商", supplierBatch: "" },
];

// 成本汇总数据
export const costSummary = [
  { id: "1", orderNo: "ORD-20260508-001", customerName: "宜家", electricityCost: 850, targetCost: 1200, gasCost: 350, laborCost: 600, totalCost: 3000, revenue: 15000, profitMargin: 80 },
  { id: "2", orderNo: "ORD-20260507-002", customerName: "苏泊尔", electricityCost: 680, targetCost: 950, gasCost: 280, laborCost: 480, totalCost: 2390, revenue: 12000, profitMargin: 80.08 },
  { id: "3", orderNo: "ORD-20260504-005", customerName: "哈尔斯", electricityCost: 1200, targetCost: 1800, gasCost: 520, laborCost: 900, totalCost: 4420, revenue: 22000, profitMargin: 79.91 },
];

// 客户列表
export const customers = [
  { value: "ikea", label: "宜家" },
  { value: "supor", label: "苏泊尔" },
  { value: "walmart", label: "沃尔玛" },
  { value: "hm", label: "H&M" },
  { value: "qianjiang", label: "钱江摩托" },
  { value: "haers", label: "哈尔斯" },
  { value: "geely", label: "吉利汽车" },
  { value: "cf_moto", label: "春风动力" },
];

// 材质列表
export const materials = [
  { value: "stainless_steel", label: "不锈钢" },
  { value: "iron", label: "铁" },
  { value: "copper", label: "铜" },
  { value: "aluminum", label: "铝" },
  { value: "zinc_alloy", label: "锌合金" },
];

// 看板统计
export const dashboardStats = {
  todayBatches: 8,
  todayQualified: 7,
  qualificationRate: 87.5,
  activeOrders: 5,
  urgentDeliveries: 2,
  equipmentOEE: 82.5,
  monthlyOutput: 125000,
  monthlyRevenue: 625000,
};
