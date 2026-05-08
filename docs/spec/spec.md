> **版本**：1.0.0 | **状态**：draft | **更新时间**：2026-05-08T00:00:00Z
>
> **来源方案**：normal 场景 1.0.0 版本

---

#### 约定说明

本文档使用以下标准值：
- **布局类型**: `list` / `detail` / `form` / `dashboard` / `steps` / `custom`
- **区块类型**: `table` / `form` / `card` / `cards` / `chart` / `tabs` / `steps` / `timeline` / `description` / `statistic` / `custom`
- **字段类型**: `text` / `textarea` / `number` / `money` / `date` / `datetime` / `daterange` / `select` / `multiselect` / `switch` / `upload` / `phone` / `email` / `url` 等

---

#### 一、产品概述

### 1.1 项目背景

国彩真空做PVD真空镀膜加工，4000平方米车间，18人，主要服务宜家、苏泊尔、沃尔玛、吉利汽车这些大客户。大客户对质量追溯的要求越来越严，审核时要看膜厚记录、工艺参数、设备运行数据。现在靠纸质记录，撑不住了。

这套系统帮他们把质量追溯、设备监控、订单管理、成本核算搬到线上，先搞定大客户审核，再逐步把生产管理理顺。

### 1.2 产品目标

1. 工艺参数100%可追溯，满足宜家、苏泊尔等大客户的审核要求
2. 质量报告一键生成，从2小时缩短到5分钟
3. 设备计划外停机减少30%以上
4. 订单准时交付率提升至95%以上
5. 订单成本核算精度达到95%以上，支撑差异化报价

### 1.3 目标用户

| 角色 | 描述 | 核心诉求 |
|------|------|----------|
| 老板/总经理 | 1人，最终决策者 | 看生产看板、监控设备状态、审批重要订单 |
| 总工程师 | 1人，技术核心，20年PVD经验 | 管理工艺配方、处理客诉技术问、维护知识库 |
| 生产主管 | 1-2人，负责排程和现场 | 订单排程、进度跟踪、日常设备监控 |
| 车间操作员 | 若干人，直接使用系统 | 接收任务、记录进度、录入批次信息 |
| 仓管/采购 | 1人，负责物料管理 | 管理库存、提交采购申请、查看库存预警 |
| 大客户 | 外部用户，通过专属门户访问 | 查看订单进度、下载质量报告、提交投诉 |

### 1.4 范围定义

**本期包含：**
- 设备监控（状态看板、故障告警、历史数据查询）
- 质量管理（工艺参数记录、质量追溯、SPC监控、质量报告生成、首件检验）
- 订单管理（订单录入、排程、进度追踪、批次关联）
- 成本核算（电耗采集、材料分摊、工时记录、订单成本汇总）
- 工艺知识库（配方管理、知识沉淀、SPC知识库、版本管理）
- 大客户门户（订单查询、报告下载、投诉通道）
- 投诉管理（投诉登记、8D报告生成、改善跟踪）
- 库存管理（物料管理、入库出库、库存预警）
- 报表中心（生产/设备/质量/成本报表）

**本期不含：**
- ERP财务模块 — 客户已有财务系统，本系统只做成本数据对接，不替代财务
- CAD/CAE工艺设计 — 不属于生产追溯范畴，非客户当前需求
- 设备预测性维护 — 需大量设备运行数据积累，放在未来规划
- 多工厂/多租户 — 客户单工厂，不需要多租户架构
- 私有化部署 — 客户18人团队，SaaS按年付费即可，降低运维负担

---

#### 二、信息架构

### 2.1 站点地图

- 📁 工作台（LayoutDashboard）
  - 生产看板 → `/dashboard`
- 📁 设备管理（Monitor）
  - 设备监控 → `/devices`
  - 设备详情 → `/devices/:id`
  - 设备告警 → `/devices/alerts`
- 📁 订单管理（FileText）
  - 订单列表 → `/orders`
  - 订单排程 → `/orders/schedule`
  - 订单详情 → `/orders/:id`
- 📁 质量管理（ShieldCheck）
  - 批次记录 → `/quality/batches`
  - 质量追溯 → `/quality/trace`
  - SPC监控 → `/quality/spc`
  - 质量报告 → `/quality/reports`
  - 首件检验 → `/quality/first-inspection`
- 📁 成本核算（Calculator）
  - 成本汇总 → `/cost/summary`
  - 成本分析 → `/cost/analysis`
- 📁 工艺知识库（BookOpen）
  - 配方管理 → `/knowledge/recipes`
  - 知识库 → `/knowledge/articles`
  - SPC知识库 → `/knowledge/spc-rules`
- 📁 客户门户（Users）
  - 投诉管理 → `/complaints`
  - 大客户门户 → `/portal`
- 📁 库存管理（Package）
  - 库存台账 → `/inventory`
  - 入库管理 → `/inventory/inbound`
  - 出库管理 → `/inventory/outbound`
- 📁 报表中心（BarChart3）
  - 生产报表 → `/reports/production`
  - 设备报表 → `/reports/equipment`
  - 质量报表 → `/reports/quality`
  - 成本报表 → `/reports/cost`

### 2.2 导航结构

