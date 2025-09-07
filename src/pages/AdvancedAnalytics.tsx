import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  BarChart3,
  X
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

// Sample data for different analytics
const sampleData = {
  overview: {
    kpis: [
      { name: "بازدید کل", value: "2.4M", change: "+12.5%" },
      { name: "تعامل", value: "156K", change: "+8.3%" },
      { name: "فالوور جدید", value: "3.2K", change: "+15.7%" },
      { name: "نرخ تبدیل", value: "4.2%", change: "+2.1%" }
    ],
    chartData: [
      { name: "شنبه", reach: 4000, engagement: 2400, followers: 240 },
      { name: "یکشنبه", reach: 3000, engagement: 1398, followers: 221 },
      { name: "دوشنبه", reach: 2000, engagement: 9800, followers: 229 },
      { name: "سه‌شنبه", reach: 2780, engagement: 3908, followers: 200 },
      { name: "چهارشنبه", reach: 1890, engagement: 4800, followers: 218 },
      { name: "پنج‌شنبه", reach: 2390, engagement: 3800, followers: 250 },
      { name: "جمعه", reach: 3490, engagement: 4300, followers: 210 }
    ]
  },
  content: {
    posts: [
      { title: "پست ویدیویی", reach: 125000, engagement: 8500, saves: 450 },
      { title: "پست تصویری", reach: 89000, engagement: 6200, saves: 320 },
      { title: "کاروسل", reach: 156000, engagement: 12000, saves: 680 },
      { title: "ریلز", reach: 245000, engagement: 18000, saves: 890 }
    ],
    videoMetrics: [
      { metric: "میانگین مشاهده", value: "45 ثانیه" },
      { metric: "نرخ تکمیل", value: "67%" },
      { metric: "نرخ تکرار", value: "23%" }
    ]
  },
  audience: {
    demographics: [
      { name: "18-24", value: 30, color: "#8884d8" },
      { name: "25-34", value: 45, color: "#82ca9d" },
      { name: "35-44", value: 20, color: "#ffc658" },
      { name: "45+", value: 5, color: "#ff7300" }
    ],
    locations: [
      { city: "تهران", percentage: 35 },
      { city: "اصفهان", percentage: 15 },
      { city: "مشهد", percentage: 12 },
      { city: "شیراز", percentage: 10 },
      { city: "تبریز", percentage: 8 }
    ]
  },
  competitive: {
    competitors: [
      { name: "رقیب ۱", followers: "125K", growth: "+2.3%", engagement: "4.5%" },
      { name: "رقیب ۲", followers: "89K", growth: "+1.8%", engagement: "6.2%" },
      { name: "رقیب ۳", followers: "156K", growth: "+3.1%", engagement: "3.8%" }
    ],
    shareOfVoice: [
      { topic: "تکنولوژی", you: 25, competitor1: 35, competitor2: 40 },
      { topic: "محصولات", you: 45, competitor1: 30, competitor2: 25 },
      { topic: "خدمات", you: 35, competitor1: 25, competitor2: 40 }
    ]
  },
  sentiment: {
    mentions: [
      { date: "۱ آذر", positive: 85, negative: 15, neutral: 45 },
      { date: "۲ آذر", positive: 92, negative: 8, neutral: 38 },
      { date: "۳ آذر", positive: 78, negative: 22, neutral: 52 },
      { date: "۴ آذر", positive: 89, negative: 11, neutral: 41 }
    ],
    topics: [
      { topic: "کیفیت محصول", sentiment: 85 },
      { topic: "خدمات پشتیبانی", sentiment: 72 },
      { topic: "قیمت", sentiment: 65 },
      { topic: "تحویل", sentiment: 88 }
    ]
  },
  conversion: {
    funnel: [
      { stage: "بازدید", count: 10000, rate: 100 },
      { stage: "کلیک", count: 1500, rate: 15 },
      { stage: "ثبت‌نام", count: 450, rate: 4.5 },
      { stage: "خرید", count: 180, rate: 1.8 }
    ],
    roas: [
      { campaign: "کمپین ۱", spend: 5000, revenue: 15000, roas: 3.0 },
      { campaign: "کمپین ۲", spend: 3000, revenue: 12000, roas: 4.0 },
      { campaign: "کمپین ۳", spend: 7000, revenue: 21000, roas: 3.0 }
    ]
  }
}

