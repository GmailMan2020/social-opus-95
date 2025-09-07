import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  Eye, 
  Users, 
  Zap, 
  MessageSquare, 
  Target, 
  Brain, 
  TestTube, 
  Bell, 
  Shield, 
  Database,
  BarChart3
} from "lucide-react"

const analyticsFeatures = [
  {
    title: "نمای کلی چندکاناله",
    description: "داشبوردهای قابل تنظیم با ویجت‌های کشیدنی، نماهای ذخیره شده و فیلترهای جهانی. تنظیم اهداف KPI و پیگیری پیشرفت با نشانگرها و یادداشت‌ها.",
    icon: BarChart3,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30"
  },
  {
    title: "عملکرد و هوش محتوا",
    description: "تحلیل عمقی پست‌ها، آنالیز ویدیو، بررسی استوری‌ها و ریلز، بهترین زمان انتشار، عملکرد هشتگ‌ها و بینش‌های خلاقانه.",
    icon: Eye,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/30"
  },
  {
    title: "بینش‌های مخاطب و بخش‌بندی",
    description: "تحلیل جمعیت‌شناختی، رشد فالوورها، تحلیل کوهورت و شناسایی فالوورهای با ارزش بالا.",
    icon: Users,
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/30"
  },
  {
    title: "مقایسه رقابتی",
    description: "پیگیری نرخ انتشار رقبا، رشد، نرخ تعامل و ترکیب محتوا. تحلیل شکاف محتوا و سهم صدا در موضوعات.",
    icon: TrendingUp,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/30"
  },
  {
    title: "گوش دادن اجتماعی و احساسات",
    description: "نظارت بر برند و کلمات کلیدی در پلتفرم‌ها، موضوع‌بندی گفتگوها و تشخیص بحران‌ها.",
    icon: MessageSquare,
    color: "text-pink-500",
    bgColor: "bg-pink-50 dark:bg-pink-950/30"
  },
  {
    title: "تبدیل، انتساب و بازگشت سرمایه",
    description: "پیگیری UTM و ادغام با GA4، تجزیه و تحلیل تجارت اجتماعی و انتساب چند لمسه.",
    icon: Target,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/30"
  },
  {
    title: "پیش‌بینی و بهینه‌سازی",
    description: "پیش‌بینی دسترسی، رشد فالوور و تعامل. توصیه‌های زمان انتشار، فرمت‌ها و هشتگ‌ها.",
    icon: Brain,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/30"
  },
  {
    title: "آزمایش و تست",
    description: "تست‌های A/B روی محتوای خلاقانه، کپشن‌ها و زمان‌های انتشار با راهنمای آماری.",
    icon: TestTube,
    color: "text-teal-500",
    bgColor: "bg-teal-50 dark:bg-teal-950/30"
  },
  {
    title: "هشدارها و تشخیص ناهنجاری",
    description: "هشدارهای لحظه‌ای برای انحراف KPI، افزایش ذکر یا جهش رقبا با حاشیه‌نویسی هوشمند.",
    icon: Bell,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30"
  },
  {
    title: "همکاری، حاکمیت و انطباق",
    description: "دسترسی مبتنی بر نقش، مجوزهای سطح کانال و ردپای حسابرسی. کنترل نگهداری داده‌ها.",
    icon: Shield,
    color: "text-slate-500",
    bgColor: "bg-slate-50 dark:bg-slate-950/30"
  },
  {
    title: "داده‌ها و ادغام‌ها",
    description: "اتصال به Instagram، Facebook، TikTok، X، LinkedIn، YouTube و سایر پلتفرم‌ها. صادرات داده خام و API.",
    icon: Database,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/30"
  },
  {
    title: "هوش مصنوعی پیشرفته",
    description: "الگوریتم‌های یادگیری ماشین برای پیش‌بینی ترندها، بهینه‌سازی محتوا و تحلیل عمقی رفتار مخاطب.",
    icon: Zap,
    color: "text-violet-500",
    bgColor: "bg-violet-50 dark:bg-violet-950/30"
  }
]

export default function AdvancedAnalytics() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-background to-muted/30" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            تحلیل پیشرفته
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            ابزارهای حرفه‌ای تحلیل داده برای مدیریت شبکه‌های اجتماعی با قابلیت‌های هوش مصنوعی، 
            پیش‌بینی ترندها و بهینه‌سازی عملکرد
          </p>
          <Badge variant="outline" className="mt-3">
            ۱۲ ماژول تحلیلی
          </Badge>
        </div>

        {/* Analytics Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analyticsFeatures.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary/20 bg-card/50 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>فعال و آماده استفاده</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-12 p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border/50">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              ابزارهای تحلیلی حرفه‌ای
            </h3>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
              تمامی ابزارهای تحلیلی با یکدیگر هماهنگ شده و امکان صادرات داده‌ها، تنظیم هشدارها و 
              ایجاد گزارش‌های سفارشی را فراهم می‌کنند.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}