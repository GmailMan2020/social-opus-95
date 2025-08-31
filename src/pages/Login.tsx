import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Shield } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (email && password) {
      toast.success("ورود موفقیت‌آمیز بود")
      navigate("/")
    } else {
      toast.error("لطفاً تمام فیلدها را پر کنید")
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-glow">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">مدیریت شبکه‌های اجتماعی</h1>
          <p className="text-muted-foreground">ورود به پلتفرم حرفه‌ای</p>
        </div>

        {/* Login Form */}
        <Card className="professional-card border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold">ورود به حساب</CardTitle>
            <CardDescription>
              برای دسترسی به پنل مدیریت وارد شوید
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">ایمیل</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">رمز عبور</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="رمز عبور خود را وارد کنید"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pl-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-border" />
                  <span className="text-muted-foreground">مرا به خاطر بسپار</span>
                </label>
                <Button variant="link" className="p-0 h-auto text-primary">
                  فراموشی رمز عبور؟
                </Button>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 professional-button"
                disabled={isLoading}
              >
                {isLoading ? "در حال ورود..." : "ورود"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                حساب ندارید؟{" "}
                <Button variant="link" className="p-0 h-auto text-primary">
                  ثبت نام کنید
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            <Shield className="w-3 h-3" />
            اتصال امن و رمزنگاری شده
          </p>
        </div>
      </div>
    </div>
  )
}