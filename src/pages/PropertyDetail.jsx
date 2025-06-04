import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Shield, 
  DollarSign,
  Eye,
  EyeOff,
  Building2,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { getPropertyDetails, getCurrentUser } from '../data/mockData';

export default function PropertyDetail() {
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [property, setProperty] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState(100000);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    
    const propertyData = getPropertyDetails(id, user);
    setProperty(propertyData);
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">專案不存在或無法存取</p>
          <Button asChild className="mt-4">
            <Link to="/properties">返回專案列表</Link>
          </Button>
        </div>
      </div>
    );
  }

  const progressPercentage = (property.currentAmount / property.targetAmount) * 100;
  const expectedReturn = (investmentAmount * property.returnRate / 100 * property.duration / 12);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/properties">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回專案列表
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {property.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {currentUser.permissions.viewPrivateInfo && property.exactLocation
                    ? property.exactLocation
                    : property.area}
                </div>
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 mr-1" />
                  {property.type}
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  property.status === '募集中' ? 'bg-green-100 text-green-800' :
                  property.status === '進行中' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {property.status}
                </span>
              </div>
            </div>
            
            {/* Permission Notice */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center space-x-2">
                {currentUser.permissions.viewPrivateInfo ? (
                  <Eye className="h-5 w-5 text-blue-600" />
                ) : (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                )}
                <span className="text-sm">
                  {currentUser.permissions.viewPrivateInfo 
                    ? '完整資訊權限' 
                    : '基本資訊權限'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Images */}
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                  <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center relative">
                    {currentUser.permissions.viewPrivateInfo ? (
                      <span className="text-gray-500">高解析度圖片 1</span>
                    ) : (
                      <>
                        <span className="text-gray-500">模糊圖片 1</span>
                        <div className="absolute inset-0 bg-white bg-opacity-50 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <EyeOff className="h-8 w-8 text-gray-400" />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center relative">
                    {currentUser.permissions.viewPrivateInfo ? (
                      <span className="text-gray-500">高解析度圖片 2</span>
                    ) : (
                      <>
                        <span className="text-gray-500">模糊圖片 2</span>
                        <div className="absolute inset-0 bg-white bg-opacity-50 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <EyeOff className="h-8 w-8 text-gray-400" />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">專案概覽</TabsTrigger>
                <TabsTrigger value="financial">財務資料</TabsTrigger>
                <TabsTrigger value="documents">文件資料</TabsTrigger>
                <TabsTrigger value="risks">風險分析</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>專案描述</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {property.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">專案資訊</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">專案類型</span>
                            <span>{property.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">所在地區</span>
                            <span>{property.area}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">投資期限</span>
                            <span>{property.duration} 個月</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">風險等級</span>
                            <span className={`${
                              property.riskLevel === '低' ? 'text-green-600' :
                              property.riskLevel === '中等' ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {property.riskLevel}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">投資條件</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">年化報酬率</span>
                            <span className="text-green-600 font-semibold">{property.returnRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">最低投資金額</span>
                            <span>${property.minInvestment.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">目標募集金額</span>
                            <span>${property.targetAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">已募集金額</span>
                            <span>${property.currentAmount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="financial" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>財務詳情</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {currentUser.permissions.viewPrivateInfo && property.financialDetails ? (
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">投資成本</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">土地成本</span>
                                <span>${property.financialDetails.landCost.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">建設成本</span>
                                <span>${property.financialDetails.constructionCost.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between border-t pt-2">
                                <span className="font-medium">總成本</span>
                                <span className="font-medium">
                                  ${(property.financialDetails.landCost + property.financialDetails.constructionCost).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">預期收益</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">預期營收</span>
                                <span>${property.financialDetails.expectedRevenue.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">預期利潤</span>
                                <span className="text-green-600 font-semibold">
                                  ${property.financialDetails.expectedProfit.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between border-t pt-2">
                                <span className="font-medium">利潤率</span>
                                <span className="font-medium text-green-600">
                                  {((property.financialDetails.expectedProfit / property.financialDetails.expectedRevenue) * 100).toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <EyeOff className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">需要完整權限才能查看詳細財務資料</p>
                        <Button asChild className="mt-4">
                          <Link to="/login">升級權限</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>相關文件</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {currentUser.permissions.viewPrivateInfo && property.legalDocuments ? (
                      <div className="space-y-3">
                        {property.legalDocuments.map((doc, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <span className="flex-1">{doc}</span>
                            <Button variant="outline" size="sm">下載</Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">需要完整權限才能查看相關文件</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="risks" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <span>風險評估</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-medium text-yellow-800 mb-2">風險等級：{property.riskLevel}</h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          <li>• 市場風險：房地產市場波動可能影響收益</li>
                          <li>• 流動性風險：投資期間資金無法提前取回</li>
                          <li>• 建設風險：建設過程可能面臨延期或成本超支</li>
                          <li>• 法規風險：政策變化可能影響專案執行</li>
                        </ul>
                      </div>
                      
                      {currentUser.permissions.viewPrivateInfo && property.riskAnalysis && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">詳細風險分析</h4>
                          <p className="text-sm text-gray-700">{property.riskAnalysis}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Investment Card */}
            <Card>
              <CardHeader>
                <CardTitle>投資此專案</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    投資金額 (NT$)
                  </label>
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min={property.minInvestment}
                    step="10000"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    最低投資 ${property.minInvestment.toLocaleString()}
                  </p>
                </div>

                <div className="bg-blue-50 p-3 rounded">
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">預期總收益</span>
                      <span className="font-semibold text-green-600">
                        ${Math.round(expectedReturn).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">月平均收益</span>
                      <span className="font-semibold">
                        ${Math.round(expectedReturn / property.duration).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {currentUser.permissions.invest && property.status === '募集中' ? (
                  <Button className="w-full" size="lg">
                    <DollarSign className="h-4 w-4 mr-2" />
                    投資 ${investmentAmount.toLocaleString()}
                  </Button>
                ) : (
                  <div className="text-center">
                    <Button asChild className="w-full">
                      <Link to="/login">登入投資</Link>
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">
                      {property.status !== '募集中' ? '此專案已停止募集' : '需要投資權限'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle>募集進度</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{progressPercentage.toFixed(1)}% 完成</span>
                    <span className="font-medium">
                      ${(property.targetAmount - property.currentAmount).toLocaleString()} 剩餘
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center text-sm">
                    <div>
                      <div className="font-semibold text-lg text-blue-600">
                        ${property.currentAmount.toLocaleString()}
                      </div>
                      <div className="text-gray-600">已募集</div>
                    </div>
                    <div>
                      <div className="font-semibold text-lg">
                        ${property.targetAmount.toLocaleString()}
                      </div>
                      <div className="text-gray-600">目標金額</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Stats */}
            <Card>
              <CardHeader>
                <CardTitle>關鍵指標</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm">年化報酬率</span>
                    </div>
                    <span className="font-semibold text-green-600">{property.returnRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">投資期限</span>
                    </div>
                    <span className="font-semibold">{property.duration} 個月</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-purple-600" />
                      <span className="text-sm">風險等級</span>
                    </div>
                    <span className={`font-semibold ${
                      property.riskLevel === '低' ? 'text-green-600' :
                      property.riskLevel === '中等' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {property.riskLevel}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
