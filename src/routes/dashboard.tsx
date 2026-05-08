import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Package,
  CheckCircle,
  TrendingUp,
  Clock,
  AlertTriangle,
  Activity,
} from "lucide-react";
import { dashboardStats, devices, orders } from "@/lib/mock-data";
import { dictDeviceStatus, dictOrderStatus } from "@/lib/dictionaries";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  // 产量趋势数据
  const outputTrend = [
    { day: "周一", output: 4200 },
    { day: "周二", output: 3800 },
    { day: "周三", output: 4500 },
    { day: "周四", output: 4100 },
    { day: "周五", output: 4800 },
    { day: "周六", output: 3200 },
    { day: "周日", output: 2800 },
  ];

  // 良率趋势数据
  const qualityTrend = [
    { day: "周一", rate: 95.2 },
    { day: "周二", rate: 93.8 },
    { day: "周三", rate: 96.1 },
    { day: "周四", rate: 94.5 },
    { day: "周五", rate: 97.2 },
    { day: "周六", rate: 95.8 },
    { day: "周日", rate: 94.9 },
  ];

  const statCards = [
    { title: "今日批次", value: dashboardStats.todayBatches, icon: Package, color: "blue" },
    { title: "今日合格", value: dashboardStats.todayQualified, icon: CheckCircle, color: "green" },
    { title: "合格率", value: `${dashboardStats.qualificationRate}%`, icon: TrendingUp, color: "purple" },
    { title: "活跃订单", value: dashboardStats.activeOrders, icon: Clock, color: "orange" },
    { title: "紧急交付", value: dashboardStats.urgentDeliveries, icon: AlertTriangle, color: "red" },
    { title: "设备OEE", value: `${dashboardStats.equipmentOEE}%`, icon: Activity, color: "cyan" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">生产看板</h1>
          <p className="text-sm text-muted-foreground mt-1">
            实时监控生产状态，了解整体运行情况
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                  </div>
                  <div
                    className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      stat.color === "blue"
                        ? "bg-blue-100 text-blue-600"
                        : stat.color === "green"
                        ? "bg-green-100 text-green-600"
                        : stat.color === "purple"
                        ? "bg-purple-100 text-purple-600"
                        : stat.color === "orange"
                        ? "bg-orange-100 text-orange-600"
                        : stat.color === "red"
                        ? "bg-red-100 text-red-600"
                        : "bg-cyan-100 text-cyan-600"
                    }`}
                  >
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 产量趋势 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">本周产量趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={outputTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="output" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* 良率趋势 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">本周良率趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={qualityTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" fontSize={12} />
                    <YAxis fontSize={12} domain={[90, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ fill: "#10b981" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Device & Order Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 设备状态 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">设备状态</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>设备编号</TableHead>
                    <TableHead>设备名称</TableHead>
                    <TableHead>状态</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {devices.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell className="font-medium">{device.deviceCode}</TableCell>
                      <TableCell>{device.deviceName}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            dictDeviceStatus[device.status as keyof typeof dictDeviceStatus]
                              ?.color === "green"
                              ? "bg-green-100 text-green-700"
                              : dictDeviceStatus[device.status as keyof typeof dictDeviceStatus]
                                  ?.color === "blue"
                              ? "bg-blue-100 text-blue-700"
                              : dictDeviceStatus[device.status as keyof typeof dictDeviceStatus]
                                  ?.color === "red"
                              ? "bg-red-100 text-red-700"
                              : dictDeviceStatus[device.status as keyof typeof dictDeviceStatus]
                                  ?.color === "orange"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-slate-100 text-slate-700"
                          }
                        >
                          {
                            dictDeviceStatus[device.status as keyof typeof dictDeviceStatus]
                              ?.label
                          }
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 订单进度 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">订单进度</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>订单号</TableHead>
                    <TableHead>客户</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>进度</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.slice(0, 5).map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.orderNo}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            dictOrderStatus[order.status as keyof typeof dictOrderStatus]
                              ?.color === "green"
                              ? "bg-green-100 text-green-700"
                              : dictOrderStatus[order.status as keyof typeof dictOrderStatus]
                                  ?.color === "blue"
                              ? "bg-blue-100 text-blue-700"
                              : dictOrderStatus[order.status as keyof typeof dictOrderStatus]
                                  ?.color === "orange"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-slate-100 text-slate-700"
                          }
                        >
                          {
                            dictOrderStatus[order.status as keyof typeof dictOrderStatus]
                              ?.label
                          }
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500"
                              style={{ width: `${order.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {order.progress}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