| 一级菜单 | 二级菜单 | 路由 | 说明 |
|----------|----------|------|------|
| 工作台 | 生产看板 | `/dashboard` | 首页统计卡片 + 图表 |
| 设备管理 | 设备监控 | `/devices` | 设备状态看板 + 实时参数 |
| 设备管理 | 设备详情 | `/devices/:id` | 单台设备历史数据 |
| 设备管理 | 设备告警 | `/devices/alerts` | 告警列表 + 处理记录 |
| 订单管理 | 订单列表 | `/orders` | 订单CRUD + 进度追踪 |
| 订单管理 | 订单排程 | `/orders/schedule` | 甘特图排程 |
| 订单管理 | 订单详情 | `/orders/:id` | 订单完整信息 |
| 质量管理 | 批次记录 | `/quality/batches` | 批次工艺参数录入与查询 |
| 质量管理 | 质量追溯 | `/quality/trace` | 多维度质量追溯查询 |
| 质量管理 | SPC监控 | `/quality/spc` | SPC控制图 + 异常预警 |
| 质量管理 | 质量报告 | `/quality/reports` | 报告生成与下载 |
| 质量管理 | 首件检验 | `/quality/first-inspection` | 首件确认与巡检 |
| 成本核算 | 成本汇总 | `/cost/summary` | 订单级成本汇总 |
| 成本核算 | 成本分析 | `/cost/analysis` | 多维度成本分析 |
| 工艺知识库 | 配方管理 | `/knowledge/recipes` | 工艺配方CRUD |
| 工艺知识库 | 知识库 | `/knowledge/articles` | 工艺知识沉淀 |
| 工艺知识库 | SPC知识库 | `/knowledge/spc-rules` | SPC规则配置 |
| 客户门户 | 投诉管理 | `/complaints` | 投诉登记 + 8D报告 |
| 客户门户 | 大客户门户 | `/portal` | 外部客户专属入口 |
| 库存管理 | 库存台账 | `/inventory` | 物料库存查询 |
| 库存管理 | 入库管理 | `/inventory/inbound` | 采购入库 |
| 库存管理 | 出库管理 | `/inventory/outbound` | 生产领用/报废 |
| 报表中心 | 生产报表 | `/reports/production` | 产量/良率统计 |
| 报表中心 | 设备报表 | `/reports/equipment` | 设备OEE/故障率 |
| 报表中心 | 质量报表 | `/reports/quality` | 不良率/报废率 |
| 报表中心 | 成本报表 | `/reports/cost` | 订单/批次成本 |

---

#### 三、功能模块

### 3.1 设备监控模块

> 对多台真空镀膜设备进行统一监控，实时采集运行状态和工艺参数。解决多台设备缺乏统一监控、故障预警不足的问题。

#### 3.1.1 设备看板

**路由**：`/devices`
**布局**：`dashboard`
**描述**：所有设备运行状态一览，点击单台设备进入详情。

##### 设备状态概览（statistic）

| 指标 | fieldKey | 说明 |
|------|----------|------|
| 运行中设备数 | runningCount | 当前正在镀膜的设备 |
| 待机设备数 | standbyCount | 空闲但可生产的设备 |
| 故障设备数 | faultCount | 当前故障告警中的设备 |
| 停机设备数 | stoppedCount | 计划内/外停机的设备 |

##### 设备状态卡片（cards）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 设备编号 | deviceCode | text | 是 | 如 COAT-001 |
| 设备名称 | deviceName | text | 否 | 镀膜机#1 |
| 运行状态 | status | tag | 是 | 选项来源: dict-device-status |
| 当前真空度 | vacuumLevel | number | 否 | 单位: Pa |
| 当前温度 | temperature | number | 否 | 单位: °C |
| 运行时长 | runtime | number | 是 | 今日累计运行时长(h) |

##### 操作

| 按钮 | 类型 | 位置 | 行为 | 权限 |
|------|------|------|------|------|
| 刷新状态 | default | toolbar-right | action | 全部 |
| 查看全部告警 | link | row | navigate → `/devices/alerts` | 全部 |
| 进入设备详情 | link | row | navigate → `/devices/:id` | 全部 |

##### 业务规则

- 设备状态每30秒自动刷新，无需手动操作
- 故障设备卡片标红显示，排在列表最上方
- 点击进入设备详情查看历史数据曲线

---

#### 3.1.2 设备详情

**路由**：`/devices/:id`
**布局**：`detail`
**描述**：单台设备的实时参数、历史数据、告警记录。

##### 设备基本信息（description）

| 字段 | fieldKey | 类型 | 说明 |
|------|----------|------|------|
| 设备编号 | deviceCode | text | 唯一标识 |
| 设备名称 | deviceName | text | |
| 设备型号 | deviceModel | text | 厂家型号 |
| 设备位置 | location | text | 车间位置 |
| PLC品牌 | plcBrand | select | 选项来源: dict-plc-brand |
| 通信协议 | protocol | select | 选项来源: dict-protocol |
| 最近维护日期 | lastMaintenance | date | |

##### 实时参数监控（chart）

| 图表 | 类型 | 数据说明 |
|------|------|----------|
| 真空度曲线 | line | 实时采集，1分钟间隔 |
| 温度曲线 | line | 实时采集，1分钟间隔 |
| 功率曲线 | line | 实时采集，1分钟间隔 |

##### 历史数据查询（form + table）

| 字段 | fieldKey | 类型 | 必填 | 说明 |
|------|----------|------|------|------|
| 时间范围 | timeRange | daterange | 是 | 查询历史数据的时间范围 |

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 采集时间 | collectTime | datetime | 是 | |
| 真空度 | vacuumLevel | number | 是 | Pa |
| 温度 | temperature | number | 是 | °C |
| 功率 | power | number | 是 | kW |
| 气体流量 | gasFlow | number | 否 | L/min |

