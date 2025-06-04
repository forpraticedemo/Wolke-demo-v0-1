import { Avatar } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownLeft, ArrowUpRight, CreditCard, ShoppingBag, Utensils } from "lucide-react"

const transactions = [
  {
    id: "1",
    type: "支出",
    name: "スーパーマーケット",
    amount: -8750,
    date: "2025/06/03",
    icon: <ShoppingBag className="h-4 w-4" />,
  },
  {
    id: "2",
    type: "支出",
    name: "レストラン",
    amount: -12500,
    date: "2025/06/02",
    icon: <Utensils className="h-4 w-4" />,
  },
  {
    id: "3",
    type: "入金",
    name: "給与振込",
    amount: 325000,
    date: "2025/06/01",
    icon: <ArrowDownLeft className="h-4 w-4" />,
  },
  {
    id: "4",
    type: "支出",
    name: "公共料金",
    amount: -15800,
    date: "2025/05/30",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    id: "5",
    type: "送金",
    name: "田中さんへ送金",
    amount: -30000,
    date: "2025/05/28",
    icon: <ArrowUpRight className="h-4 w-4" />,
  },
]

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>最近の取引</CardTitle>
        <CardDescription>直近の取引履歴</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center">
              <Avatar className="h-9 w-9 border">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                  {transaction.icon}
                </div>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{transaction.name}</p>
                <p className="text-sm text-muted-foreground">{transaction.date}</p>
              </div>
              <div className={`ml-auto font-medium ${transaction.amount > 0 ? "text-green-500" : ""}`}>
                {transaction.amount > 0 ? "+" : ""}¥{Math.abs(transaction.amount).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
