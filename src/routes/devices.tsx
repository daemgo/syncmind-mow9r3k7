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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCw, AlertTriangle, Link2 } from "lucide-react";
import { useState } from "react";
import { devices, deviceStats, alerts } from "@/lib/mock-data";
import { dictDeviceStatus } from "@/lib/dictionaries";

export const Route = createFileRoute("/devices")({
  component: Devices,
});

function Devices() {
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const stats = [
    { label: "运行中", value: deviceStats.runningCount, color: "green" },
    { label: "待机", value: deviceStats.standbyCount, color: "blue" },
    { label: "故障", value: deviceStats.faultCount, color: "red" },
    { label: "停机", value: deviceStats.stoppedCount, color: "gray" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">设备监控</h1>
            <p className="text-sm text-muted-foreground mt-1">
              实时监控设备运行状态，点击设备查看详情
            </p>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            刷新状态
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-semibold mt-1">{stat.value}</p>
                  </div>
                  <div
                    className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                      stat.color === "green"
                        ? "bg-green-100"
                        : stat.color === "blue"
                        ? "bg-blue-100"
                        : stat.color === "red"
                        ? "bg-red-100"
                        : "bg-slate-100"
                    }`}
                  >
                    <div
                      className={`h-3 w-3 rounded-full ${
                        stat.color === "green"
                          ? "bg-green-500"
                          : stat.color === "blue"
                          ? "bg-blue-500"
                          : stat.color === "red"
                          ? "bg-red-500"
                          : "bg-slate-500"
                      }`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Device Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">设备状态概览</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <a href="/devices/alerts">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  查看全部告警
                </a>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">设备编号</TableHead>
                  <TableHead>设备名称</TableHead>
                  <TableHead>运行状态</TableHead>
                  <TableHead className="text-right">真空度 (Pa)</TableHead>
                  <TableHead className="text-right">温度 (°C)</TableHead>
                  <TableHead className="text-right">运行时长 (h)</TableHead>
                  <TableHead className="text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {devices
                  .sort((a, b) => (a.status === "fault" ? -1 : b.status === "fault" ? 1 : 0))
                  .map((device) => (
                    <TableRow
                      key={device.id}
                      className={device.status === "fault" ? "bg-red-50" : ""}
                    >
                      <TableCell className="font-medium">{device.deviceCode}</TableCell>
                      <TableCell>{device.deviceName}</TableCell>
                      <TableCell>
                        <Badge
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
                      <TableCell className="text-right font-mono">
                        {device.vacuumLevel.toExponential(1)}
                      </TableCell>
                      <TableCell className="text-right font-mono">{device.temperature}</TableCell>
                      <TableCell className="text-right font-mono">{device.runtime}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="sm" asChild>
                          <a href={`/devices/${device.id}`}>
                            <Link2 className="h-4 w-4 mr-1" />
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

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">最近告警</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>告警时间</TableHead>
                  <TableHead>设备编号</TableHead>
                  <TableHead>告警级别</TableHead>
                  <TableHead>告警内容</TableHead>
                  <TableHead>处理状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.slice(0, 3).map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className="font-mono text-sm">{alert.alertTime}</TableCell>
                    <TableCell>{alert.deviceCode}</TableCell>
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
