import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Search, Link2, Eye } from "lucide-react";
import { useState } from "react";
import { orders, customers, materials } from "@/lib/mock-data";
import { dictOrderStatus, dictMaterial, dictCoatingColor } from "@/lib/dictionaries";
import { useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/orders/_index")({
  component: OrderList,
});

function OrderList() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [customerFilter, setCustomerFilter] = useState<string>("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // 过滤订单
  const filteredOrders = orders.filter((order) => {
    const matchSearch =
      order.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.includes(searchTerm);
    const matchStatus = statusFilter === "all" || order.status === statusFilter;
    const matchCustomer = customerFilter === "all" || order.customerName === customerFilter;
    return matchSearch && matchStatus && matchCustomer;
  });

  // 统计各状态订单数
  const statusCounts = {
    pending: orders.filter((o) => o.status === "pending").length,
    in_progress: orders.filter((o) => o.status === "in_progress").length,
    cooling: orders.filter((o) => o.status === "cooling").length,
    completed: orders.filter((o) => o.status === "completed").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">订单管理</h1>
            <p className="text-sm text-muted-foreground mt-1">
              管理所有订单，跟踪生产进度
            </p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            新建订单
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4">
          {[
            { label: "待排产", status: "pending", color: "gray" },
            { label: "生产中", status: "in_progress", color: "blue" },
            { label: "冷却中", status: "cooling", color: "orange" },
            { label: "已完成", status: "completed", color: "green" },
            { label: "已交付", status: "delivered", color: "purple" },
          ].map((item) => (
            <Card key={item.status}>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-2xl font-semibold mt-1">{statusCounts[item.status as keyof typeof statusCounts]}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索订单号/客户..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="订单状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="pending">待排产</SelectItem>
                  <SelectItem value="in_progress">生产中</SelectItem>
                  <SelectItem value="cooling">冷却中</SelectItem>
                  <SelectItem value="completed">已完成</SelectItem>
                  <SelectItem value="delivered">已交付</SelectItem>
                </SelectContent>
              </Select>
              <Select value={customerFilter} onValueChange={setCustomerFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="客户名称" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部客户</SelectItem>
                  {customers.map((c) => (
                    <SelectItem key={c.value} value={c.label}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Order Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">订单列表 ({filteredOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>订单号</TableHead>
                  <TableHead>客户</TableHead>
                  <TableHead>产品规格</TableHead>
                  <TableHead className="text-right">数量</TableHead>
                  <TableHead>交期</TableHead>
                  <TableHead>进度</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead className="text-center">批次</TableHead>
                  <TableHead className="text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => {
                  const isUrgent =
                    new Date(order.deliveryDate).getTime() - Date.now() < 3 * 24 * 60 * 60 * 1000 &&
                    order.status !== "delivered" && order.status !== "completed";
                  return (
                    <TableRow key={order.id} className={isUrgent ? "bg-yellow-50" : ""}>
                      <TableCell className="font-medium">{order.orderNo}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.productSpec}</TableCell>
                      <TableCell className="text-right">{order.quantity.toLocaleString()}</TableCell>
                      <TableCell className={isUrgent ? "text-red-600 font-medium" : ""}>
                        {order.deliveryDate}
                        {isUrgent && " ⚠️"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                order.progress === 100 ? "bg-green-500" : "bg-blue-500"
                              }`}
                              style={{ width: `${order.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">{order.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
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
                              : dictOrderStatus[order.status as keyof typeof dictOrderStatus]
                                  ?.color === "purple"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-slate-100 text-slate-700"
                          }
                        >
                          {dictOrderStatus[order.status as keyof typeof dictOrderStatus]?.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">{order.batchCount}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.navigate({ to: "/orders/$id", params: { id: order.id } })}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            详情
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Create Order Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>新建订单</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">客户名称</label>
                  <Select defaultValue="">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="选择客户" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">产品规格</label>
                  <Input className="mt-1" placeholder="如：不锈钢餐具" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">材质</label>
                  <Select defaultValue="">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="选择材质" />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map((m) => (
                        <SelectItem key={m.value} value={m.value}>
                          {m.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">膜层颜色</label>
                  <Select defaultValue="">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="选择颜色" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(dictCoatingColor).map(([value, item]) => (
                        <SelectItem key={value} value={value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">数量</label>
                  <Input className="mt-1" type="number" placeholder="0" />
                </div>
                <div>
                  <label className="text-sm font-medium">膜厚要求 (μm)</label>
                  <Input className="mt-1" type="number" step="0.1" placeholder="0.0" />
                </div>
                <div>
                  <label className="text-sm font-medium">交期</label>
                  <Input className="mt-1" type="date" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                取消
              </Button>
              <Button onClick={() => setShowCreateDialog(false)}>创建订单</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
