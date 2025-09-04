import { useState } from "react";
import { 
  Brain, 
  Image, 
  Hash, 
  FileText, 
  PenTool, 
  Wand2, 
  Sparkles, 
  MessageSquare, 
  Zap,
  Camera,
  Search,
  Globe
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const AIStudio = () => {
  const [content, setContent] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);

  const aiFeatures = [
    {
      id: "content-generator",
      title: "تولید محتوا",
      description: "تولید متن خلاقانه برای پست‌های شبکه‌های اجتماعی",
      icon: PenTool,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: "image-generator",
      title: "تولید تصویر",
      description: "ساخت تصاویر حرفه‌ای با هوش مصنوعی",
      icon: Image,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: "hashtag-generator",
      title: "تولید هشتگ",
      description: "پیشنهاد هشتگ‌های مناسب برای محتوای شما",
      icon: Hash,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: "content-analyzer",
      title: "تحلیل محتوا",
      description: "بررسی و بهبود کیفیت متن‌های شما",
      icon: Search,
      gradient: "from-orange-500 to-red-500"
    },
    {
      id: "translation",
      title: "ترجمه هوشمند",
      description: "ترجمه محتوا به زبان‌های مختلف",
      icon: Globe,
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      id: "caption-generator",
      title: "تولید کپشن",
      description: "ساخت کپشن جذاب برای تصاویر",
      icon: Camera,
      gradient: "from-teal-500 to-blue-500"
    }
  ];

  const handleContentGeneration = () => {
    // Mock AI content generation
    const mockContent = `🌟 محتوای جذاب و خلاقانه برای شبکه‌های اجتماعی

${prompt}

این محتوا با استفاده از هوش مصنوعی تولید شده و برای جذب مخاطب بهینه‌سازی شده است.

✨ نکات مهم:
• استفاده از زبان ساده و قابل فهم
• محتوای هدفمند و جذاب
• بهینه برای engagement

#محتوای_هوشمند #شبکه_اجتماعی #هوش_مصنوعی`;
    
    setGeneratedText(mockContent);
    toast.success("محتوا با موفقیت تولید شد!");
  };

  const handleHashtagGeneration = () => {
    // Mock hashtag generation
    const mockHashtags = [
      "#محتوای_هوشمند", "#شبکه_اجتماعی", "#هوش_مصنوعی",
      "#دیجیتال_مارکتینگ", "#کسب_و_کار", "#نوآوری",
      "#تکنولوژی", "#آینده", "#خلاقیت", "#موفقیت"
    ];
    setHashtags(mockHashtags);
    toast.success("هشتگ‌ها تولید شدند!");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              استودیو هوش مصنوعی
            </h1>
            <p className="text-muted-foreground">
              ابزارهای پیشرفته هوش مصنوعی برای تولید محتوا
            </p>
          </div>
        </div>
      </div>

      {/* AI Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {aiFeatures.map((feature) => (
          <Card key={feature.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader className="pb-3">
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                <Sparkles className="w-4 h-4 mr-2" />
                شروع کار
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Workspace */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5" />
            فضای کاری هوش مصنوعی
          </CardTitle>
          <CardDescription>
            ابزارهای تولید محتوا و تحلیل متن
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="content" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">تولید محتوا</TabsTrigger>
              <TabsTrigger value="hashtags">تولید هشتگ</TabsTrigger>
              <TabsTrigger value="analysis">تحلیل متن</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    موضوع یا دستورالعمل برای تولید محتوا
                  </label>
                  <Textarea
                    placeholder="مثال: یک پست جذاب درباره اهمیت ورزش در زندگی روزانه بنویس..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                <Button onClick={handleContentGeneration} className="w-full">
                  <Sparkles className="w-4 h-4 mr-2" />
                  تولید محتوا با هوش مصنوعی
                </Button>
                {generatedText && (
                  <div className="mt-4">
                    <label className="text-sm font-medium mb-2 block">
                      محتوای تولید شده
                    </label>
                    <Textarea
                      value={generatedText}
                      onChange={(e) => setGeneratedText(e.target.value)}
                      className="min-h-[200px]"
                    />
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="hashtags" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    متن یا موضوع برای تولید هشتگ
                  </label>
                  <Textarea
                    placeholder="متن خود را وارد کنید تا هشتگ‌های مناسب پیشنهاد دهیم..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                <Button onClick={handleHashtagGeneration} className="w-full">
                  <Hash className="w-4 h-4 mr-2" />
                  تولید هشتگ‌ها
                </Button>
                {hashtags.length > 0 && (
                  <div className="mt-4">
                    <label className="text-sm font-medium mb-2 block">
                      هشتگ‌های پیشنهادی
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {hashtags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    متن برای تحلیل
                  </label>
                  <Textarea
                    placeholder="متن خود را اینجا وارد کنید تا تحلیل کنیم..."
                    className="min-h-[150px]"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    تحلیل احساسات
                  </Button>
                  <Button variant="outline">
                    <Zap className="w-4 h-4 mr-2" />
                    بهبود متن
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    خلاصه‌سازی
                  </Button>
                  <Button variant="outline">
                    <Search className="w-4 h-4 mr-2" />
                    تشخیص کلمات کلیدی
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIStudio;