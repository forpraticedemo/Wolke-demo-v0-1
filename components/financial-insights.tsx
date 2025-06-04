"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const expenseData = [
  { name: "住居費", value: 85000, color: "#0ea5e9" },
  { name: "食費", value: 65000, color: "#22c55e" },
  { name: "交通費", value: 25000, color: "#f59e0b" },
  { name: "光熱費", value: 18000, color: "#8b5cf6" },
  { name: "通信費", value: 12000, color: "#ec4899" },
  { name: "娯楽費", value: 35000, color: "#f43f5e" },
  { name: "その他", value: 20000, color: "#64748b" },
]

export function FinancialInsights() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>支出分析</CardTitle>
          <CardDescription>カテゴリー別の月間支出</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>節約のヒント</CardTitle>
          <CardDescription>あなたの支出パターンに基づいた提案</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-3">
              <h3 className="font-medium">食費の削減</h3>
              <p className="text-sm text-muted-foreground">
                先月より食費が15%増加しています。自炊を増やすことで月に約¥10,000の節約が可能です。
              </p>
            </div>
            <div className="rounded-lg border p-3">
              <h3 className="font-medium">通信費の見直し</h3>
              <p className="text-sm text-muted-foreground">
                現在のプランを見直すことで、月に約¥2,000の節約ができる可能性があります。
              </p>
            </div>
            <div className="rounded-lg border p-3">
              <h3 className="font-medium">定期預金のご案内</h3>
              <p className="text-sm text-muted-foreground">
                普通預金の一部を定期預金に移すことで、年間約¥15,000の利息収入が見込めます。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
