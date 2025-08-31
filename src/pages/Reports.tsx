import { StatsCard } from "@/components/StatsCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  TrendingUp, 
  Calendar,
  Download,
  Filter,
  Send,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data for reports
const reportStats = [
  {
    title: "پست‌های در صف",
    value: "23",
    description: "آماده انتشار",
    icon: Clock,
    trend: { value: 15, isPositive: true }
  },
  {
    title: "پست‌های موفق",
    value: "187",
    description: "در هفته گذشته",
    icon: CheckCircle,
    trend: { value: 8, isPositive: true }
  },
  {
    title: "خطاهای انتشار",
    value: "12",
    description: "نیاز به بررسی",
    icon: XCircle,
    trend: { value: 3, isPositive: false }
  }
]

const publishQueue = [
  {
    id: 1,
    account: "@company_official",
    platform: "instagram",
    content: "محتوای تبلیغاتی محصول جدید...",
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
    status: "processing"
  }
]

const publishingHistory = [
  {
    id: 1,
    account: "@company_official",
    platform: "instagram",
    content: "پست تبلیغاتی محصول A",
    publishedTime: "12:30 امروز",
    status: "success",
    engagement: "4.8%",
    reach: "12.5K"
  },
  {
    id: 2,
    account: "@company_news",
    platform: "twitter",
    content: "اخبار بازار و صنعت",
    publishedTime: "10:15 امروز",
    status: "success",
    engagement: "3.2%",
    reach: "8.9K"
  },
  {
    id: 3,
    account: "@company_backup",
    platform: "instagram",
    content: "پست محتوایی B",
    publishedTime: "08:45 امروز",
    status: "failed",
    error: "خطا در احراز هویت"
  }
]

const accountChanges = [
  {
    id: 1,
    account: "@company_official",
    change: "تغییر رمز عبور",
    time: "2 ساعت پیش",
    status: "success"
  },
  {
    id: 2,
    account: "@company_news",
    change: "بروزرسانی پروفایل",
    time: "5 ساعت پیش",
    status: "success"
  },
  {
    id: 3,
    account: "@company_channel",
    change: "تنظیمات API",
    time: "1 روز پیش",
    status: "warning"
  }
]

function getStatusIcon(status: string) {
  switch (status) {
    case "success": return CheckCircle
    case "failed": return XCircle
    case "scheduled": return Clock
    case "pending": return Clock
    case "processing": return TrendingUp
    case "warning": return AlertCircle
    default: return Clock
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "success": return "text-success"
    case "failed": return "text-destructive"
    case "scheduled": return "text-primary"
    case "pending": return "text-warning"
    case "processing": return "text-primary"
    case "warning": return "text-warning"
    default: return "text-muted-foreground"
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "success": return { text: "موفق", variant: "default" as const }
    case "failed": return { text: "ناموفق", variant: "destructive" as const }
    case "scheduled": return { text: "برنامه‌ریزی شده", variant: "secondary" as const }
    case "pending": return { text: "در انتظار", variant: "outline" as const }
    case "processing": return { text: "در حال انجام", variant: "secondary" as const }
    case "warning": return { text: "هشدار", variant: "outline" as const }
    default: return { text: "نامشخص", variant: "outline" as const }
  }
}

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">گزارشات</h1>
          <p className="text-muted-foreground mt-2">تحلیل و بررسی عملکرد انتشار محتوا</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="week">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">امروز</SelectItem>
              <SelectItem value="week">هفته گذشته</SelectItem>
              <SelectItem value="month">ماه گذشته</SelectItem>
              <SelectItem value="quarter">سه ماه گذشته</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 ml-2" />
            دریافت گزارش
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Publishing Queue */}
        <Card className="professional-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5" />
              صف انتشار
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {publishQueue.map((item) => {
                const StatusIcon = getStatusIcon(item.status)
                const badge = getStatusBadge(item.status)
                
                return (
                  <div key={item.id} className="flex items-start gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <StatusIcon className={`w-5 h-5 ${getStatusColor(item.status)}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-foreground text-sm">{item.account}</p>
                        <Badge variant={badge.variant} className="text-xs">
                          {badge.text}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{item.content}</p>
                      <p className="text-xs text-muted-foreground">{item.scheduledTime}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Publishing History */}
        <Card className="professional-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Send className="w-5 h-5" />
              تاریخچه انتشار
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {publishingHistory.map((item) => {
                const StatusIcon = getStatusIcon(item.status)
                const badge = getStatusBadge(item.status)
                
                return (
                  <div key={item.id} className="flex items-start gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <StatusIcon className={`w-5 h-5 ${getStatusColor(item.status)}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-foreground text-sm">{item.account}</p>
                        <Badge variant={badge.variant} className="text-xs">
                          {badge.text}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1 mb-2">{item.content}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{item.publishedTime}</span>
                        {item.status === "success" && item.engagement && (
                          <>
                            <span>تعامل: {item.engagement}</span>
                            <span>دسترسی: {item.reach}</span>
                          </>
                        )}
                        {item.status === "failed" && item.error && (
                          <span className="text-destructive">{item.error}</span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Account Changes */}
        <Card className="professional-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Users className="w-5 h-5" />
              تغییرات حساب‌ها
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accountChanges.map((item) => {
                const StatusIcon = getStatusIcon(item.status)
                const badge = getStatusBadge(item.status)
                
                return (
                  <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <StatusIcon className={`w-5 h-5 ${getStatusColor(item.status)}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-foreground text-sm">{item.account}</p>
                        <Badge variant={badge.variant} className="text-xs">
                          {badge.text}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.change}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Performance Chart Placeholder */}
        <Card className="professional-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              نمودار عملکرد
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">نمودار تعداد پست‌ها بر اساس روز</p>
                <p className="text-sm text-muted-foreground mt-2">به زودی اضافه خواهد شد</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}