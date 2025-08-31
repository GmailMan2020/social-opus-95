import { StatsCard } from "@/components/StatsCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Send, 
  TrendingUp, 
  Calendar,
  Filter,
  Instagram,
  Twitter,
  MessageCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  Play
} from "lucide-react"

// Mock data
const dashboardStats = [
  {
    title: "حساب‌های متصل",
    value: "12",
    description: "3 پلتفرم فعال",
    icon: Users,
    trend: { value: 8, isPositive: true }
  },
  {
    title: "پست‌های امروز",
    value: "24",
    description: "18 موفق، 6 در انتظار",
    icon: Send,
    trend: { value: 12, isPositive: true }
  },
  {
    title: "نرخ موفقیت",
    value: "94.5%",
    description: "بهبود نسبت به دیروز",
    icon: TrendingUp,
    trend: { value: 2.3, isPositive: true }
  },
  {
    title: "پست‌های برنامه‌ریزی شده",
    value: "47",
    description: "برای هفته آینده",
    icon: Calendar,
    trend: { value: 5, isPositive: false }
  }
]

const recentActivities = [
  {
    id: 1,
    platform: "instagram",
    account: "@company_official",
    action: "پست منتشر شد",
    time: "2 دقیقه پیش",
    status: "success"
  },
  {
    id: 2,
    platform: "twitter",
    account: "@company_news",
    action: "توییت برنامه‌ریزی شد",
    time: "5 دقیقه پیش",
    status: "scheduled"
  },
  {
    id: 3,
    platform: "telegram",
    account: "@company_channel",
    action: "پیام ارسال نشد",
    time: "10 دقیقه پیش",
    status: "failed"
  },
  {
    id: 4,
    platform: "instagram",
    account: "@company_official",
    action: "استوری اضافه شد",
    time: "15 دقیقه پیش",
    status: "success"
  }
]

const scheduledPosts = [
  {
    id: 1,
    account: "@company_official",
    platform: "instagram",
    content: "محتوای جدید در مورد محصولات ما...",
    scheduledTime: "14:30 امروز",
    status: "scheduled"
  },
  {
    id: 2,
    account: "@company_news",
    platform: "twitter",
    content: "آخرین اخبار شرکت و بازار...",
    scheduledTime: "16:00 امروز",
    status: "pending"
  },
  {
    id: 3,
    account: "@company_channel",
    platform: "telegram",
    content: "اطلاعیه مهم برای مشتریان...",
    scheduledTime: "09:00 فردا",
    status: "draft"
  }
]

function getPlatformIcon(platform: string) {
  switch (platform) {
    case "instagram": return Instagram
    case "twitter": return Twitter
    case "telegram": return MessageCircle
    default: return Send
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "success": return CheckCircle
    case "failed": return AlertCircle
    case "scheduled": return Clock
    case "pending": return Clock
    case "draft": return Play
    default: return Clock
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "success": return "text-success"
    case "failed": return "text-destructive"
    case "scheduled": return "text-primary"
    case "pending": return "text-warning"
    case "draft": return "text-muted-foreground"
    default: return "text-muted-foreground"
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "success": return { text: "موفق", variant: "default" as const }
    case "failed": return { text: "ناموفق", variant: "destructive" as const }
    case "scheduled": return { text: "برنامه‌ریزی شده", variant: "secondary" as const }
    case "pending": return { text: "در انتظار", variant: "outline" as const }
    case "draft": return { text: "پیش‌نویس", variant: "outline" as const }
    default: return { text: "نامشخص", variant: "outline" as const }
  }
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">داشبورد</h1>
          <p className="text-muted-foreground mt-2">مرور کلی عملکرد شبکه‌های اجتماعی</p>
        </div>
        <Button className="professional-button">
          <Send className="w-4 h-4 ml-2" />
          پست جدید
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="professional-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">فعالیت‌های اخیر</CardTitle>
            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4 ml-2" />
              فیلتر
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const PlatformIcon = getPlatformIcon(activity.platform)
                const StatusIcon = getStatusIcon(activity.status)
                
                return (
                  <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <PlatformIcon className="w-5 h-5 text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{activity.account}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <StatusIcon className={`w-4 h-4 ${getStatusColor(activity.status)}`} />
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Scheduled Posts Queue */}
        <Card className="professional-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">صف ارسال</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduledPosts.map((post) => {
                const PlatformIcon = getPlatformIcon(post.platform)
                const badge = getStatusBadge(post.status)
                
                return (
                  <div key={post.id} className="flex items-start gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <PlatformIcon className="w-5 h-5 text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-foreground text-sm">{post.account}</p>
                        <Badge variant={badge.variant} className="text-xs">
                          {badge.text}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{post.content}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.scheduledTime}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}