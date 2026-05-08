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
import { Plus, Search, Download, Link2, FileText } from "lucide-react";
import { useState } from "react";
import { batches, customers } from "@/lib/mock-data";
import { dictQualityStatus, dictCoatingColor } from "@/lib/dictionaries";

export const Route = createFileRoute("/quality/_index")({
  component: BatchList,
});

function BatchList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [orderFilter, setOrderFilter] = useState<string>("all");
  const [customerFilter, setCustomerFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // 过滤批次
  const filteredBatches = batches.filter((batch) => {
    const matchSearch =
      batch.batchNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.orderNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCustomer =
      customerFilter === "all" || batch.customerName === customerFilter;
    const matchStatus = statusFilter === "all" || batch.qualityStatus === statusFilter;
    return matchSearch && matchCustomer && matchStatus;
  });

  // 统计
  const stats = {
    total: batches.length,
    pass: batches.filter((b) => b.qualityStatus === "pass").length,
    fail: batches.filter((b) => b.qualityStatus === "fail").length,
    rework: batches.filter((b) => b.qualityStatus === "rework").length,
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">批次记录</h1>
            <p className="text-sm text-muted-foreground mt-1">
              记录生产批次工艺参数，支持质量追溯
            </p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            新建批次
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">总批次</p>
              <p className="text-2xl font-semibold mt-1">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">合格</p>
              <p className="text-2xl font-semibold mt-1 text-green-600">{stats.pass}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">不合格</p>
              <p className="text-2xl font-semibold mt-1 text-red-600">{stats.fail}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">返工中</p>
              <p className="text-2xl font-semibold mt-1 text-orange-600">{stats.rework}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索批次号/订单号..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="质量状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="pending">待检测</SelectItem>
                  <SelectItem value="pass">合格</SelectItem>
                  <SelectItem value="fail">不合格</SelectItem>
                  <SelectItem value="rework">返工中</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="生产日期" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部时间</SelectItem>
                  <SelectItem value="today">今天</SelectItem>
                  <SelectItem value="week">本周</SelectItem>
                  <SelectItem value="month">本月</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Batch Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">批次列表 ({filteredBatches.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>批次号</TableHead>
                  <TableHead>关联订单</TableHead>
                  <TableHead>客户</TableHead>
                  <TableHead>产品规格</TableHead>
                  <TableHead>膜层颜色</TableHead>
                  <TableHead className="text-right">膜厚 (μm)</TableHead>
                  <TableHead>附着力</TableHead>
                  <TableHead>生产时间</TableHead>
                  <TableHead>质量状态</TableHead>
                  <TableHead className="text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBatches.map((batch) => (
                  <TableRow key={batch.id}>
                    <TableCell className="font-medium">{batch.batchNo}</TableCell>
                    <TableCell className="text-muted-foreground">{batch.orderNo}</TableCell>
                    <TableCell>{batch.customerName}</TableCell>
                    <TableCell>{batch.productSpec}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        style={{
                          backgroundColor:
                            dictCoatingColor[batch.coatingColor as keyof typeof dictCoatingColor]
                              ?.bgColor || "#e2e8f0",
                          color:
                            dictCoatingColor[batch.coatingColor as keyof typeof dictCoatingColor]
                              ?.color || "#333",
                        }}
                      >
                        {
                          dictCoatingColor[batch.coatingColor as keyof typeof dictCoatingColor]
                            ?.label
                        }
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">{batch.filmThickness}</TableCell>
                    <TableCell>{batch.adhesion}</TableCell>
                    <TableCell className="font-mono text-sm">{batch.productionTime}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          dictQualityStatus[
                            batch.qualityStatus as keyof typeof dictQualityStatus
                          ]?.color === "green"
                            ? "bg-green-100 text-green-700"
                            : dictQualityStatus[
                                batch.qualityStatus as keyof typeof dictQualityStatus
                              ]?.color === "red"
                            ? "bg-red-100 text-red-700"
                            : dictQualityStatus[
                                batch.qualityStatus as keyof typeof dictQualityStatus
                              ]?.color === "orange"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-slate-100 text-slate-700"
                        }
                      >
                        {
                          dictQualityStatus[
                            batch.qualityStatus as keyof typeof dictQualityStatus
                          ]?.label
                        }
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Link2 className="h-4 w-4 mr-1" />
                          追溯
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          报告
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Create Batch Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>新建批次</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <label className="text-sm font-medium">关联订单</label>
                <Select defaultValue="">
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="选择订单" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">ORD-20260508-001 (宜家)</SelectItem>
                    <SelectItem value="2">ORD-20260507-002 (苏泊尔)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">设备</label>
                  <Select defaultValue="">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="选择设备" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">COAT-001 镀膜机#1</SelectItem>
                      <SelectItem value="2">COAT-002 镀膜机#2</SelectItem>
                      <SelectItem value="3">COAT-004 镀膜机#4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">配方</label>
                  <Select defaultValue="">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="选择配方" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">REC-001 宜家标准金</SelectItem>
                      <SelectItem value="2">REC-002 苏泊尔黑</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">膜厚 (μm)</label>
                  <Input className="mt-1" type="number" step="0.01" placeholder="0.00" />
                </div>
                <div>
                  <label className="text-sm font-medium">附着力等级</label>
                  <Select defaultValue="">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="选择等级" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1级 (最好)</SelectItem>
                      <SelectItem value="2">2级</SelectItem>
                      <SelectItem value="3">3级</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                取消
              </Button>
              <Button onClick={() => setShowCreateDialog(false)}>创建批次</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
