import { useState } from "react"
import {
  LayoutDashboard,
  Users,
  Send,
  BarChart3,
  Target,
  Settings,
  ChevronLeft,
  Instagram,
  Twitter,
  MessageCircle,
  Layers
} from "lucide-react"
import { NavLink } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const navigationItems = [
  { title: "داشبورد", url: "/", icon: LayoutDashboard },
  { title: "حساب‌ها", url: "/accounts", icon: Users },
  { title: "انتشار", url: "/publish", icon: Send },
  { title: "انتشار گروهی", url: "/group-publish", icon: Layers },
  { title: "گزارشات", url: "/reports", icon: BarChart3 },
  { title: "ماموریت‌ها", url: "/missions", icon: Target },
  { title: "تنظیمات", url: "/settings", icon: Settings },
]

const socialPlatforms = [
  { name: "اینستاگرام", icon: Instagram, color: "text-pink-500" },
  { name: "توییتر", icon: Twitter, color: "text-blue-400" },
  { name: "تلگرام", icon: MessageCircle, color: "text-blue-500" },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"

  return (
    <Sidebar
      side="right"
      variant="sidebar"
      collapsible="offcanvas"
      className={cn(
        "border-l border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-72"
      )}
    >
      <SidebarContent className="py-4">
        {/* Logo Section */}
        <div className="mb-8 px-2">
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-sidebar-foreground">مدیریت شبکه‌ها</h2>
                <p className="text-xs text-sidebar-foreground/60">پلتفرم حرفه‌ای</p>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto">
              <LayoutDashboard className="w-4 h-4 text-primary-foreground" />
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80 mb-2">
            {!collapsed && "منوی اصلی"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-12">
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) => cn(
                        "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        "text-sidebar-foreground", // Always show text
                        isActive
                          ? "bg-sidebar-primary shadow-glow"
                          : ""
                      )}
                    >
                      <item.icon className={cn("w-5 h-5 flex-shrink-0", collapsed && "mx-auto")} />
                      {!collapsed && (
                        <span className="font-medium opacity-100 transition-opacity duration-200">
                          {item.title}
                        </span>
                      )}
                      {collapsed && (
                        <span className="sr-only">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Social Platforms */}
        {!collapsed && (
          <SidebarGroup className="mt-8">
            <SidebarGroupLabel className="text-sidebar-foreground/80 mb-2">
              پلتفرم‌های متصل
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-2">
                {socialPlatforms.map((platform) => (
                  <div key={platform.name} className="flex items-center gap-3 px-3 py-2">
                    <platform.icon className={cn("w-4 h-4", platform.color)} />
                    <span className="text-sm text-sidebar-foreground/70">{platform.name}</span>
                    <div className="mr-auto w-2 h-2 bg-success rounded-full"></div>
                  </div>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Collapse Button */}
        {/*<div className="mt-auto pt-4">*/}
        {/*  <SidebarTrigger className="w-full">*/}
        {/*    <div className={cn(*/}
        {/*      "flex items-center justify-center w-10 h-10 rounded-lg",*/}
        {/*      "bg-sidebar-accent hover:bg-sidebar-primary transition-colors",*/}
        {/*      "hover:text-sidebar-primary-foreground"*/}
        {/*    )}>*/}
        {/*      <ChevronLeft className={cn(*/}
        {/*        "w-4 h-4 transition-transform",*/}
        {/*        collapsed && "rotate-180"*/}
        {/*      )} />*/}
        {/*    </div>*/}
        {/*  </SidebarTrigger>*/}
        {/*</div>*/}
      </SidebarContent>
    </Sidebar>
  )
}