const analyticsFeatures = [
  {
    id: "overview",
    title: "نمای کلی چندکاناله",
    description: "داشبوردهای قابل تنظیم با ویجت‌های کشیدنی، نماهای ذخیره شده و فیلترهای جهانی. تنظیم اهداف KPI و پیگیری پیشرفت با نشانگرها و یادداشت‌ها.",
    icon: BarChart3,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30"
  },
  {
    id: "content",
    title: "عملکرد و هوش محتوا",
    description: "تحلیل عمقی پست‌ها، آنالیز ویدیو، بررسی استوری‌ها و ریلز، بهترین زمان انتشار، عملکرد هشتگ‌ها و بینش‌های خلاقانه.",
    icon: Eye,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/30"
  },
  {
    id: "audience",
    title: "بینش‌های مخاطب و بخش‌بندی",
    description: "تحلیل جمعیت‌شناختی، رشد فالوورها، تحلیل کوهورت و شناسایی فالوورهای با ارزش بالا.",
    icon: Users,
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/30"
  },
  {
    id: "competitive",
    title: "مقایسه رقابتی",
    description: "پیگیری نرخ انتشار رقبا، رشد، نرخ تعامل و ترکیب محتوا. تحلیل شکاف محتوا و سهم صدا در موضوعات.",
    icon: TrendingUp,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/30"
  },
  {
    id: "sentiment",
    title: "گوش دادن اجتماعی و احساسات",
    description: "نظارت بر برند و کلمات کلیدی در پلتفرم‌ها، موضوع‌بندی گفتگوها و تشخیص بحران‌ها.",
    icon: MessageSquare,
    color: "text-pink-500",
    bgColor: "bg-pink-50 dark:bg-pink-950/30"
  },
  {
    id: "conversion",
    title: "تبدیل، انتساب و بازگشت سرمایه",
    description: "پیگیری UTM و ادغام با GA4، تجزیه و تحلیل تجارت اجتماعی و انتساب چند لمسه.",
    icon: Target,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/30"
  },
  {
    id: "prediction",
    title: "پیش‌بینی و بهینه‌سازی",
    description: "پیش‌بینی دسترسی، رشد فالوور و تعامل. توصیه‌های زمان انتشار، فرمت‌ها و هشتگ‌ها.",
    icon: Brain,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/30"
  },
  {
    id: "testing",
    title: "آزمایش و تست",
    description: "تست‌های A/B روی محتوای خلاقانه، کپشن‌ها و زمان‌های انتشار با راهنمای آماری.",
    icon: TestTube,
    color: "text-teal-500",
    bgColor: "bg-teal-50 dark:bg-teal-950/30"
  },
  {
    id: "alerts",
    title: "هشدارها و تشخیص ناهنجاری",
    description: "هشدارهای لحظه‌ای برای انحراف KPI، افزایش ذکر یا جهش رقبا با حاشیه‌نویسی هوشمند.",
    icon: Bell,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30"
  },
  {
    id: "governance",
    title: "همکاری، حاکمیت و انطباق",
    description: "دسترسی مبتنی بر نقش، مجوزهای سطح کانال و ردپای حسابرسی. کنترل نگهداری داده‌ها.",
    icon: Shield,
    color: "text-slate-500",
    bgColor: "bg-slate-50 dark:bg-slate-950/30"
  },
  {
    id: "integrations",
    title: "داده‌ها و ادغام‌ها",
    description: "اتصال به Instagram، Facebook، TikTok، X، LinkedIn، YouTube و سایر پلتفرم‌ها. صادرات داده خام و API.",
    icon: Database,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/30"
  },
  {
    id: "ai",
    title: "هوش مصنوعی پیشرفته",
    description: "الگوریتم‌های یادگیری ماشین برای پیش‌بینی ترندها، بهینه‌سازی محتوا و تحلیل عمقی رفتار مخاطب.",
    icon: Zap,
    color: "text-violet-500",
    bgColor: "bg-violet-50 dark:bg-violet-950/30"
  }
]

