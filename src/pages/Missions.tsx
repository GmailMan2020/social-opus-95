import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { 
  Target, 
  Play,
  Pause,
  Settings,
  Plus,
  Instagram,
  Twitter,
  MessageCircle,
  Heart,
  UserPlus,
  Eye,
  Repeat,
  Clock,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle
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
import {
  Checkbox
} from "@/components/ui/checkbox"

// Mock data
const activeMissions = [
  {
    id: 1,
    name: "ماموریت لایک اینستاگرام",
    platform: "instagram",
    type: "like",
    targetAccounts: ["@target_account_1", "@target_account_2"],
    sourceAccounts: ["@company_official", "@company_backup"],
    status: "active",
    dailyLimit: 50,
    completed: 23,
    startDate: "1403/08/15",
    settings: {
      randomDelay: true,
      avoidSpam: true,
      workingHours: "09:00-18:00"
    }
  },
  {
    id: 2,
    name: "ماموریت فالو توییتر",
    platform: "twitter",
    type: "follow",
    targetAccounts: ["@twitter_influencer", "@industry_leader"],
    sourceAccounts: ["@company_news"],
    status: "paused",
    dailyLimit: 30,
    completed: 15,
    startDate: "1403/08/10",
    settings: {
      randomDelay: true,
      avoidSpam: true,
      workingHours: "10:00-20:00"
    }
  }
]

const accounts = [
  { id: 1, name: "@company_official", platform: "instagram" },
  { id: 2, name: "@company_backup", platform: "instagram" },
  { id: 3, name: "@company_news", platform: "twitter" },
  { id: 4, name: "@company_channel", platform: "telegram" },
]

const missionTypes = {
  instagram: [
    { value: "like_recent", label: "لایک آخرین پست", icon: Heart },
    { value: "like_multiple", label: "لایک 5 پست اخیر", icon: Heart },
    { value: "like_story", label: "لایک استوری", icon: Heart },
    { value: "follow", label: "فالو کردن", icon: UserPlus },
    { value: "view_story", label: "مشاهده استوری", icon: Eye },
  ],
  twitter: [
    { value: "like_recent", label: "لایک آخرین توییت", icon: Heart },
    { value: "retweet", label: "ریتوییت", icon: Repeat },
    { value: "follow", label: "فالو کردن", icon: UserPlus },
  ],
  telegram: [
    { value: "view_channel", label: "مشاهده کانال", icon: Eye },
    { value: "join_channel", label: "عضویت در کانال", icon: UserPlus },
  ]
}

function getPlatformIcon(platform: string) {
  switch (platform) {
    case "instagram": return Instagram
    case "twitter": return Twitter
    case "telegram": return MessageCircle
    default: return Target
  }
}

function getMissionTypeIcon(type: string) {
  switch (type) {
    case "like": case "like_recent": case "like_multiple": case "like_story": return Heart
    case "follow": return UserPlus
    case "retweet": return Repeat
    case "view": case "view_story": case "view_channel": return Eye
    default: return Target
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "active": return { text: "فعال", variant: "default" as const, icon: Play }
    case "paused": return { text: "متوقف", variant: "secondary" as const, icon: Pause }
    case "completed": return { text: "تکمیل", variant: "outline" as const, icon: CheckCircle }
    default: return { text: "نامشخص", variant: "outline" as const, icon: AlertCircle }
  }
}

export default function Missions() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState("")
  const [selectedMissionType, setSelectedMissionType] = useState("")
  const [targetAccounts, setTargetAccounts] = useState("")
  const [selectedSourceAccounts, setSelectedSourceAccounts] = useState<string[]>([])
  const [dailyLimit, setDailyLimit] = useState("50")
  const [workingHours, setWorkingHours] = useState({ start: "09:00", end: "18:00" })
  const [settings, setSettings] = useState({
    randomDelay: true,
    avoidSpam: true,
    emailReport: false
  })

  const availableSourceAccounts = accounts.filter(acc => acc.platform === selectedPlatform)
  const availableMissionTypes = selectedPlatform ? missionTypes[selectedPlatform as keyof typeof missionTypes] : []

  const handleCreateMission = () => {
    // Mock mission creation
    console.log("Creating mission:", {
      platform: selectedPlatform,
      type: selectedMissionType,
      targetAccounts: targetAccounts.split(',').map(acc => acc.trim()),
      sourceAccounts: selectedSourceAccounts,
      dailyLimit: parseInt(dailyLimit),
      workingHours,
      settings
    })
    setShowCreateDialog(false)
    // Reset form
    setSelectedPlatform("")
    setSelectedMissionType("")
    setTargetAccounts("")
    setSelectedSourceAccounts([])
    setDailyLimit("50")
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">ماموریت‌ها</h1>
          <p className="text-muted-foreground mt-2">مدیریت ماموریت‌های خودکار (لایک، فالو، مشاهده)</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="professional-button gap-2">
              <Plus className="w-4 h-4" />
              ماموریت جدید
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>ایجاد ماموریت جدید</DialogTitle>
              <DialogDescription>
                ماموریت خودکار برای تعامل با حساب‌های هدف تعریف کنید
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Platform Selection */}
              <div className="space-y-2">
                <Label>انتخاب پلتفرم</Label>
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder="پلتفرم مورد نظر را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">اینستاگرام</SelectItem>
                    <SelectItem value="twitter">توییتر</SelectItem>
                    <SelectItem value="telegram">تلگرام</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mission Type */}
              {selectedPlatform && (
                <div className="space-y-2">
                  <Label>نوع ماموریت</Label>
                  <Select value={selectedMissionType} onValueChange={setSelectedMissionType}>
                    <SelectTrigger>
                      <SelectValue placeholder="نوع عملیات را انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableMissionTypes.map((type) => {
                        const Icon = type.icon
                        return (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4" />
                              {type.label}
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Target Accounts */}
              <div className="space-y-2">
                <Label htmlFor="targets">حساب‌های هدف</Label>
                <Input
                  id="targets"
                  placeholder="@target1, @target2, @target3"
                  value={targetAccounts}
                  onChange={(e) => setTargetAccounts(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">نام کاربری حساب‌های هدف را با کاما جدا کنید</p>
              </div>

              {/* Source Accounts */}
              {selectedPlatform && (
                <div className="space-y-2">
                  <Label>حساب‌های منبع</Label>
                  <div className="space-y-2">
                    {availableSourceAccounts.map((account) => (
                      <div key={account.id} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id={`account-${account.id}`}
                          checked={selectedSourceAccounts.includes(account.name)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedSourceAccounts([...selectedSourceAccounts, account.name])
                            } else {
                              setSelectedSourceAccounts(selectedSourceAccounts.filter(name => name !== account.name))
                            }
                          }}
                        />
                        <Label htmlFor={`account-${account.id}`} className="text-sm">
                          {account.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Daily Limit */}
              <div className="space-y-2">
                <Label htmlFor="limit">محدودیت روزانه</Label>
                <Input
                  id="limit"
                  type="number"
                  value={dailyLimit}
                  onChange={(e) => setDailyLimit(e.target.value)}
                  placeholder="50"
                />
              </div>

              {/* Working Hours */}
              <div className="space-y-2">
                <Label>ساعات کاری</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-time" className="text-sm">شروع</Label>
                    <Input
                      id="start-time"
                      type="time"
                      value={workingHours.start}
                      onChange={(e) => setWorkingHours({...workingHours, start: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end-time" className="text-sm">پایان</Label>
                    <Input
                      id="end-time"
                      type="time"
                      value={workingHours.end}
                      onChange={(e) => setWorkingHours({...workingHours, end: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="space-y-4">
                <Label>تنظیمات پیشرفته</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="random-delay">تاخیر تصادفی</Label>
                    <Switch
                      id="random-delay"
                      checked={settings.randomDelay}
                      onCheckedChange={(checked) => setSettings({...settings, randomDelay: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="avoid-spam">جلوگیری از اسپم</Label>
                    <Switch
                      id="avoid-spam"
                      checked={settings.avoidSpam}
                      onCheckedChange={(checked) => setSettings({...settings, avoidSpam: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-report">گزارش ایمیلی روزانه</Label>
                    <Switch
                      id="email-report"
                      checked={settings.emailReport}
                      onCheckedChange={(checked) => setSettings({...settings, emailReport: checked})}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  انصراف
                </Button>
                <Button onClick={handleCreateMission} className="gap-2">
                  <Target className="w-4 h-4" />
                  ایجاد و اجرا
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Missions */}
      <Card className="professional-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Target className="w-5 h-5" />
            ماموریت‌های در حال انجام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeMissions.map((mission) => {
              const PlatformIcon = getPlatformIcon(mission.platform)
              const TypeIcon = getMissionTypeIcon(mission.type)
              const badge = getStatusBadge(mission.status)
              const StatusIcon = badge.icon
              const progressPercentage = (mission.completed / mission.dailyLimit) * 100
              
              return (
                <div key={mission.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <PlatformIcon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-foreground">{mission.name}</h3>
                      <Badge variant={badge.variant} className="text-xs">
                        <StatusIcon className="w-3 h-3 ml-1" />
                        {badge.text}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">حساب‌های هدف:</p>
                        <p className="text-sm font-medium">{mission.targetAccounts.join(", ")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">حساب‌های منبع:</p>
                        <p className="text-sm font-medium">{mission.sourceAccounts.join(", ")}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <TypeIcon className="w-4 h-4" />
                        نوع: {mission.type === "like" ? "لایک" : mission.type === "follow" ? "فالو" : "مشاهده"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        ساعات کاری: {mission.settings.workingHours}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        پیشرفت: {mission.completed}/{mission.dailyLimit}
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-muted rounded-full h-2 mb-3">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all" 
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {mission.settings.randomDelay && (
                        <Badge variant="outline" className="text-xs">تاخیر تصادفی</Badge>
                      )}
                      {mission.settings.avoidSpam && (
                        <Badge variant="outline" className="text-xs">ضد اسپم</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      {mission.status === "active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}