##### 操作

| 按钮 | 类型 | 位置 | 行为 | 权限 |
|------|------|------|------|------|
| 导出数据 | default | toolbar-right | download | 全部 |
| 查看告警记录 | link | toolbar-right | navigate → `/devices/alerts` | 全部 |
| 编辑设备信息 | primary | card-header | modal | 管理员 |

---

#### 3.1.3 设备告警列表

**路由**：`/devices/alerts`
**布局**：`list`
**描述**：设备故障告警列表，支持按严重程度筛选和处理。

##### 筛选条件（form）

| 字段 | fieldKey | 类型 | 必填 | 说明 |
|------|----------|------|------|------|
| 告警级别 | alertLevel | select | 否 | 选项来源: dict-alert-level |
| 设备 | deviceId | select | 否 | 全部设备/指定设备 |
| 告警状态 | alertStatus | select | 否 | 选项来源: dict-alert-status |
| 时间范围 | timeRange | daterange | 否 | |

##### 告警列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 告警时间 | alertTime | datetime | 是 | |
| 设备编号 | deviceCode | text | 是 | |
| 告警级别 | alertLevel | tag | 是 | 选项来源: dict-alert-level |
| 告警内容 | alertContent | text | 否 | 描述 |
| 处理状态 | status | status | 是 | 选项来源: dict-alert-status |
| 处理人 | handler | text | 否 | |

##### 操作

| 按钮 | 类型 | 位置 | 行为 | 权限 |
|------|------|------|------|------|
| 新建告警记录 | primary | toolbar-right | drawer | 管理员 |
| 处理告警 | link | row | modal | 管理员 |
| 查看详情 | link | row | navigate → `/devices/:id` | 全部 |

##### 业务规则

- 告警级别：紧急（红色）、重要（橙色）、一般（黄色）
- 紧急告警自动推送至生产主管和总工程师
- 告警处理后需填写处理说明

---

### 3.2 质量管理模块

> 建立完整的质量追溯体系，支撑国际品牌客户合规审核。解决工艺参数记录不完整、无法满足大客户审核追溯要求的问题。

#### 3.2.1 批次记录

**路由**：`/quality/batches`
**布局**：`list`
**描述**：生产批次记录列表，关联订单和设备。

##### 筛选条件（form）

| 字段 | fieldKey | 类型 | 必填 | 说明 |
|------|----------|------|------|------|
| 批次号 | batchNo | text | 否 | 模糊搜索 |
| 关联订单 | orderId | text | 否 | 订单号搜索 |
| 客户名称 | customerName | text | 否 | |
| 生产日期 | productionDate | daterange | 否 | |
| 质量状态 | qualityStatus | select | 否 | 选项来源: dict-quality-status |

##### 批次列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 批次号 | batchNo | link | 是 | 点击查看详情 |
| 关联订单 | orderNo | text | 是 | |
| 客户 | customerName | text | 否 | |
| 产品规格 | productSpec | text | 否 | |
| 膜层颜色 | coatingColor | tag | 否 | 选项来源: dict-coating-color |
| 膜厚(μm) | filmThickness | number | 是 | 实测值 |
| 附着力 | adhesion | text | 否 | 测试等级 |
| 生产时间 | productionTime | datetime | 是 | |
| 质量状态 | qualityStatus | status | 是 | 选项来源: dict-quality-status |

##### 操作

| 按钮 | 类型 | 位置 | 行为 | 权限 |
|------|------|------|------|------|
| 新建批次 | primary | toolbar-right | navigate | 生产主管 |
| 录入工艺参数 | default | row | navigate → `/quality/batches/:id/params` | 操作员 |
| 查看追溯信息 | link | row | navigate → `/quality/trace?batchNo=xxx` | 全部 |
| 导出质量报告 | default | row | download | 管理员 |

##### 业务规则

- 批次号自动生成：BATCH-YYYYMMDD-XXX
- 每批次必须绑定订单和设备
- 工艺参数由设备自动采集，操作员可补充手动检测数据
- 膜厚、附着力、盐雾测试为必检项

#### 3.2.2 质量追溯

**路由**：`/quality/trace`
**布局**：`custom`
**描述**：多维度质量追溯查询，支持按订单/批次/设备/客户查询完整工艺链。

##### 追溯查询条件（form）

| 字段 | fieldKey | 类型 | 必填 | 说明 |
|------|----------|------|------|------|
| 追溯方式 | traceType | radio | 是 | 选项来源: dict-trace-type |
| 追溯值 | traceValue | text | 是 | 订单号/批次号/设备号 |

##### 追溯结果（description + table + timeline）

追溯结果按以下区块展示：
1. 批次基本信息（description）
2. 工艺参数记录表（table）：真空度、温度、功率、时间、气体流量等
3. 质量检测记录表（table）：膜厚、附着力、盐雾测试、外观
4. 设备运行记录（table）：镀膜期间的设备状态变化
5. 追溯时间线（timeline）：从接单到交付的完整节点

##### 操作

| 按钮 | 类型 | 位置 | 行为 | 权限 |
|------|------|------|------|------|
| 导出追溯报告 | primary | toolbar-right | download | 全部 |
| 打印报告 | default | toolbar-right | print | 全部 |

---

