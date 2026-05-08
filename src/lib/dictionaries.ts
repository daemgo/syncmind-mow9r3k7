// 数据字典

export const dictDeviceStatus = {
  running: { label: "运行中", color: "green" },
  standby: { label: "待机", color: "blue" },
  fault: { label: "故障", color: "red" },
  stopped: { label: "停机", color: "gray" },
  maintenance: { label: "维护中", color: "orange" },
};

export const dictOrderStatus = {
  pending: { label: "待排产", color: "gray" },
  in_progress: { label: "生产中", color: "blue" },
  cooling: { label: "冷却中", color: "orange" },
  completed: { label: "已完成", color: "green" },
  delivered: { label: "已交付", color: "purple" },
};

export const dictQualityStatus = {
  pending: { label: "待检测", color: "gray" },
  pass: { label: "合格", color: "green" },
  fail: { label: "不合格", color: "red" },
  rework: { label: "返工中", color: "orange" },
};

export const dictBatchStatus = {
  pending: { label: "待生产", color: "gray" },
  in_progress: { label: "镀膜中", color: "blue" },
  cooling: { label: "冷却中", color: "orange" },
  completed: { label: "已完成", color: "green" },
  quality_checked: { label: "质检完成", color: "green" },
};

export const dictAlertLevel = {
  urgent: { label: "紧急", color: "red" },
  important: { label: "重要", color: "orange" },
  normal: { label: "一般", color: "yellow" },
};

export const dictAlertStatus = {
  open: { label: "未处理", color: "red" },
  in_progress: { label: "处理中", color: "blue" },
  resolved: { label: "已解决", color: "green" },
};

export const dictMaterial = {
  stainless_steel: { label: "不锈钢", color: "gray" },
  iron: { label: "铁", color: "brown" },
  copper: { label: "铜", color: "orange" },
  aluminum: { label: "铝", color: "silver" },
  zinc_alloy: { label: "锌合金", color: "blue" },
};

export const dictCoatingColor = {
  ti_n_gold: { label: "钛金", color: "gold" },
  ti_n_blue: { label: "钛蓝", color: "blue" },
  ti_n_black: { label: "钛黑", color: "black" },
  ti_n_rose: { label: "玫瑰金", color: "pink" },
  ti_n_chrome: { label: "铬色", color: "silver" },
};

export const dictStockStatus = {
  normal: { label: "正常", color: "green" },
  low: { label: "低于安全库存", color: "orange" },
  critical: { label: "严重不足", color: "red" },
};

export const dictComplaintReason = {
  coating_peel: { label: "膜层脱落", color: "red" },
  color_diff: { label: "色差", color: "orange" },
  thickness_issue: { label: "膜厚不达标", color: "orange" },
  adhesion_fail: { label: "附着力不合格", color: "red" },
  salt_spray_fail: { label: "盐雾测试不合格", color: "red" },
  other: { label: "其他", color: "gray" },
};

export const dictComplaintStatus = {
  new: { label: "新建", color: "blue" },
  investigating: { label: "调查中", color: "orange" },
  in_progress: { label: "处理中", color: "yellow" },
  resolved: { label: "已解决", color: "green" },
  closed: { label: "已关闭", color: "gray" },
};

export const dictReportTemplate = {
  ikea: { label: "宜家标准", color: "blue" },
  supor: { label: "苏泊尔标准", color: "red" },
  general: { label: "通用模板", color: "gray" },
};

export const dictInspectionType = {
  first_piece: { label: "首件检验", color: "blue" },
  patrol: { label: "巡检", color: "green" },
};

export const dictInspectionResult = {
  pass: { label: "合格", color: "green" },
  fail: { label: "不合格", color: "red" },
  conditional_pass: { label: "有条件合格", color: "orange" },
};

export const dictRecipeStatus = {
  draft: { label: "草稿", color: "gray" },
  published: { label: "已发布", color: "green" },
  deprecated: { label: "已停用", color: "red" },
};

export const dictDeviationType = {
  upper_violation: { label: "超上限", color: "red" },
  lower_violation: { label: "超下限", color: "red" },
  trend_alert: { label: "趋势预警", color: "orange" },
};

export const dictMaterialType = {
  target: { label: "靶材", color: "blue" },
  gas: { label: "工艺气体", color: "green" },
  auxiliary: { label: "辅材", color: "orange" },
};
