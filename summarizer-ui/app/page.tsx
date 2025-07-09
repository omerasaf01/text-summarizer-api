"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Copy, FileText, Sparkles, Zap, Clock, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { summarizeText } from "@/lib/utils"

export default function TextSummarizerPage() {
  const [inputText, setInputText] = useState("")
  const [summary, setSummary] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Hata",
        description: "Lütfen özetlenecek bir metin girin.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulated API call - replace with your actual AI service
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      let response = await summarizeText(inputText)
      setSummary(response)
    } catch (error) {
      toast({
        title: "Hata",
        description: "Özet oluşturulurken bir hata oluştu.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Başarılı",
        description: "Metin panoya kopyalandı.",
      })
    } catch (error) {
      toast({
        title: "Hata",
        description: "Metin kopyalanamadı.",
        variant: "destructive",
      })
    }
  }

  const handleClear = () => {
    setInputText("")
    setSummary("")
  }

  const wordCount = inputText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length
  const charCount = inputText.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Metin Özetleyici
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Uzun metinlerinizi yapay zeka ile hızlı ve etkili bir şekilde özetleyin. Makale, rapor, blog yazısı ve daha
            fazlası için ideal.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Metin Girişi
              </CardTitle>
              <CardDescription>Özetlemek istediğiniz metni aşağıya yapıştırın veya yazın</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Buraya özetlemek istediğiniz metni yazın veya yapıştırın..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[300px] resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex gap-4">
                  <span>{wordCount} kelime</span>
                  <span>{charCount} karakter</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleClear} className="text-gray-500 hover:text-gray-700">
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Temizle
                </Button>
              </div>

              <Button
                onClick={handleSummarize}
                disabled={isLoading || !inputText.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Özetleniyor...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Özetle
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                AI Özeti
              </CardTitle>
              <CardDescription>Yapay zeka tarafından oluşturulan özet</CardDescription>
            </CardHeader>
            <CardContent>
              {summary ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{summary}</p>
                  </div>

                  <div className="flex items-center justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(summary)}
                      className="hover:bg-blue-50"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Kopyala
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg mb-2">Özet burada görünecek</p>
                  <p className="text-sm">Metninizi girin ve "Özetle" butonuna tıklayın</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="text-center p-6 border-0 bg-white/60 backdrop-blur">
            <Zap className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Hızlı İşlem</h3>
            <p className="text-sm text-gray-600">Saniyeler içinde profesyonel özetler</p>
          </Card>

          <Card className="text-center p-6 border-0 bg-white/60 backdrop-blur">
            <FileText className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Akıllı Analiz</h3>
            <p className="text-sm text-gray-600">Ana noktaları otomatik tespit</p>
          </Card>

          <Card className="text-center p-6 border-0 bg-white/60 backdrop-blur">
            <Sparkles className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Ücretsiz</h3>
            <p className="text-sm text-gray-600">Sınırsız ve ücretsiz kullanım</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