#### 3.2.3 SPC监控

**路由**：`/quality/spc`
**布局**：`custom`
**描述**：SPC统计过程控制，基于工艺知识库设定的参数上下限实时监控工艺稳定性。

##### SPC控制图（chart）

| 图表 | 类型 | 数据说明 |
|------|------|----------|
| 控制图（Xbar-R） | line | 含上控制限UCL、下控制限LCL、中心线CL |
| 趋势图 | line | 参数变化趋势 |

##### 预警记录（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 触发时间 | triggerTime | datetime | 是 | |
| 参数名称 | paramName | text | 否 | |
| 实际值 | actualValue | number | 是 | |
| 上限 | upperLimit | number | 否 | UCL |
| 下限 | lowerLimit | number | 否 | LCL |
| 偏差类型 | deviationType | tag | 否 | 选项来源: dict-deviation-type |

##### 操作

| 按钮 | 类型 | 位置 | 行为 | 权限 |
|------|------|------|------|------|
| 配置SPC规则 | primary | toolbar-right | navigate → `/knowledge/spc-rules` | 总工程师 |

##### 业务规则

- SPC规则基于工艺知识库中的标准参数范围自动生成
- 超出控制限时自动告警，推送至生产主管和总工程师
- 支持自定义控制规则（如连续7点同侧趋势预警）

---

#### 3.2.4 质量报告

**路由**：`/quality/reports`
**布局**：`list`
**描述**：一键生成符合大客户格式要求的质量报告。

##### 筛选条件（form）

| 字段 | fieldKey | 类型 | 必填 | 说明 |
|------|----------|------|------|------|
| 报告模板 | reportTemplate | select | 否 | 选项来源: dict-report-template |
| 批次号 | batchNo | text | 否 | |
| 客户名称 | customerName | select | 否 | 选项来源: dict-customer |

##### 报告列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 报告编号 | reportNo | text | 是 | |
| 报告模板 | templateName | text | 否 | |
| 关联批次 | batchNo | text | 是 | |
| 客户 | customerName | text | 否 | |
| 生成时间 | generatedAt | datetime | 是 | |
| 生成人 | createdBy | text | 否 | |

##### 操作

| 按钮 | 类型 | 位置 | 行为 | 权限 |
|------|------|------|------|------|
| 生成报告 | primary | toolbar-right | modal | 全部 |
| 下载 | default | row | download | 全部 |
| 预览 | link | row | modal | 全部 |

##### 业务规则

- 报告模板预置：宜家标准模板、苏泊尔标准模板、通用模板
- 报告自动生成：关联批次的工艺参数 + 质量检测数据
- 支持批量生成和导出

#### 3.2.5 首件检验

**路由**：`/quality/first-inspection`
**布局**：`list`
**描述**：首件确认与过程巡检记录管理。

##### 检验记录列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 检验单号 | inspectionNo | text | 是 | |
| 关联批次 | batchNo | text | 是 | |
| 检验类型 | inspectionType | tag | 否 | 选项来源: dict-inspection-type |
| 检验结果 | result | status | 是 | 选项来源: dict-inspection-result |
| 检验人 | inspector | text | 否 | |
| 检验时间 | inspectionTime | datetime | 是 | |

##### 操作

| 按钮 | 类型 | 位置 | 行为 | 权限 |
|------|------|------|------|------|
| 新建检验 | primary | toolbar-right | form | 操作员 |

---

### 3.3 订单管理模块

> 统一管理多客户、多批次订单，实现订单全生命周期可视化追踪。

#### 3.3.1 订单列表

**路由**：`/orders`
**布局**：`list`
**描述**：所有订单的列表视图，支持按客户、状态、交期筛选。

##### 筛选条件（form）

| 字段 | fieldKey | 类型 | 必填 | 说明 |
|------|----------|------|------|------|
| 订单号 | orderNo | text | 否 | 模糊搜索 |
| 客户名称 | customerName | select | 否 | 选项来源: dict-customer |
| 订单状态 | status | select | 否 | 选项来源: dict-order-status |
| 交期 | deliveryDate | daterange | 否 | |

##### 订单列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 订单号 | orderNo | link | 是 | 点击查看详情 |
| 客户 | customerName | text | 是 | |
| 产品规格 | productSpec | text | 否 | |
| 数量 | quantity | number | 是 | |
| 交期 | deliveryDate | date | 是 | |
| 完成进度 | progress | progress | 是 | 0-100% |
| 订单状态 | status | status | 是 | 选项来源: dict-order-status |
| 批次数量 | batchCount | number | 是 | 关联的生产批次数 |

##### 操作

| 按钮 | 类型 | 位置 | 行为 | 权限 |
|------|------|------|------|------|
| 新建订单 | primary | toolbar-right | form | 生产主管 |
| 编辑 | link | row | drawer | 生产主管 |
| 查看进度 | link | row | navigate → `/orders/:id` | 全部 |
| 生成批次 | default | row | modal | 生产主管 |

##### 业务规则

- 订单状态流转：待排产 → 生产中 → 冷却中 → 已完成 → 已交付
- 支持按客户分类显示订单，快速筛选大客户订单
- 交期临近3天的订单自动标黄预警

#### 3.3.2 订单排程

**路由**：`/orders/schedule`
**布局**：`custom`
**描述**：基于设备产能和交期要求的甘特图排程视图。

##### 排程看板（custom）

