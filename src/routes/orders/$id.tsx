import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Edit, Trash2, Plus, Link2 } from "lucide-react";
import { orders, batches, dictMaterial, dictCoatingColor } from "@/lib/mock-data";
import { dictOrderStatus, dictQualityStatus } from "@/lib/dictionaries";
import { useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/orders/$id")({
  component: OrderDetail,
});

function OrderDetail() {
  const router = useRouter();
  const params = Route.useParams();
  const order = orders.find((o) => o.id === params.id);
  const relatedBatches = batches.filter((b) => b.orderNo === order?.orderNo);

  if (!order) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">订单不存在</p>
        </div>
      </Layout>
    );
  }

  // 状态流转步骤
  const statusSteps = [
    { key: "pending", label: "待排产" },
    { key: "in_progress", label: "生产中" },
    { key: "cooling", label: "冷却中" },
    { key: "completed", label: "已完成" },
    { key: "delivered", label: "已交付" },
  ];
  const currentStepIndex = statusSteps.findIndex((s) => s.key === order.status);

  // 计算成本（模拟）
  const estimatedCost = {
    electricity: relatedBatches.length * 280,
    target: relatedBatches.length * 400,
    gas: relatedBatches.length * 120,
    labor: relatedBatches.length * 200,
    total: 0,
  };
  estimatedCost.total = estimatedCost.electricity + estimatedCost.target + estimatedCost.gas + estimatedCost.labor;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.navigate({ to: "/orders" })}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-foreground">{order.orderNo}</h1>
                <Badge
                  className={
                    dictOrderStatus[order.status as keyof typeof dictOrderStatus]?.color === "green"
                      ? "bg-green-100 text-green-700"
                      : dictOrderStatus[order.status as keyof typeof dictOrderStatus]?.color === "blue"
                      ? "bg-blue-100 text-blue-700"
                      : dictOrderStatus[order.status as keyof typeof dictOrderStatus]?.color === "orange"
                      ? "bg-orange-100 text-orange-700"
                      : dictOrderStatus[order.status as keyof typeof dictOrderStatus]?.color === "purple"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-slate-100 text-slate-700"
                  }
                >
                  {dictOrderStatus[order.status as keyof typeof dictOrderStatus]?.label}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                客户：{order.customerName} | 创建时间：{order.deliveryDate}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              编辑
            </Button>
            <Button variant="outline" className="text-red-600 hover:text-red-600">
              <Trash2 className="h-4 w-4 mr-2" />
              删除
            </Button>
          </div>
        </div>

        {/* Status Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">订单进度</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              {statusSteps.map((step, index) => (
                <div key={step.key} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        index <= currentStepIndex
                          ? "bg-blue-500 text-white"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span
                      className={`text-xs mt-2 ${
                        index <= currentStepIndex ? "text-foreground font-medium" : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < statusSteps.length - 1 && (
                    <div
                      className={`h-0.5 w-20 mx-2 ${
                        index < currentStepIndex ? "bg-blue-500" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Info & Cost */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Info */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">订单信息</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">客户</span>
                  <span className="font-medium">{order.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">产品规格</span>
                  <span className="font-medium">{order.productSpec}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">材质</span>
                  <span className="font-medium">
                    {dictMaterial[order.material as keyof typeof dictMaterial]?.label || order.material}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">膜层颜色</span>
                  <span className="font-medium">
                    {dictCoatingColor[order.coatingColor as keyof typeof dictCoatingColor]?.label ||
                      order.coatingColor}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">数量</span>
                  <span className="font-medium">{order.quantity.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">膜厚要求</span>
                  <span className="font-medium">{order.filmThicknessReq} μm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">交期</span>
                  <span className={`font-medium ${order.status !== "delivered" && new Date(order.deliveryDate).getTime() - Date.now() < 3 * 24 * 60 * 60 * 1000 ? "text-red-600" : ""}`}>
                    {order.deliveryDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">完成进度</span>
                  <span className="font-medium">{order.progress}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">预估成本</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">电耗成本</span>
                  <span className="font-mono">¥{estimatedCost.electricity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">靶材成本</span>
                  <span className="font-mono">¥{estimatedCost.target}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">气体成本</span>
                  <span className="font-mono">¥{estimatedCost.gas}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">人工成本</span>
                  <span className="font-mono">¥{estimatedCost.labor}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-medium">总成本</span>
                  <span className="font-bold text-lg">¥{estimatedCost.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Batches */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">关联批次 ({relatedBatches.length})</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                生成批次
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {relatedBatches.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>批次号</TableHead>
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
                  {relatedBatches.map((batch) => (
                    <TableRow key={batch.id}>
                      <TableCell className="font-medium">{batch.batchNo}</TableCell>
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
                            dictQualityStatus[batch.qualityStatus as keyof typeof dictQualityStatus]
                              ?.color === "green"
                              ? "bg-green-100 text-green-700"
                              : dictQualityStatus[batch.qualityStatus as keyof typeof dictQualityStatus]
                                  ?.color === "red"
                              ? "bg-red-100 text-red-700"
                              : dictQualityStatus[batch.qualityStatus as keyof typeof dictQualityStatus]
                                  ?.color === "orange"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-slate-100 text-slate-700"
                          }
                        >
                          {
                            dictQualityStatus[batch.qualityStatus as keyof typeof dictQualityStatus]
                              ?.label
                          }
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="sm">
                          <Link2 className="h-4 w-4 mr-1" />
                          追溯
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                暂无关联批次
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
