import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FolderOpen, FileText, Image as ImageIcon, Check, X, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CsvData {
  imageUrl: string;
  text: string;
}

interface ImageFile {
  file: File;
  preview: string;
  name: string;
}

interface Account {
  id: string;
  name: string;
  username: string;
  platform: string;
  avatar: string;
}

export default function GroupPublish() {
  const [csvData, setCsvData] = useState<CsvData[]>([]);
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const csvInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Mock accounts data
  const accounts: Account[] = [
    {
      id: "1",
      name: "اکانت اصلی",
      username: "@main_account",
      platform: "Instagram",
      avatar: "/placeholder.svg"
    },
    {
      id: "2", 
      name: "اکانت کسب و کار",
      username: "@business_account",
      platform: "Instagram",
      avatar: "/placeholder.svg"
    },
    {
      id: "3",
      name: "اکانت شخصی",
      username: "@personal_account", 
      platform: "Instagram",
      avatar: "/placeholder.svg"
    }
  ];

  const handleCsvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast({
        title: "خطا",
        description: "لطفاً فایل CSV انتخاب کنید",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());
        const data: CsvData[] = [];

        lines.forEach((line, index) => {
          const [imageUrl, textContent] = line.split(',').map(item => item.trim().replace(/"/g, ''));
          if (imageUrl && textContent) {
            data.push({ imageUrl, text: textContent });
          }
        });

        setCsvData(data);
        toast({
          title: "موفق",
          description: `${data.length} آیتم از فایل CSV لود شد`,
        });
      } catch (error) {
        toast({
          title: "خطا",
          description: "خطا در خواندن فایل CSV",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  const handleFolderSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const imageFiles: ImageFile[] = [];
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

    Array.from(files).forEach((file) => {
      if (validImageTypes.includes(file.type)) {
        const preview = URL.createObjectURL(file);
        imageFiles.push({
          file,
          preview,
          name: file.name
        });
      }
    });

    setImageFiles(imageFiles);
    toast({
      title: "موفق",
      description: `${imageFiles.length} عکس انتخاب شد`,
    });
  };

  const confirmCsvPosts = async () => {
    setIsProcessing(true);
    try {
      // Simulate posting to Instagram
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "موفق",
        description: `${csvData.length} پست با موفقیت منتشر شد`,
      });
      setCsvData([]);
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در انتشار پست‌ها",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const publishImagePosts = async () => {
    setIsProcessing(true);
    try {
      // Simulate posting to Instagram
      for (let i = 0; i < imageFiles.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast({
          title: "در حال انتشار",
          description: `پست ${i + 1} از ${imageFiles.length} منتشر شد`,
        });
      }
      
      toast({
        title: "موفق",
        description: `${imageFiles.length} پست عکس با موفقیت منتشر شد`,
      });
      setImageFiles([]);
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در انتشار پست‌ها",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const removeCsvItem = (index: number) => {
    setCsvData(prev => prev.filter((_, i) => i !== index));
  };

  const removeImageFile = (index: number) => {
    const fileToRemove = imageFiles[index];
    URL.revokeObjectURL(fileToRemove.preview);
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAccountSelection = (accountId: string, checked: boolean) => {
    if (checked) {
      setSelectedAccounts(prev => [...prev, accountId]);
    } else {
      setSelectedAccounts(prev => prev.filter(id => id !== accountId));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">انتشار گروهی</h1>
        <p className="text-muted-foreground">انتشار چندین پست به صورت یکجا در شبکه‌های اجتماعی</p>
      </div>

      {/* Account Selection Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            انتخاب اکانت‌ها
          </CardTitle>
          <CardDescription>
            اکانت‌هایی که پست‌ها از طریق آنها منتشر خواهند شد
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center space-x-3 space-x-reverse p-3 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <Checkbox
                  id={account.id}
                  checked={selectedAccounts.includes(account.id)}
                  onCheckedChange={(checked) => 
                    handleAccountSelection(account.id, checked as boolean)
                  }
                />
                <img
                  src={account.avatar}
                  alt={account.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <label
                    htmlFor={account.id}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {account.name}
                  </label>
                  <p className="text-xs text-muted-foreground truncate">
                    {account.username} • {account.platform}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {selectedAccounts.length > 0 && (
            <div className="mt-4 p-3 bg-primary/10 rounded-lg">
              <p className="text-sm text-primary font-medium">
                {selectedAccounts.length} اکانت انتخاب شده
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CSV Upload Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              آپلود CSV
            </CardTitle>
            <CardDescription>
              فایل CSV با ستون اول: آدرس عکس، ستون دوم: متن پست
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              ref={csvInputRef}
              type="file"
              accept=".csv"
              onChange={handleCsvUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => csvInputRef.current?.click()}
              className="w-full h-32 border-dashed"
              disabled={isProcessing}
            >
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-8 h-8 text-muted-foreground" />
                <span>انتخاب فایل CSV</span>
              </div>
            </Button>

            {csvData.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">{csvData.length} آیتم لود شده</p>
                <Button 
                  onClick={confirmCsvPosts} 
                  disabled={isProcessing}
                  className="w-full"
                >
                  {isProcessing ? "در حال انتشار..." : "تایید و انتشار"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Folder Selection Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              انتخاب پوشه عکس‌ها
            </CardTitle>
            <CardDescription>
              انتخاب پوشه‌ای حاوی عکس‌ها برای ایجاد پست‌های جداگانه
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              ref={folderInputRef}
              type="file"
              multiple
              onChange={handleFolderSelect}
              className="hidden"
              {...({ webkitdirectory: "" } as any)}
            />
            <Button
              variant="outline"
              onClick={() => folderInputRef.current?.click()}
              className="w-full h-32 border-dashed"
              disabled={isProcessing}
            >
              <div className="flex flex-col items-center gap-2">
                <FolderOpen className="w-8 h-8 text-muted-foreground" />
                <span>انتخاب پوشه عکس‌ها</span>
              </div>
            </Button>

            {imageFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">{imageFiles.length} عکس انتخاب شده</p>
                <Button 
                  onClick={publishImagePosts} 
                  disabled={isProcessing}
                  className="w-full"
                >
                  {isProcessing ? "در حال انتشار..." : "انتشار تمام عکس‌ها"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* CSV Data Table */}
      {csvData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>پیش‌نمایش داده‌های CSV</CardTitle>
            <CardDescription>بررسی و تایید پست‌های آماده انتشار</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">تصویر</TableHead>
                  <TableHead className="text-right">متن</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {csvData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <img
                        src={item.imageUrl}
                        alt={`Post ${index + 1}`}
                        className="w-16 h-16 object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="truncate">{item.text}</p>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeCsvItem(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Image Files Preview */}
      {imageFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>پیش‌نمایش عکس‌های انتخاب شده</CardTitle>
            <CardDescription>عکس‌هایی که برای انتشار آماده شده‌اند</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {imageFiles.map((imageFile, index) => (
                <div key={index} className="relative group">
                  <img
                    src={imageFile.preview}
                    alt={imageFile.name}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeImageFile(index)}
                    className="absolute top-1 right-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                  <p className="text-xs mt-1 truncate">{imageFile.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}