export default function AdvancedAnalytics() {
  const [selectedModal, setSelectedModal] = useState<string | null>(null)

  const renderModalContent = (id: string) => {
    switch (id) {
      case "overview":
        return (
          <div className="space-y-6" dir="rtl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sampleData.overview.kpis.map((kpi, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">{kpi.value}</div>
                    <div className="text-sm text-muted-foreground">{kpi.name}</div>
                    <div className="text-xs text-green-600">{kpi.change}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sampleData.overview.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="reach" stroke="#8884d8" name="دسترسی" />
                <Line type="monotone" dataKey="engagement" stroke="#82ca9d" name="تعامل" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )
      
      case "content":
        return (
          <div className="space-y-6" dir="rtl">
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="posts">عملکرد پست‌ها</TabsTrigger>
                <TabsTrigger value="video">آنالیز ویدیو</TabsTrigger>
              </TabsList>
              <TabsContent value="posts">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sampleData.content.posts}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="title" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="reach" fill="#8884d8" name="دسترسی" />
                    <Bar dataKey="engagement" fill="#82ca9d" name="تعامل" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="video">
                <div className="grid grid-cols-3 gap-4">
                  {sampleData.content.videoMetrics.map((metric, i) => (
                    <Card key={i}>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold">{metric.value}</div>
                        <div className="text-sm text-muted-foreground">{metric.metric}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )
      
      case "audience":
        return (
          <div className="space-y-6" dir="rtl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">توزیع سنی</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={sampleData.audience.demographics}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {sampleData.audience.demographics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">توزیع جغرافیایی</h4>
                <div className="space-y-3">
                  {sampleData.audience.locations.map((location, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span>{location.city}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded">
                          <div 
                            className="h-full bg-blue-500 rounded" 
                            style={{ width: `${location.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm">{location.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      
      case "competitive":
        return (
          <div className="space-y-6" dir="rtl">
            <div className="grid grid-cols-1 gap-4">
              <h4 className="text-lg font-semibold">تحلیل رقبا</h4>
              {sampleData.competitive.competitors.map((competitor, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{competitor.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {competitor.followers} فالوور
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="text-green-600">{competitor.growth}</div>
                        <div className="text-sm">{competitor.engagement} تعامل</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sampleData.competitive.shareOfVoice}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="topic" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="you" fill="#8884d8" name="شما" />
                <Bar dataKey="competitor1" fill="#82ca9d" name="رقیب ۱" />
                <Bar dataKey="competitor2" fill="#ffc658" name="رقیب ۲" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )
      
      case "sentiment":
        return (
          <div className="space-y-6" dir="rtl">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={sampleData.sentiment.mentions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="positive" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="مثبت" />
                <Area type="monotone" dataKey="neutral" stackId="1" stroke="#ffc658" fill="#ffc658" name="خنثی" />
                <Area type="monotone" dataKey="negative" stackId="1" stroke="#ff7300" fill="#ff7300" name="منفی" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              <h4 className="text-lg font-semibold">تحلیل موضوعات</h4>
              {sampleData.sentiment.topics.map((topic, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span>{topic.topic}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded">
                      <div 
                        className="h-full bg-green-500 rounded" 
                        style={{ width: `${topic.sentiment}%` }}
                      />
                    </div>
                    <span className="text-sm">{topic.sentiment}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      
      case "conversion":
        return (
          <div className="space-y-6" dir="rtl">
            <div>
              <h4 className="text-lg font-semibold mb-4">قیف تبدیل</h4>
              <div className="space-y-2">
                {sampleData.conversion.funnel.map((stage, i) => (
                  <div key={i} className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between items-center">
                      <span>{stage.stage}</span>
                      <div className="text-left">
                        <div className="font-bold">{stage.count.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{stage.rate}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">بازگشت سرمایه (ROAS)</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={sampleData.conversion.roas}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="campaign" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="roas" fill="#8884d8" name="ROAS" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )
      
      default:
        return (
          <div className="text-center py-8" dir="rtl">
            <div className="text-lg font-semibold mb-2">داده‌های نمونه</div>
            <p className="text-muted-foreground">
              این بخش در حال توسعه است و به زودی داده‌های نمونه اضافه خواهد شد.
            </p>
          </div>
        )
    }
  }
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
                onClick={() => setSelectedModal(feature.id)}
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

        {/* Analytics Modal */}
        <Dialog open={!!selectedModal} onOpenChange={() => setSelectedModal(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-center" dir="rtl">
                {selectedModal && analyticsFeatures.find(f => f.id === selectedModal)?.title}
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-4"
                onClick={() => setSelectedModal(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogHeader>
            {selectedModal && renderModalContent(selectedModal)}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}