- 甘特图横向显示设备，纵向显示订单/批次
- 支持拖拽调整排程
- 颜色区分订单优先级（紧急/普通）
- 冲突订单自动标红提示

##### 操作

| 按钮 | 类型 | 位置 | 行为 | 权限 |
|------|------|------|------|------|
| 自动排程 | primary | toolbar-right | action | 生产主管 |
| 保存排程 | default | toolbar-right | action | 生产主管 |
| 重置 | danger | toolbar-right | action | 生产主管 |

#### 3.3.3 订单详情

**路由**：`/orders/:id`
**布局**：`detail`
**描述**：订单完整信息，含关联批次、成本、质量记录。

##### 基本信息（description）

| 字段 | fieldKey | 类型 | 说明 |
|------|----------|------|------|
| 订单号 | orderNo | text | |
| 客户 | customerName | text | |
| 产品规格 | productSpec | text | |
| 材质 | material | select | 选项来源: dict-material |
| 数量 | quantity | number | |
| 膜层颜色 | coatingColor | text | |
| 膜厚要求 | filmThicknessReq | number | μm |
| 交期 | deliveryDate | date | |
| 订单状态 | status | tag | 选项来源: dict-order-status |

##### 关联批次（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 批次号 | batchNo | link | 是 | 跳转批次详情 |
| 状态 | status | tag | 是 | 选项来源: dict-batch-status |
| 完成时间 | completedAt | datetime | 是 | |
| 质量状态 | qualityStatus | tag | 是 | 选项来源: dict-quality-status |

##### 操作

| 按钮 | 类型 | 位置 | 行为 | 权限 |
|------|------|------|------|------|
| 编辑 | default | card-header | drawer | 生产主管 |
| 删除 | danger | card-header | action | 生产主管 |

---

### 3.4 成本核算模块

> 将电耗、靶材消耗、气体、人工工时等成本精确分摊到具体订单。

#### 3.4.1 成本汇总

**路由**：`/cost/summary`
**布局**：`list`
**描述**：按订单/批次汇总各项成本，计算毛利。

##### 筛选条件（form）

| 字段 | fieldKey | 类型 | 必填 | 说明 |
|------|----------|------|------|------|
| 时间范围 | timeRange | daterange | 否 | |
| 客户 | customerName | select | 否 | 选项来源: dict-customer |
| 订单号 | orderNo | text | 否 | |

##### 成本汇总列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 订单号 | orderNo | text | 是 | |
| 客户 | customerName | text | 是 | |
| 电耗成本 | electricityCost | money | 是 | 元 |
| 靶材成本 | targetCost | money | 是 | 元 |
| 气体成本 | gasCost | money | 是 | 元 |
| 人工成本 | laborCost | money | 是 | 元 |
| 总成本 | totalCost | money | 是 | 元 |
| 订单收入 | revenue | money | 是 | 元（需手动录入或从ERP对接） |
| 毛利率 | profitMargin | percent | 是 | |

##### 操作

| 按钮 | 类型 | 位置 | 行为 | 权限 |
|------|------|------|------|------|
| 导出成本报表 | default | toolbar-right | download | 管理员 |
| 查看详情 | link | row | navigate → `/cost/summary/:id` | 管理员 |

#### 3.4.2 成本分析

**路由**：`/cost/analysis`
**布局**：`custom`
**描述**：多维度成本分析图表。

##### 分析图表（chart）

| 图表 | 类型 | 数据说明 |
|------|------|----------|
| 成本构成饼图 | pie | 电耗/靶材/气体/人工占比 |
| 客户成本对比 | bar | 按客户对比平均订单成本 |
| 成本趋势 | line | 月度成本变化趋势 |

---

### 3.5 工艺知识库模块

> 将总工程师20年PVD工艺经验数字化为可传承、可复用的知识资产。

#### 3.5.1 配方管理

**路由**：`/knowledge/recipes`
**布局**：`list`
**描述**：工艺配方的录入、查询、版本管理。

##### 配方列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 配方编号 | recipeNo | text | 是 | |
| 配方名称 | recipeName | text | 否 | |
| 材质 | material | tag | 是 | 选项来源: dict-material |
| 膜层颜色 | coatingColor | tag | 是 | 选项来源: dict-coating-color |
| 版本号 | version | text | 否 | |
| 状态 | status | status | 是 | 选项来源: dict-recipe-status |
| 创建人 | createdBy | text | 否 | |
| 创建时间 | createdAt | datetime | 是 | |

##### 操作

| 按钮 | 类型 | 位置 | 行为 | 权限 |
|------|------|------|------|------|
| 新建配方 | primary | toolbar-right | form | 总工程师 |
| 编辑 | link | row | drawer | 总工程师 |
| 启用/停用 | link | row | action | 总工程师 |

##### 业务规则

- 配方支持版本化管理，修改后生成新版本，旧版本保留
- 只有"已发布"状态的配方可在生产中使用
- 配方删除为软删除，保留历史记录

#### 3.5.2 配方详情/编辑

**路由**：`/knowledge/recipes/:id`
**布局**：`form`
**描述**：编辑或查看配方完整参数。

##### 基本信息（form）

| 字段 | fieldKey | 类型 | 必填 | 说明 |
|------|----------|------|------|------|
| 配方名称 | recipeName | text | 是 | |
| 适用材质 | material | select | 是 | 选项来源: dict-material |
| 膜层颜色 | coatingColor | select | 是 | 选项来源: dict-coating-color |
| 膜厚要求 | filmThicknessReq | number | 是 | μm |
| 设备要求 | deviceReq | text | 否 | 适用的设备类型 |

