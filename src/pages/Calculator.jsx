import { useState } from 'react';
import { Calculator, AlertTriangle, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function CalculatorPage() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(8.5);
  const [duration, setDuration] = useState(12);
  const [compoundFrequency, setCompoundFrequency] = useState('monthly');
  const [results, setResults] = useState(null);

  const calculateInvestment = () => {
    const principal = parseFloat(amount);
    const annualRate = parseFloat(rate) / 100;
    const months = parseInt(duration);
    
    let compoundingPeriods;
    let periodRate;
    
    switch (compoundFrequency) {
      case 'monthly':
        compoundingPeriods = months;
        periodRate = annualRate / 12;
        break;
      case 'quarterly':
        compoundingPeriods = months / 3;
        periodRate = annualRate / 4;
        break;
      case 'annually':
        compoundingPeriods = months / 12;
        periodRate = annualRate;
        break;
      default:
        compoundingPeriods = months;
        periodRate = annualRate / 12;
    }

    // 複利計算公式: A = P(1 + r)^n
    const finalAmount = principal * Math.pow(1 + periodRate, compoundingPeriods);
    const totalReturn = finalAmount - principal;
    const monthlyReturn = totalReturn / months;
    const roi = (totalReturn / principal) * 100;

    setResults({
      principal,
      finalAmount,
      totalReturn,
      monthlyReturn,
      roi,
      duration: months
    });
  };

  const compoundFrequencyOptions = [
    { value: 'monthly', label: '每月複利' },
    { value: 'quarterly', label: '每季複利' },
    { value: 'annually', label: '每年複利' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Calculator className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            投資收益計算器
          </h1>
          <p className="text-xl text-gray-600">
            計算您的投資收益，做出明智的投資決策
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>投資參數設定</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  投資金額 (NT$)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="請輸入投資金額"
                  min="10000"
                  step="10000"
                />
                <p className="text-xs text-gray-500 mt-1">最低投資金額 NT$10,000</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  年化報酬率 (%)
                </label>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="請輸入年化報酬率"
                  min="0"
                  max="20"
                  step="0.1"
                />
                <p className="text-xs text-gray-500 mt-1">一般房地產投資報酬率在 6-12% 之間</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  投資期限 (月)
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="請輸入投資期限"
                  min="1"
                  max="120"
                />
                <p className="text-xs text-gray-500 mt-1">投資期限通常為 12-36 個月</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  複利計算頻率
                </label>
                <select
                  value={compoundFrequency}
                  onChange={(e) => setCompoundFrequency(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {compoundFrequencyOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <Button 
                onClick={calculateInvestment}
                className="w-full"
                size="lg"
              >
                計算收益
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle>計算結果</CardTitle>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">初始投資</div>
                      <div className="text-2xl font-bold text-blue-600">
                        ${results.principal.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">最終金額</div>
                      <div className="text-2xl font-bold text-green-600">
                        ${Math.round(results.finalAmount).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">總收益</div>
                      <div className="text-xl font-bold text-purple-600">
                        ${Math.round(results.totalReturn).toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">月平均收益</div>
                      <div className="text-xl font-bold text-orange-600">
                        ${Math.round(results.monthlyReturn).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">投資報酬率</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {results.roi.toFixed(2)}%
                    </div>
                    <div className="text-sm text-gray-500">
                      {results.duration} 個月投資期間
                    </div>
                  </div>

                  {/* Investment Breakdown */}
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-3">投資摘要</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">投資本金</span>
                        <span>${results.principal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">預期收益</span>
                        <span className="text-green-600">+${Math.round(results.totalReturn).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-medium border-t pt-2">
                        <span>總計</span>
                        <span>${Math.round(results.finalAmount).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calculator className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>請設定投資參數並點擊計算收益</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Risk Warning */}
        <Card className="mt-8 border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-yellow-800">
              <AlertTriangle className="h-5 w-5" />
              <span>投資風險提醒</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-yellow-800">
            <ul className="space-y-2 text-sm">
              <li>• 本計算器僅供參考，實際投資收益可能因市場狀況而有所不同</li>
              <li>• 房地產投資存在市場風險，過往表現不代表未來收益</li>
              <li>• 投資前請詳細了解專案詳情，評估自身風險承受能力</li>
              <li>• 建議分散投資，不要將所有資金投入單一專案</li>
              <li>• 如有疑問，請諮詢專業投資顧問</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
