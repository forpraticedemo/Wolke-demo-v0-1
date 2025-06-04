import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  User, 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  History,
  Building2,
  ArrowUpRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { getCurrentUser, getUserInvestments, mockProperties } from '../data/mockData';

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [userInvestments, setUserInvestments] = useState([]);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    
    if (user.type !== 'guest') {
      const investments = getUserInvestments(user.id);
      setUserInvestments(investments);
    }
  }, []);

  // 如果用戶未登入，重定向到登入頁面
  if (currentUser.type === 'guest') {
    return <Navigate to="/login" replace />;
  }

  // 計算投資統計
  const investmentStats = userInvestments.reduce((stats, investment) => {
    stats.totalInvestment += investment.amount;
    stats.currentReturn += investment.currentReturn;
    stats.expectedReturn += investment.expectedReturn;
    
    if (investment.status === '進行中') {
      stats.activeInvestments += 1;
    } else if (investment.status === '已完成') {
      stats.completedInvestments += 1;
    }
    
    return stats;
  }, {
    totalInvestment: 0,
    currentReturn: 0,
    expectedReturn: 0,
    activeInvestments: 0,
    completedInvestments: 0
  });

  const currentValue = investmentStats.totalInvestment + investmentStats.currentReturn;
  const returnRate = investmentStats.totalInvestment > 0 
    ? ((investmentStats.currentReturn / investmentStats.totalInvestment) * 100).toFixed(2)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <User className="h-8 w-8 text-yellow-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                歡迎回來，{currentUser.name}
              </h1>
              <p className="text-gray-600">
                {currentUser.type === 'investor' ? '投資人' : '借款人'} · 
                {currentUser.email}
              </p>
            </div>
          </div>
          
          {/* Permission Status */}
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">帳戶狀態</h3>
                <p className="text-sm text-gray-600">
                  {currentUser.permissions.invest 
                    ? '✅ 已獲得投資權限' 
                    : '⚠️ 尚未獲得投資權限，請聯繫客服完成開戶程序'}
                </p>
              </div>
              {!currentUser.permissions.invest && (
                <Button variant="outline">
                  聯繫客服
                </Button>
              )}
            </div>
          </div>
        </div>

        {currentUser.type === 'investor' && (
          <>
            {/* Investment Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">總投資金額</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${investmentStats.totalInvestment.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {userInvestments.length} 個投資項目
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">當前價值</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${currentValue.toLocaleString()}
                  </div>
                  <p className="text-xs text-green-600 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +{returnRate}%
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">已實現收益</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    +${investmentStats.currentReturn.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    預期總收益 ${investmentStats.expectedReturn.toLocaleString()}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">進行中專案</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {investmentStats.activeInvestments}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    已完成 {investmentStats.completedInvestments} 個
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Tabs */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">投資概覽</TabsTrigger>
                <TabsTrigger value="transactions">交易記錄</TabsTrigger>
                <TabsTrigger value="profile">個人資料</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Portfolio Performance */}
                  <Card>
                    <CardHeader>
                      <CardTitle>投資組合表現</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="text-sm text-gray-600">總投資金額</span>
                          <span className="font-medium">${investmentStats.totalInvestment.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                          <span className="text-sm text-gray-600">已實現收益</span>
                          <span className="font-medium text-green-600">+${investmentStats.currentReturn.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                          <span className="text-sm text-gray-600">當前總價值</span>
                          <span className="font-medium text-yellow-600">${currentValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                          <span className="text-sm text-gray-600">整體報酬率</span>
                          <span className="font-medium text-purple-600">{returnRate}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle>最近活動</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {userInvestments.slice(0, 3).map((investment) => {
                          const property = mockProperties.find(p => p.id === investment.propertyId);
                          return (
                            <div key={investment.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                              <Building2 className="h-8 w-8 text-yellow-600" />
                              <div className="flex-1">
                                <div className="font-medium text-sm">
                                  {property?.public.title || '專案'}
                                </div>
                                <div className="text-xs text-gray-500">
                                  投資 ${investment.amount.toLocaleString()} · {investment.date}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium text-green-600">
                                  +${investment.currentReturn.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500">{investment.status}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="transactions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <History className="h-5 w-5" />
                      <span>交易記錄</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userInvestments.map((investment) => {
                        const property = mockProperties.find(p => p.id === investment.propertyId);
                        return (
                          <div key={investment.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-medium">{property?.public.title}</h4>
                                <p className="text-sm text-gray-600">{property?.public.area}</p>
                              </div>
                              <span className={`px-2 py-1 rounded text-xs ${
                                investment.status === '進行中' ? 'bg-yellow-100 text-yellow-800' :
                                investment.status === '已完成' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {investment.status}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">投資金額</span>
                                <div className="font-medium">${investment.amount.toLocaleString()}</div>
                              </div>
                              <div>
                                <span className="text-gray-600">投資日期</span>
                                <div className="font-medium">{investment.date}</div>
                              </div>
                              <div>
                                <span className="text-gray-600">當前收益</span>
                                <div className="font-medium text-green-600">
                                  +${investment.currentReturn.toLocaleString()}
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-600">預期收益</span>
                                <div className="font-medium text-purple-600">
                                  ${investment.expectedReturn.toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>個人資料</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">姓名</label>
                          <div className="mt-1 text-sm text-gray-900">{currentUser.name}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">信箱</label>
                          <div className="mt-1 text-sm text-gray-900">{currentUser.email}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">電話</label>
                          <div className="mt-1 text-sm text-gray-900">{currentUser.phone}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">會員類型</label>
                          <div className="mt-1 text-sm text-gray-900">
                            {currentUser.type === 'investor' ? '投資人' : '借款人'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <h3 className="font-medium text-gray-900 mb-2">帳戶權限</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>查看公開資訊</span>
                            <span className="text-green-600">✓ 已開通</span>
                          </div>
                          <div className="flex justify-between">
                            <span>查看私人資訊</span>
                            <span className={currentUser.permissions.viewPrivateInfo ? 'text-green-600' : 'text-red-600'}>
                              {currentUser.permissions.viewPrivateInfo ? '✓ 已開通' : '✗ 未開通'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>投資功能</span>
                            <span className={currentUser.permissions.invest ? 'text-green-600' : 'text-red-600'}>
                              {currentUser.permissions.invest ? '✓ 已開通' : '✗ 未開通'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>借款功能</span>
                            <span className={currentUser.permissions.borrow ? 'text-green-600' : 'text-red-600'}>
                              {currentUser.permissions.borrow ? '✓ 已開通' : '✗ 未開通'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}

        {currentUser.type === 'unauthorizedUser' && (
          <Card>
            <CardHeader>
              <CardTitle>完成開戶程序</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                您的帳戶尚未完成開戶程序，請聯繫我們的客服團隊完成身份驗證和風險評估。
              </p>
              <Button>聯繫客服開戶</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