##### 工艺参数（form）

| 字段 | fieldKey | 类型 | 必填 | 说明 |
|------|----------|------|------|------|
| 靶材类型 | targetType | select | 是 | 选项来源: dict-target-type |
| 溅射功率 | sputterPower | number | 是 | kW |
| 工作真空度 | workVacuum | number | 是 | Pa |
| 基底温度 | baseTemp | number | 是 | °C |
| 镀膜时间 | coatingTime | number | 是 | 分钟 |
| 气体流量 | gasFlow | number | 是 | L/min |
| 偏压电压 | biasVoltage | number | 否 | V |

##### 操作

| 按钮 | 类型 | 位置 | 行为 | 权限 |
|------|------|------|------|------|
| 保存 | primary | form-footer | action | 总工程师 |
| 发布 | default | form-footer | action | 总工程师 |
| 返回 | default | form-footer | navigate → `/knowledge/recipes` | 全部 |

---

#### 3.5.3 SPC知识库

**路由**：`/knowledge/spc-rules`
**布局**：`list`
**描述**：SPC控制规则配置，定义各工艺参数的上下限。

##### 规则列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 规则名称 | ruleName | text | 否 | |
| 关联配方 | recipeName | text | 是 | |
| 参数名称 | paramName | text | 否 | |
| 上限(UCL) | upperLimit | number | 是 | |
| 下限(LCL) | lowerLimit | number | 是 | |
| 中心值(CL) | centerLine | number | 是 | |
| 预警规则 | warnRule | text | 否 | |

---

### 3.6 大客户门户模块

> 为宜家、苏泊尔等大客户提供专属服务入口。

#### 3.6.1 大客户门户

**路由**：`/portal`
**布局**：`custom`
**描述**：外部客户的专属入口，无需注册，通过分享链接或账号密码访问。

##### 门户功能

- 订单进度查询：实时显示客户所有订单的生产进度
- 质量报告下载：查看和下载与该客户相关的质量报告
- 投诉提交：在线提交投诉和附件

##### 业务规则

- 每个大客户独立账号，只能看到自己的数据
- 门户界面可配置客户品牌Logo和配色
- 数据权限与主系统隔离，确保客户间数据不可见

---

### 3.7 投诉管理模块

> 建立客户投诉全流程管理闭环，支持8D报告自动生成。

#### 3.7.1 投诉列表

**路由**：`/complaints`
**布局**：`list`
**描述**：投诉登记和处理记录列表。

##### 筛选条件（form）

| 字段 | fieldKey | 类型 | 必填 | 说明 |
|------|----------|------|------|------|
| 投诉单号 | complaintNo | text | 否 | |
| 客户 | customerName | select | 否 | 选项来源: dict-customer |
| 投诉原因 | reason | select | 否 | 选项来源: dict-complaint-reason |
| 处理状态 | status | select | 否 | 选项来源: dict-complaint-status |

##### 投诉列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 投诉单号 | complaintNo | link | 是 | |
| 客户 | customerName | text | 是 | |
| 投诉原因 | reason | tag | 否 | 选项来源: dict-complaint-reason |
| 关联批次 | batchNo | text | 是 | |
| 提交时间 | createdAt | datetime | 是 | |
| 处理状态 | status | status | 是 | 选项来源: dict-complaint-status |
| 负责人 | assignee | text | 否 | |

##### 操作

| 按钮 | 类型 | 位置 | 行为 | 权限 |
|------|------|------|------|------|
| 新建投诉 | primary | toolbar-right | form | 全部 |
| 查看详情 | link | row | navigate → `/complaints/:id` | 全部 |
| 生成8D报告 | default | row | download | 管理员 |

#### 3.7.2 投诉详情/8D报告

**路由**：`/complaints/:id`
**布局**：`steps`
**描述**：8D问题解决方法论，引导用户逐步填写。

##### 8D步骤（steps）

| 步骤 | 步骤名称 | 内容说明 |
|------|---------|---------|
| D1 | 组建团队 | 指定处理团队成员和职责 |
| D2 | 问题描述 | 详细描述投诉内容、影响范围 |
| D3 | 临时措施 | 采取的应急处理措施 |
| D4 | 根本原因 | 鱼骨图/5Why分析 |
| D5 | 纠正措施 | 制定的纠正和预防措施 |
| D6 | 效果验证 | 验证措施有效性的数据 |
| D7 | 防止再发 | 标准化和横向展开 |
| D8 | 团队表彰 | 总结和表彰 |

---

### 3.8 库存管理模块

> 管理靶材、气体等辅材的库存，支持采购和领用流程。

#### 3.8.1 库存台账

**路由**：`/inventory`
**布局**：`list`
**描述**：所有物料的库存台账。

##### 筛选条件（form）

| 字段 | fieldKey | 类型 | 必填 | 说明 |
|------|----------|------|------|------|
| 物料编码 | materialCode | text | 否 | |
| 物料名称 | materialName | text | 否 | |
| 物料类型 | materialType | select | 否 | 选项来源: dict-material-type |

