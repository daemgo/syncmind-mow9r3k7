// Dictionary data for PVD Vacuum Coating Production Traceability System

export interface DictItem {
  label: string
  value: string
  color?: string
}

export const dictionaries: Record<string, DictItem[]> = {
  "dict-device-status": [
    { label: "运行中", value: "running", color: "green" },
    { label: "待机", value: "standby", color: "blue" },
    { label: "故障", value: "fault", color: "red" },
    { label: "停机", value: "stopped", color: "gray" },
    { label: "维护中", value: "maintenance", color: "orange" },
  ],
  "dict-order-status": [
    { label: "待排产", value: "pending", color: "gray" },
    { label: "生产中", value: "in_progress", color: "blue" },
    { label: "冷却中", value: "cooling", color: "orange" },
    { label: "已完成", value: "completed", color: "green" },
    { label: "已交付", value: "delivered", color: "purple" },
  ],
  "dict-quality-status": [
    { label: "待检测", value: "pending", color: "gray" },
    { label: "合格", value: "pass", color: "green" },
    { label: "不合格", value: "fail", color: "red" },
    { label: "返工中", value: "rework", color: "orange" },
  ],
  "dict-batch-status": [
    { label: "待生产", value: "pending", color: "gray" },
    { label: "镀膜中", value: "in_progress", color: "blue" },
    { label: "冷却中", value: "cooling", color: "orange" },
    { label: "已完成", value: "completed", color: "green" },
    { label: "质检完成", value: "quality_checked", color: "green" },
  ],
  "dict-alert-level": [
    { label: "紧急", value: "urgent", color: "red" },
    { label: "重要", value: "important", color: "orange" },
    { label: "一般", value: "normal", color: "yellow" },
  ],
  "dict-alert-status": [
    { label: "未处理", value: "open", color: "red" },
    { label: "处理中", value: "in_progress", color: "blue" },
    { label: "已解决", value: "resolved", color: "green" },
  ],
  "dict-material": [
    { label: "不锈钢", value: "stainless_steel", color: "gray" },
    { label: "铁", value: "iron", color: "brown" },
    { label: "铜", value: "copper", color: "orange" },
    { label: "铝", value: "aluminum", color: "silver" },
    { label: "锌合金", value: "zinc_alloy", color: "blue" },
  ],
  "dict-coating-color": [
    { label: "钛金", value: "ti_n_gold", color: "gold" },
    { label: "钛蓝", value: "ti_n_blue", color: "blue" },
    { label: "钛黑", value: "ti_n_black", color: "black" },
    { label: "玫瑰金", value: "ti_n_rose", color: "pink" },
    { label: "铬色", value: "ti_n_chrome", color: "silver" },
  ],
  "dict-stock-status": [
    { label: "正常", value: "normal", color: "green" },
    { label: "低于安全库存", value: "low", color: "orange" },
    { label: "严重不足", value: "critical", color: "red" },
  ],
  "dict-complaint-reason": [
    { label: "膜层脱落", value: "coating_peel", color: "red" },
    { label: "色差", value: "color_diff", color: "orange" },
    { label: "膜厚不达标", value: "thickness_issue", color: "orange" },
    { label: "附着力不合格", value: "adhesion_fail", color: "red" },
    { label: "盐雾测试不合格", value: "salt_spray_fail", color: "red" },
    { label: "其他", value: "other", color: "gray" },
  ],
  "dict-complaint-status": [
    { label: "新建", value: "new", color: "blue" },
    { label: "调查中", value: "investigating", color: "orange" },
    { label: "处理中", value: "in_progress", color: "yellow" },
    { label: "已解决", value: "resolved", color: "green" },
    { label: "已关闭", value: "closed", color: "gray" },
  ],
  "dict-report-template": [
    { label: "宜家标准", value: "ikea", color: "blue" },
    { label: "苏泊尔标准", value: "supor", color: "red" },
    { label: "通用模板", value: "general", color: "gray" },
  ],
  "dict-inspection-type": [
    { label: "首件检验", value: "first_piece", color: "blue" },
    { label: "巡检", value: "patrol", color: "green" },
  ],
  "dict-inspection-result": [
    { label: "合格", value: "pass", color: "green" },
    { label: "不合格", value: "fail", color: "red" },
    { label: "有条件合格", value: "conditional_pass", color: "orange" },
  ],
  "dict-recipe-status": [
    { label: "草稿", value: "draft", color: "gray" },
    { label: "已发布", value: "published", color: "green" },
    { label: "已停用", value: "deprecated", color: "red" },
  ],
  "dict-deviation-type": [
    { label: "超上限", value: "upper_violation", color: "red" },
    { label: "超下限", value: "lower_violation", color: "red" },
    { label: "趋势预警", value: "trend_alert", color: "orange" },
  ],
  "dict-material-type": [
    { label: "靶材", value: "target", color: "blue" },
    { label: "工艺气体", value: "gas", color: "green" },
    { label: "辅材", value: "auxiliary", color: "orange" },
  ],
  "dict-customer": [
    { label: "宜家", value: "ikea", color: "blue" },
    { label: "苏泊尔", value: "supor", color: "red" },
    { label: "沃尔玛", value: "walmart", color: "blue" },
    { label: "H&M", value: "hm", color: "red" },
    { label: "钱江摩托", value: "qianjiang", color: "green" },
    { label: "哈尔斯", value: "haers", color: "orange" },
    { label: "吉利汽车", value: "geely", color: "blue" },
    { label: "春风动力", value: "cf_moto", color: "green" },
  ],
  "dict-plc-brand": [
    { label: "西门子", value: "siemens", color: "teal" },
    { label: "三菱", value: "mitsubishi", color: "blue" },
    { label: "欧姆龙", value: "omron", color: "green" },
    { label: "其他", value: "other", color: "gray" },
  ],
  "dict-protocol": [
    { label: "OPC UA", value: "opc_ua", color: "blue" },
    { label: "Modbus TCP", value: "modbus_tcp", color: "green" },
    { label: "Modbus RTU", value: "modbus_rtu", color: "orange" },
    { label: "其他", value: "other", color: "gray" },
  ],
  "dict-target-type": [
    { label: "钛靶", value: "titanium", color: "gray" },
    { label: "铬靶", value: "chromium", color: "blue" },
    { label: "氮化钛", value: "tin", color: "gold" },
    { label: "其他", value: "other", color: "gray" },
  ],
  "dict-trace-type": [
    { label: "按订单号追溯", value: "order", color: "blue" },
    { label: "按批次号追溯", value: "batch", color: "green" },
    { label: "按设备号追溯", value: "device", color: "orange" },
    { label: "按客户追溯", value: "customer", color: "purple" },
  ],
}
