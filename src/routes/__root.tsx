import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router"
import { AppShell } from "@/components/layout/app-shell"
import type { MenuItem } from "@/components/layout/sidebar"
import {
  LayoutDashboard,
  Monitor,
  AlertTriangle,
  FileText,
  ClipboardCheck,
  ShoppingCart,
  BookOpen,
  Users,
  Package,
  BarChart3,
  Calculator,
} from "lucide-react"
import "@/styles/globals.css"

const menuItems: MenuItem[] = [
  { label: "生产看板", href: "/", icon: LayoutDashboard },
  { label: "设备监控", href: "/devices", icon: Monitor },
  { label: "设备告警", href: "/devices/alerts", icon: AlertTriangle },
  { label: "订单管理", href: "/orders", icon: FileText },
  { label: "质量管理", href: "/quality/batches", icon: ClipboardCheck },
  { label: "成本核算", href: "/cost/summary", icon: Calculator },
  { label: "工艺知识库", href: "/knowledge/recipes", icon: BookOpen },
  { label: "客户门户", href: "/complaints", icon: Users },
  { label: "库存管理", href: "/inventory", icon: Package },
  { label: "报表中心", href: "/reports/production", icon: BarChart3 },
]

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "国彩真空 PVD 生产追溯系统" },
      { name: "description", content: "PVD真空镀膜生产质量追溯与合规管理系统" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="zh-CN">
      <head>
        <HeadContent />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Inter', 'Noto Sans SC', system-ui, sans-serif" }}>
        <AppShell title="PVD 生产追溯系统" items={menuItems}>
          <Outlet />
        </AppShell>
        <Scripts />
        <NavBridgeScript />
      </body>
    </html>
  )
}

function NavBridgeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function() {
  if (window === window.parent) return;
  var notify = function() {
    window.parent.postMessage({
      type: 'preview-navigation',
      pathname: location.pathname,
      url: location.href
    }, '*');
  };
  notify();
  var origPush = history.pushState;
  var origReplace = history.replaceState;
  history.pushState = function() {
    origPush.apply(this, arguments);
    notify();
  };
  history.replaceState = function() {
    origReplace.apply(this, arguments);
    notify();
  };
  window.addEventListener('popstate', notify);
  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'preview-command') {
      if (e.data.command === 'back') history.back();
      if (e.data.command === 'forward') history.forward();
      if (e.data.command === 'navigate') {
        window.location.href = e.data.url;
      }
    }
  });
})();`,
      }}
    />
  )
}