##### 库存列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 物料编码 | materialCode | text | 是 | |
| 物料名称 | materialName | text | 是 | |
| 物料类型 | materialType | tag | 是 | 选项来源: dict-material-type |
| 规格 | spec | text | 否 | |
| 当前库存 | currentQty | number | 是 | |
| 安全库存 | safetyQty | number | 是 | |
| 库存状态 | stockStatus | tag | 是 | 选项来源: dict-stock-status |
| 供应商 | supplier | text | 否 | |
| 批次号 | supplierBatch | text | 否 | 供应商批次（用于追溯） |

##### 操作

| 按钮 | 类型 | 位置 | 行为 | 权限 |
|------|------|------|------|------|
| 新建物料 | primary | toolbar-right | form | 仓管 |
| 入库 | default | toolbar-right | navigate → `/inventory/inbound` | 仓管 |
| 出库 | default | toolbar-right | navigate → `/inventory/outbound` | 仓管 |
| 盘点 | default | row | modal | 仓管 |

---

### 3.9 报表中心模块

> 提供多维度生产数据统计和分析报表。

#### 3.9.1 生产报表

**路由**：`/reports/production`
**布局**：`custom`
**描述**：产量、良率、工时等生产数据统计。

| 图表 | 类型 | 数据说明 |
|------|------|----------|
| 日产量趋势 | line | 按日统计完成批次/数量 |
| 良率趋势 | line | 按日统计合格率 |
| 客户产量对比 | bar | 按客户统计产量 |

#### 3.9.2 设备报表

**路由**：`/reports/equipment`
**布局**：`custom`
**描述**：设备OEE、故障率、停机时间统计。

| 图表 | 类型 | 数据说明 |
|------|------|----------|
| 设备稼动率 | bar | 各设备月度稼动率对比 |
| 故障率趋势 | line | 月度故障率变化 |
| 停机原因分布 | pie | 计划内/计划外停机占比 |

#### 3.9.3 质量报表

**路由**：`/reports/quality`
**布局**：`custom`
**描述**：不良率、报废率、质量问题分布。

| 图表 | 类型 | 数据说明 |
|------|------|----------|
| 不良率趋势 | line | 月度不良率变化 |
| 质量问题分布 | bar | 按问题类型（膜层脱落/色差/膜厚不达标） |

#### 3.9.4 成本报表

**路由**：`/reports/cost`
**布局**：`custom`
**描述**：订单/批次成本分析。

| 图表 | 类型 | 数据说明 |
|------|------|----------|
| 成本趋势 | line | 月度平均订单成本变化 |
| 成本构成 | pie | 电耗/靶材/气体/人工占比 |

---

#### 四、全局规则

### 4.1 角色权限

| 角色 | 描述 | 模块权限 |
|------|------|----------|
| 管理员（老板/总经理） | 1人，系统最高权限 | 全部模块读写 |
| 总工程师 | 1人，技术管理 | 质量管理、工艺知识库、SPC监控 读写；其他模块只读 |
| 生产主管 | 1-2人，排程和现场管理 | 订单管理、设备监控、成本核算 读写；其他模块只读 |
| 操作员 | 若干人，产线操作 | 批次记录、首件检验 读写；设备监控只读 |
| 仓管 | 1人，物料管理 | 库存管理 读写；其他模块无权限 |
| 大客户 | 外部用户 | 仅大客户门户 只读 + 投诉提交 |

### 4.2 数据字典

#### 4.2.1 设备状态（dict-device-status）

| 值 | 显示 | 颜色 |
|----|------|------|
| running | 运行中 | green |
| standby | 待机 | blue |
| fault | 故障 | red |
| stopped | 停机 | gray |
| maintenance | 维护中 | orange |

#### 4.2.2 订单状态（dict-order-status）

| 值 | 显示 | 颜色 |
|----|------|------|
| pending | 待排产 | gray |
| in_progress | 生产中 | blue |
| cooling | 冷却中 | orange |
| completed | 已完成 | green |
| delivered | 已交付 | purple |

#### 4.2.3 质量状态（dict-quality-status）

| 值 | 显示 | 颜色 |
|----|------|------|
| pending | 待检测 | gray |
| pass | 合格 | green |
| fail | 不合格 | red |
| rework | 返工中 | orange |

#### 4.2.4 批次状态（dict-batch-status）

| 值 | 显示 | 颜色 |
|----|------|------|
| pending | 待生产 | gray |
| in_progress | 镀膜中 | blue |
| cooling | 冷却中 | orange |
| completed | 已完成 | green |
| quality_checked | 质检完成 | green |

#### 4.2.5 告警级别（dict-alert-level）

| 值 | 显示 | 颜色 |
|----|------|------|
| urgent | 紧急 | red |
| important | 重要 | orange |
| normal | 一般 | yellow |

#### 4.2.6 告警状态（dict-alert-status）

| 值 | 显示 | 颜色 |
|----|------|------|
| open | 未处理 | red |
| in_progress | 处理中 | blue |
| resolved | 已解决 | green |

#### 4.2.7 材质类型（dict-material）

| 值 | 显示 | 颜色 |
|----|------|------|
| stainless_steel | 不锈钢 | gray |
| iron | 铁 | brown |
| copper | 铜 | orange |
| aluminum | 铝 | silver |
| zinc_alloy | 锌合金 | blue |

#### 4.2.8 膜层颜色（dict-coating-color）

| 值 | 显示 | 颜色 |
|----|------|------|
| ti_n_gold | 钛金 | gold |
| ti_n_blue | 钛蓝 | blue |
| ti_n_black | 钛黑 | black |
| ti_n_rose | 玫瑰金 | pink |
| ti_n_chrome | 铬色 | silver |

