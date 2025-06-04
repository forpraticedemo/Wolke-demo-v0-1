import { CreditCard, DollarSign, Download, Send, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountBalance } from "@/components/account-balance"
import { RecentTransactions } from "@/components/recent-transactions"
import { QuickActions } from "@/components/quick-actions"
import { FinancialInsights } from "@/components/financial-insights"

export default function BankingDashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6" />
            <h1 className="text-lg font-semibold">オンラインバンキング</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm">
              ヘルプ
            </Button>
            <Button size="sm">ログアウト</Button>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">普通預金</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥1,234,567</div>
                <p className="text-xs text-muted-foreground">前月比 +¥24,500 (2.1%)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">定期預金</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥2,500,000</div>
                <p className="text-xs text-muted-foreground">金利 0.05% (年間)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">投資口座</CardTitle>
                <Send className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥3,750,000</div>
                <p className="text-xs text-muted-foreground">前月比 +¥125,000 (3.4%)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">総資産</CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥7,484,567</div>
                <p className="text-xs text-muted-foreground">前月比 +¥149,500 (2.0%)</p>
              </CardContent>
            </Card>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">概要</TabsTrigger>
              <TabsTrigger value="transactions">取引履歴</TabsTrigger>
              <TabsTrigger value="insights">分析</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <AccountBalance />
              <QuickActions />
            </TabsContent>
            <TabsContent value="transactions" className="space-y-4">
              <RecentTransactions />
            </TabsContent>
            <TabsContent value="insights" className="space-y-4">
              <FinancialInsights />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
