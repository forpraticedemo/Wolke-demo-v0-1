import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CreditCard, FileText, Send, Wallet } from "lucide-react"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>クイックアクション</CardTitle>
        <CardDescription>よく使う機能にすぐアクセス</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-1">
            <Send className="h-5 w-5" />
            <span>振込・送金</span>
          </Button>
          <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-1">
            <CreditCard className="h-5 w-5" />
            <span>支払い</span>
          </Button>
          <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-1">
            <FileText className="h-5 w-5" />
            <span>明細照会</span>
          </Button>
          <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-1">
            <Wallet className="h-5 w-5" />
            <span>口座管理</span>
          </Button>
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="link" size="sm" className="gap-1">
            すべての機能を見る
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