#### 4.2.9 PLC品牌（dict-plc-brand）

| 值 | 显示 | 颜色 |
|----|------|------|
| siemens | 西门子 | teal |
| mitsubishi | 三菱 | blue |
| omron | 欧姆龙 | green |
| other | 其他 | gray |

#### 4.2.10 通信协议（dict-protocol）

| 值 | 显示 | 颜色 |
|----|------|------|
| opc_ua | OPC UA | blue |
| modbus_tcp | Modbus TCP | green |
| modbus_rtu | Modbus RTU | orange |
| other | 其他 | gray |

#### 4.2.11 靶材类型（dict-target-type）

| 值 | 显示 | 颜色 |
|----|------|------|
| titanium | 钛靶 | gray |
| chromium | 铬靶 | blue |
| tin | 氮化钛 | gold |
| other | 其他 | gray |

#### 4.2.12 物料类型（dict-material-type）

| 值 | 显示 | 颜色 |
|----|------|------|
| target | 靶材 | blue |
| gas | 工艺气体 | green |
| auxiliary | 辅材 | orange |

#### 4.2.13 库存状态（dict-stock-status）

| 值 | 显示 | 颜色 |
|----|------|------|
| normal | 正常 | green |
| low | 低于安全库存 | orange |
| critical | 严重不足 | red |

#### 4.2.14 客户列表（dict-customer）

| 值 | 显示 | 颜色 |
|----|------|------|
| ikea | 宜家 | blue |
| supor | 苏泊尔 | red |
| walmart | 沃尔玛 | blue |
| hm | H&M | red |
| qianjiang | 钱江摩托 | green |
| haers | 哈尔斯 | orange |
| geely | 吉利汽车 | blue |
| cf_moto | 春风动力 | green |

#### 4.2.15 投诉原因（dict-complaint-reason）

| 值 | 显示 | 颜色 |
|----|------|------|
| coating_peel | 膜层脱落 | red |
| color_diff | 色差 | orange |
| thickness_issue | 膜厚不达标 | orange |
| adhesion_fail | 附着力不合格 | red |
| salt_spray_fail | 盐雾测试不合格 | red |
| other | 其他 | gray |

#### 4.2.16 投诉状态（dict-complaint-status）

| 值 | 显示 | 颜色 |
|----|------|------|
| new | 新建 | blue |
| investigating | 调查中 | orange |
| in_progress | 处理中 | yellow |
| resolved | 已解决 | green |
| closed | 已关闭 | gray |

#### 4.2.17 报告模板（dict-report-template）

| 值 | 显示 | 颜色 |
|----|------|------|
| ikea | 宜家标准 | blue |
| supor | 苏泊尔标准 | red |
| general | 通用模板 | gray |

#### 4.2.18 追溯方式（dict-trace-type）

| 值 | 显示 | 颜色 |
|----|------|------|
| order | 按订单号追溯 | blue |
| batch | 按批次号追溯 | green |
| device | 按设备号追溯 | orange |
| customer | 按客户追溯 | purple |

#### 4.2.19 偏差类型（dict-deviation-type）

| 值 | 显示 | 颜色 |
|----|------|------|
| upper_violation | 超上限 | red |
| lower_violation | 超下限 | red |
| trend_alert | 趋势预警 | orange |

#### 4.2.20 检验类型（dict-inspection-type）

| 值 | 显示 | 颜色 |
|----|------|------|
| first_piece | 首件检验 | blue |
| patrol | 巡检 | green |

#### 4.2.21 检验结果（dict-inspection-result）

| 值 | 显示 | 颜色 |
|----|------|------|
| pass | 合格 | green |
| fail | 不合格 | red |
| conditional_pass | 有条件合格 | orange |

#### 4.2.22 配方状态（dict-recipe-status）

| 值 | 显示 | 颜色 |
|----|------|------|
| draft | 草稿 | gray |
| published | 已发布 | green |
| deprecated | 已停用 | red |

### 4.3 状态流转

#### 4.3.1 订单状态流转

| 当前状态 | 操作 | 目标状态 | 条件 |
|----------|------|----------|------|
| 待排产 | 排产 | 生产中 | 已分配到设备和批次 |
| 生产中 | 完成镀膜 | 冷却中 | 镀膜工序完成 |
| 冷却中 | 完成冷却 | 已完成 | 冷却完成，质检通过 |
| 已完成 | 发货确认 | 已交付 | 客户签收 |

#### 4.3.2 批次状态流转

| 当前状态 | 操作 | 目标状态 | 条件 |
|----------|------|----------|------|
| 待生产 | 开始镀膜 | 镀膜中 | 设备开始运行 |
| 镀膜中 | 镀膜完成 | 冷却中 | 镀膜工序完成 |
| 冷却中 | 冷却完成 | 已完成 | 冷却工序完成 |
| 已完成 | 质检通过 | 质检完成 | 质量检测合格 |

#### 4.3.3 设备告警状态流转

| 当前状态 | 操作 | 目标状态 | 条件 |
|----------|------|----------|------|
| 未处理 | 开始处理 | 处理中 | 指定处理人 |
| 处理中 | 处理完成 | 已解决 | 故障已排除 |
| 已解决 | 归档 | 已归档 | 确认无需跟进 |

---

#### 附录

### A. 变更记录

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| 1.0.0 | 2026-05-08 | 初始版本，基于方案 v1.0.0 生成 |
