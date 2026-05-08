import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  MonitorPlay,
  FileText,
  ShieldCheck,
  Calculator,
  BookOpen,
  Users,
  Package,
  BarChart3,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  {
    title: "工作台",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "设备管理",
    icon: MonitorPlay,
    children: [
      { title: "设备监控", path: "/devices" },
      { title: "设备告警", path: "/devices/alerts" },
    ],
  },
  {
    title: "订单管理",
    icon: FileText,
    children: [
      { title: "订单列表", path: "/orders" },
      { title: "订单排程", path: "/orders/schedule" },
    ],
  },
  {
    title: "质量管理",
    icon: ShieldCheck,
    children: [
      { title: "批次记录", path: "/quality/batches" },
      { title: "质量追溯", path: "/quality/trace" },
      { title: "SPC监控", path: "/quality/spc" },
      { title: "质量报告", path: "/quality/reports" },
      { title: "首件检验", path: "/quality/first-inspection" },
    ],
  },
  {
    title: "成本核算",
    icon: Calculator,
    children: [
      { title: "成本汇总", path: "/cost/summary" },
      { title: "成本分析", path: "/cost/analysis" },
    ],
  },
  {
    title: "工艺知识库",
    icon: BookOpen,
    children: [
      { title: "配方管理", path: "/knowledge/recipes" },
      { title: "SPC知识库", path: "/knowledge/spc-rules" },
    ],
  },
  {
    title: "客户门户",
    icon: Users,
    children: [
      { title: "投诉管理", path: "/complaints" },
      { title: "大客户门户", path: "/portal" },
    ],
  },
  {
    title: "库存管理",
    icon: Package,
    children: [
      { title: "库存台账", path: "/inventory" },
      { title: "入库管理", path: "/inventory/inbound" },
      { title: "出库管理", path: "/inventory/outbound" },
    ],
  },
  {
    title: "报表中心",
    icon: BarChart3,
    children: [
      { title: "生产报表", path: "/reports/production" },
      { title: "设备报表", path: "/reports/equipment" },
      { title: "质量报表", path: "/reports/quality" },
      { title: "成本报表", path: "/reports/cost" },
    ],
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["设备管理", "订单管理"]);

  const toggleMenu = (title: string) => {
    setExpandedMenus((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isChildActive = (paths: string[]) => paths.some((p) => location.pathname === p);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-slate-700">
          <MonitorPlay className="h-6 w-6 mr-2 text-blue-400" />
          <span className="font-semibold text-lg">国彩真空</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3 text-slate-400" />
                      <span>{item.title}</span>
                    </div>
                    {expandedMenus.includes(item.title) ? (
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    )}
                  </button>
                  {expandedMenus.includes(item.title) && (
                    <div className="ml-6 border-l border-slate-700">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            isActive(child.path)
                              ? "bg-blue-600 text-white"
                              : "text-slate-300 hover:bg-slate-800 hover:text-white"
                          }`}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-2.5 transition-colors ${
                    isActive(item.path)
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.title}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-medium">
              王
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">王总工</p>
              <p className="text-xs text-slate-400">总工程师</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-slate-50 overflow-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
