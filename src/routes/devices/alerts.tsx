import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { alerts } from "@/lib/mock-data";

export const Route = createFileRoute("/devices/alerts")({
  component: DeviceAlerts,
});

function DeviceAlerts() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">设备告警</h1>
            <p className="text-sm text-muted-foreground mt-1">
              管理设备故障告警，记录处理过程
            </p>
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            新建告警
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="告警级别" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部级别</SelectItem>
                  <SelectItem value="urgent">紧急</SelectItem>
                  <SelectItem value="important">重要</SelectItem>
                  <SelectItem value="normal">一般</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="设备" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部设备</SelectItem>
                  <SelectItem value="1">COAT-001</SelectItem>
                  <SelectItem value="2">COAT-002</SelectItem>
                  <SelectItem value="3">COAT-003</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="告警状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="open">未处理</SelectItem>
                  <SelectItem value="in_progress">处理中</SelectItem>
                  <SelectItem value="resolved">已解决</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-[240px] justify-start text-left font-normal")}
                  >
                    选择日期范围
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="range" numberOfMonths={2} />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* Alerts Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[160px]">告警时间</TableHead>
                  <TableHead>设备编号</TableHead>
                  <TableHead>告警级别</TableHead>
                  <TableHead>告警内容</TableHead>
                  <TableHead>处理状态</TableHead>
                  <TableHead>处理人</TableHead>
                  <TableHead className="text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className="font-mono text-sm">{alert.alertTime}</TableCell>
                    <TableCell className="font-medium">{alert.deviceCode}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          alert.alertLevel === "urgent"
                            ? "bg-red-100 text-red-700"
                            : alert.alertLevel === "important"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      >
                        {alert.alertLevel === "urgent"
                          ? "紧急"
                          : alert.alertLevel === "important"
                          ? "重要"
                          : "一般"}
                      </Badge>
                    </TableCell>
                    <TableCell>{alert.alertContent}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          alert.status === "open"
                            ? "bg-red-100 text-red-700"
                            : alert.status === "in_progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }
                      >
                        {alert.status === "open"
                          ? "未处理"
                          : alert.status === "in_progress"
                          ? "处理中"
                          : "已解决"}
                      </Badge>
                    </TableCell>
                    <TableCell>{alert.handler || "-"}</TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/devices/1`}>
                          <ExternalLink className="h-4 w-4 mr-1" />
                          详情
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
