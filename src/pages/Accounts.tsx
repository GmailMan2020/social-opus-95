import { useState } from "react"
import { StatsCard } from "@/components/StatsCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Send, 
  TrendingUp, 
  Search,
  Filter,
  Plus,
  Instagram,
  Twitter,
  MessageCircle,
  MoreHorizontal,
  Settings,
  Trash2,
  Eye
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data
const accountStats = [
  {
    title: "کل حساب‌ها",
    value: "12",
    description: "3 پلتفرم مختلف",
    icon: Users,
    trend: { value: 8, isPositive: true }
  },
  {
    title: "پست‌های منتشر شده",
    value: "847",
    description: "در ماه جاری",
    icon: Send,
    trend: { value: 23, isPositive: true }
  },
  {
    title: "رشد فالوورها",
    value: "+15.2%",
    description: "نسبت به ماه قبل",
    icon: TrendingUp,
    trend: { value: 3.1, isPositive: true }
  }
]

const accounts = [
  {
    id: 1,
    name: "@company_official",
    platform: "instagram",
    followers: "45.2K",
    status: "active",
    postsThisMonth: 28,
    engagement: "4.8%",
    lastActivity: "2 ساعت پیش"
  },
  {
    id: 2,
    name: "@company_news",
    platform: "twitter",
    followers: "12.8K",
    status: "active",
    postsThisMonth: 45,
    engagement: "3.2%",
    lastActivity: "1 ساعت پیش"
  },
  {
    id: 3,
    name: "@company_channel",
    platform: "telegram",
    followers: "8.9K",
    status: "warning",
    postsThisMonth: 15,
    engagement: "6.1%",
    lastActivity: "5 ساعت پیش"
  },
  {
    id: 4,
    name: "@company_backup",
    platform: "instagram",
    followers: "2.1K",
    status: "inactive",
    postsThisMonth: 3,
    engagement: "1.4%",
    lastActivity: "3 روز پیش"
  }
]

function getPlatformIcon(platform: string) {
  switch (platform) {
    case "instagram": return Instagram
    case "twitter": return Twitter
    case "telegram": return MessageCircle
    default: return Users
  }
}

function getPlatformColor(platform: string) {
  switch (platform) {
    case "instagram": return "text-pink-500"
    case "twitter": return "text-blue-400"
    case "telegram": return "text-blue-500"
    default: return "text-muted-foreground"
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "active": return { text: "فعال", variant: "default" as const }
    case "warning": return { text: "هشدار", variant: "secondary" as const }
    case "inactive": return { text: "غیرفعال", variant: "outline" as const }
    default: return { text: "نامشخص", variant: "outline" as const }
  }
}

export default function Accounts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlatform = selectedPlatform === "all" || account.platform === selectedPlatform
    const matchesStatus = selectedStatus === "all" || account.status === selectedStatus
    return matchesSearch && matchesPlatform && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">حساب‌ها</h1>
          <p className="text-muted-foreground mt-2">مدیریت حساب‌های شبکه‌های اجتماعی</p>
        </div>
        <Button className="professional-button">
          <Plus className="w-4 h-4 ml-2" />
          افزودن حساب
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accountStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Filters and Search */}
      <Card className="professional-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">فیلترها و جستجو</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="جستجو در نام حساب..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="انتخاب پلتفرم" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه پلتفرم‌ها</SelectItem>
                <SelectItem value="instagram">اینستاگرام</SelectItem>
                <SelectItem value="twitter">توییتر</SelectItem>
                <SelectItem value="telegram">تلگرام</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="وضعیت" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه وضعیت‌ها</SelectItem>
                <SelectItem value="active">فعال</SelectItem>
                <SelectItem value="warning">هشدار</SelectItem>
                <SelectItem value="inactive">غیرفعال</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Accounts Table */}
      <Card className="professional-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">لیست حساب‌ها</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAccounts.map((account) => {
              const PlatformIcon = getPlatformIcon(account.platform)
              const badge = getStatusBadge(account.status)
              
              return (
                <div key={account.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <PlatformIcon className={`w-6 h-6 ${getPlatformColor(account.platform)}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-medium text-foreground">{account.name}</h3>
                      <Badge variant={badge.variant} className="text-xs">
                        {badge.text}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <span>فالوور: {account.followers}</span>
                      <span>پست‌ها: {account.postsThisMonth}</span>
                      <span>تعامل: {account.engagement}</span>
                      <span>آخرین فعالیت: {account.lastActivity}</span>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 ml-2" />
                        مشاهده جزئیات
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="w-4 h-4 ml-2" />
                        تنظیمات
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 ml-2" />
                        حذف حساب
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}