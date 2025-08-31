import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Settings as SettingsIcon, 
  User,
  Shield,
  Bell,
  Eye,
  EyeOff,
  Save,
  Download,
  Trash2,
  Lock,
  Globe,
  Monitor,
  Smartphone
} from "lucide-react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data for recent logins
const recentLogins = [
  {
    id: 1,
    device: "کامپیوتر شخصی",
    location: "تهران، ایران",
    time: "الان",
    ip: "192.168.1.100",
    current: true
  },
  {
    id: 2,
    device: "موبایل",
    location: "تهران، ایران",
    time: "2 ساعت پیش",
    ip: "192.168.1.101",
    current: false
  },
  {
    id: 3,
    device: "تبلت",
    location: "اصفهان، ایران",
    time: "1 روز پیش",
    ip: "185.55.220.45",
    current: false
  }
]

export default function Settings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [userSettings, setUserSettings] = useState({
    name: "احمد محمدی",
    email: "ahmad@example.com",
    phone: "09123456789",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const [generalSettings, setGeneralSettings] = useState({
    confirmBeforePublish: true,
    autoSaveHashtags: true,
    autoSaveDrafts: true,
    language: "fa",
    timezone: "Asia/Tehran"
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    postSuccessNotifications: true,
    postFailureNotifications: true,
    weeklyReports: false,
    securityAlerts: true
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    sessionTimeout: "24"
  })

  const handleSaveProfile = () => {
    console.log("Saving profile:", userSettings)
  }

  const handleChangePassword = () => {
    if (userSettings.newPassword !== userSettings.confirmPassword) {
      alert("رمز عبور جدید و تکرار آن یکسان نیستند")
      return
    }
    console.log("Changing password")
  }

  const handleSaveGeneralSettings = () => {
    console.log("Saving general settings:", generalSettings)
  }

  const handleSaveNotificationSettings = () => {
    console.log("Saving notification settings:", notificationSettings)
  }

  const handleSaveSecuritySettings = () => {
    console.log("Saving security settings:", securitySettings)
  }

  const getDeviceIcon = (device: string) => {
    if (device.includes("موبایل")) return Smartphone
    if (device.includes("تبلت")) return Smartphone
    return Monitor
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">تنظیمات</h1>
          <p className="text-muted-foreground mt-2">مدیریت تنظیمات حساب کاربری و برنامه</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            پروفایل
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <SettingsIcon className="w-4 h-4" />
            عمومی
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            اعلانات
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            امنیت
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="professional-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">اطلاعات شخصی</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">نام و نام خانوادگی</Label>
                  <Input
                    id="name"
                    value={userSettings.name}
                    onChange={(e) => setUserSettings({...userSettings, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">آدرس ایمیل</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userSettings.email}
                    onChange={(e) => setUserSettings({...userSettings, email: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">شماره تلفن</Label>
                  <Input
                    id="phone"
                    value={userSettings.phone}
                    onChange={(e) => setUserSettings({...userSettings, phone: e.target.value})}
                  />
                </div>
                
                <Button onClick={handleSaveProfile} className="w-full">
                  <Save className="w-4 h-4 ml-2" />
                  ذخیره تغییرات
                </Button>
              </CardContent>
            </Card>

            <Card className="professional-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">تغییر رمز عبور</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">رمز عبور فعلی</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showCurrentPassword ? "text" : "password"}
                      value={userSettings.currentPassword}
                      onChange={(e) => setUserSettings({...userSettings, currentPassword: e.target.value})}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute left-0 top-0 h-full px-3"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">رمز عبور جدید</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      value={userSettings.newPassword}
                      onChange={(e) => setUserSettings({...userSettings, newPassword: e.target.value})}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute left-0 top-0 h-full px-3"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">تکرار رمز عبور جدید</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={userSettings.confirmPassword}
                      onChange={(e) => setUserSettings({...userSettings, confirmPassword: e.target.value})}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute left-0 top-0 h-full px-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <Button onClick={handleChangePassword} className="w-full">
                  <Lock className="w-4 h-4 ml-2" />
                  تغییر رمز عبور
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* General Settings */}
        <TabsContent value="general">
          <Card className="professional-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">تنظیمات عمومی</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="confirm-publish">تایید قبل از انتشار</Label>
                  <p className="text-sm text-muted-foreground">قبل از انتشار هر پست تایید بگیرد</p>
                </div>
                <Switch
                  id="confirm-publish"
                  checked={generalSettings.confirmBeforePublish}
                  onCheckedChange={(checked) => setGeneralSettings({...generalSettings, confirmBeforePublish: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-hashtags">ذخیره خودکار هشتگ‌ها</Label>
                  <p className="text-sm text-muted-foreground">هشتگ‌های استفاده شده را ذخیره کند</p>
                </div>
                <Switch
                  id="auto-hashtags"
                  checked={generalSettings.autoSaveHashtags}
                  onCheckedChange={(checked) => setGeneralSettings({...generalSettings, autoSaveHashtags: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-drafts">ذخیره خودکار پیش‌نویس‌ها</Label>
                  <p className="text-sm text-muted-foreground">محتوای نیمه‌کاره را به عنوان پیش‌نویس ذخیره کند</p>
                </div>
                <Switch
                  id="auto-drafts"
                  checked={generalSettings.autoSaveDrafts}
                  onCheckedChange={(checked) => setGeneralSettings({...generalSettings, autoSaveDrafts: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>زبان رابط کاربری</Label>
                  <Select value={generalSettings.language} onValueChange={(value) => setGeneralSettings({...generalSettings, language: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fa">فارسی</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>منطقه زمانی</Label>
                  <Select value={generalSettings.timezone} onValueChange={(value) => setGeneralSettings({...generalSettings, timezone: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Tehran">تهران (UTC+3:30)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button onClick={handleSaveGeneralSettings}>
                <Save className="w-4 h-4 ml-2" />
                ذخیره تنظیمات عمومی
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card className="professional-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">تنظیمات اعلانات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">اعلانات ایمیلی</Label>
                  <p className="text-sm text-muted-foreground">دریافت اعلانات مهم از طریق ایمیل</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="success-notifications">اعلان موفقیت انتشار</Label>
                  <p className="text-sm text-muted-foreground">اطلاع‌رسانی زمان انتشار موفق پست‌ها</p>
                </div>
                <Switch
                  id="success-notifications"
                  checked={notificationSettings.postSuccessNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, postSuccessNotifications: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="failure-notifications">اعلان خطا در انتشار</Label>
                  <p className="text-sm text-muted-foreground">اطلاع‌رسانی در صورت خطا در انتشار پست</p>
                </div>
                <Switch
                  id="failure-notifications"
                  checked={notificationSettings.postFailureNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, postFailureNotifications: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weekly-reports">گزارش هفتگی</Label>
                  <p className="text-sm text-muted-foreground">دریافت گزارش عملکرد هفتگی</p>
                </div>
                <Switch
                  id="weekly-reports"
                  checked={notificationSettings.weeklyReports}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, weeklyReports: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="security-alerts">هشدارهای امنیتی</Label>
                  <p className="text-sm text-muted-foreground">اطلاع‌رسانی فعالیت‌های مشکوک</p>
                </div>
                <Switch
                  id="security-alerts"
                  checked={notificationSettings.securityAlerts}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, securityAlerts: checked})}
                />
              </div>
              
              <Button onClick={handleSaveNotificationSettings}>
                <Save className="w-4 h-4 ml-2" />
                ذخیره تنظیمات اعلانات
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <div className="space-y-6">
            <Card className="professional-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">تنظیمات امنیتی</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="two-factor">احراز هویت دو مرحله‌ای</Label>
                    <p className="text-sm text-muted-foreground">افزایش امنیت حساب با کد تایید پیامکی</p>
                  </div>
                  <Switch
                    id="two-factor"
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="login-notifications">اعلان ورود جدید</Label>
                    <p className="text-sm text-muted-foreground">اطلاع‌رسانی ورود از دستگاه جدید</p>
                  </div>
                  <Switch
                    id="login-notifications"
                    checked={securitySettings.loginNotifications}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, loginNotifications: checked})}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label>مدت زمان نشست (ساعت)</Label>
                  <Select value={securitySettings.sessionTimeout} onValueChange={(value) => setSecuritySettings({...securitySettings, sessionTimeout: value})}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 ساعت</SelectItem>
                      <SelectItem value="8">8 ساعت</SelectItem>
                      <SelectItem value="24">24 ساعت</SelectItem>
                      <SelectItem value="168">1 هفته</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={handleSaveSecuritySettings}>
                  <Save className="w-4 h-4 ml-2" />
                  ذخیره تنظیمات امنیتی
                </Button>
              </CardContent>
            </Card>

            {/* Recent Logins */}
            <Card className="professional-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">آخرین ورودها</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentLogins.map((login) => {
                    const DeviceIcon = getDeviceIcon(login.device)
                    
                    return (
                      <div key={login.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <DeviceIcon className="w-5 h-5 text-primary" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-foreground">{login.device}</p>
                            {login.current && (
                              <Badge variant="default" className="text-xs">جلسه فعلی</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{login.location}</p>
                          <p className="text-xs text-muted-foreground">IP: {login.ip} • {login.time}</p>
                        </div>
                        
                        {!login.current && (
                          <Button variant="ghost" size="sm" className="text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}