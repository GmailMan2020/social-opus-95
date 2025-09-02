import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Send,
  Calendar,
  Image as ImageIcon,
  Sparkles,
  Hash,
  Instagram,
  Twitter,
  MessageCircle,
  Clock,
  Users,
  AlertCircle,
  Upload
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock accounts data
const accounts = [
  { id: 1, name: "@company_official", platform: "instagram", followers: "45.2K" },
  { id: 2, name: "@company_news", platform: "twitter", followers: "12.8K" },
  { id: 3, name: "@company_channel", platform: "telegram", followers: "8.9K" },
]

const platformTips = {
  instagram: [
    "حداکثر 2200 کاراکتر برای کپشن",
    "حداکثر 30 هشتگ مجاز",
    "استوری‌ها 24 ساعت نمایش داده می‌شوند",
    "بهترین زمان انتشار: 11-13 و 19-21"
  ],
  twitter: [
    "حداکثر 280 کاراکتر برای توییت",
    "حداکثر 4 تصویر در هر توییت",
    "استفاده از هشتگ‌های ترندینگ",
    "بهترین زمان انتشار: 9-10 و 19-20"
  ],
  telegram: [
    "بدون محدودیت کاراکتر",
    "پشتیبانی از فایل‌های حجیم",
    "قابلیت ارسال برنامه‌ریزی شده",
    "بهترین زمان انتشار: 20-22"
  ]
}

function getPlatformIcon(platform: string) {
  switch (platform) {
    case "instagram": return Instagram
    case "twitter": return Twitter
    case "telegram": return MessageCircle
    default: return Send
  }
}

export default function Publish() {
  const [selectedAccount, setSelectedAccount] = useState("")
  const [content, setContent] = useState("")
  const [hashtags, setHashtags] = useState("")
  const [scheduledDate, setScheduledDate] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")
  const [aiPrompt, setAiPrompt] = useState("")
  const [showAiDialog, setShowAiDialog] = useState(false)

  const selectedPlatform = accounts.find(acc => acc.id.toString() === selectedAccount)?.platform || ""
  const tips = selectedPlatform ? platformTips[selectedPlatform as keyof typeof platformTips] : []
  const PlatformIcon = getPlatformIcon(selectedPlatform)

  const handleAIGenerate = () => {
    // Mock AI generation
    if (aiPrompt.trim()) {
      const generatedContent = `محتوای تولید شده با هوش مصنوعی بر اساس: "${aiPrompt}"\n\nاین یک نمونه محتوای حرفه‌ای است که توسط هوش مصنوعی بر اساس درخواست شما تولید شده است. محتوا شامل نکات کلیدی و پیام مؤثر برای مخاطبان شماست.`
      setContent(generatedContent)
      setShowAiDialog(false)
      setAiPrompt("")
    }
  }

  const generateHashtags = () => {
    // Mock hashtag generation
    const sampleHashtags = "#کسب_و_کار #دیجیتال_مارکتینگ #محتوا #برند #شبکه_اجتماعی #موفقیت"
    setHashtags(sampleHashtags)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">انتشار محتوا</h1>
          <p className="text-muted-foreground mt-2">ایجاد و انتشار پست در شبکه‌های اجتماعی</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Content Creation */}
          <Card className="professional-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Send className="w-5 h-5" />
                محتوای پست
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* AI Button */}
              <div className="flex justify-end">
                <Dialog open={showAiDialog} onOpenChange={setShowAiDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Sparkles className="w-4 h-4" />
                      تولید با هوش مصنوعی
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>تولید محتوا با هوش مصنوعی</DialogTitle>
                      <DialogDescription>
                        توضیح دهید چه نوع محتوایی می‌خواهید تولید کنید
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="مثال: یک پست تبلیغاتی برای محصول جدید شرکت که شامل مزایا و ویژگی‌های کلیدی باشد..."
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setShowAiDialog(false)}>
                          انصراف
                        </Button>
                        <Button onClick={handleAIGenerate}>
                          تولید محتوا
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Content Textarea */}
              <div className="space-y-2">
                <Label htmlFor="content">متن پست</Label>
                <Textarea
                  id="content"
                  placeholder="محتوای پست خود را اینجا بنویسید..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{content.length} کاراکتر</span>
                  {selectedPlatform === "twitter" && content.length > 280 && (
                    <span className="text-destructive">حد مجاز توییتر تجاوز شده</span>
                  )}
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>تصویر پست</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">تصویر را اینجا بکشید یا کلیک کنید</p>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 ml-2" />
                    انتخاب فایل
                  </Button>
                </div>
              </div>

              {/* Hashtags */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="hashtags">هشتگ‌ها</Label>
                  <Button variant="outline" size="sm" onClick={generateHashtags}>
                    <Hash className="w-4 h-4 ml-2" />
                    تولید هشتگ
                  </Button>
                </div>
                <Input
                  id="hashtags"
                  placeholder="#هشتگ_اول #هشتگ_دوم #هشتگ_سوم"
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Selection */}
          <Card className="professional-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5" />
                انتخاب حساب
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                <SelectTrigger>
                  <SelectValue placeholder="حساب مورد نظر را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => {
                    const Icon = getPlatformIcon(account.platform)
                    return (
                      <SelectItem key={account.id} value={account.id.toString()}>
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <span>{account.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {account.followers}
                          </Badge>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Scheduling */}
          <Card className="professional-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                زمان‌بندی انتشار
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">تاریخ</Label>
                <Input
                  id="date"
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">ساعت</Label>
                <Input
                  id="time"
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Send className="w-4 h-4 ml-2" />
                  انتشار فوری
                </Button>
                <Button variant="outline" className="flex-1">
                  <Clock className="w-4 h-4 ml-2" />
                  زمان‌بندی
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Platform Tips */}
          {selectedPlatform && (
            <Card className="professional-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <PlatformIcon className="w-5 h-5" />
                  نکات {selectedPlatform === "instagram" ? "اینستاگرام" : selectedPlatform === "twitter" ? "توییتر" : "تلگرام"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
