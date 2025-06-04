import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Shield, Users, Phone, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { platformStats, mockProperties } from '../data/mockData';

export default function Home() {
  const features = [
    {
      icon: <TrendingUp className="h-12 w-12 text-blue-600" />,
      title: '穩定收益',
      description: '年化報酬率平均 8.3%，為您的資金創造穩定收益'
    },
    {
      icon: <Shield className="h-12 w-12 text-green-600" />,
      title: '風險控管',
      description: '嚴格篩選優質專案，96.5% 的成功率保障您的投資'
    },
    {
      icon: <Users className="h-12 w-12 text-purple-600" />,
      title: '專業團隊',
      description: '經驗豐富的房地產專家為您把關每一個投資機會'
    }
  ];

  const hotProperties = mockProperties.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              P2P 房地產投資平台
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              連接投資人與優質房地產專案，創造雙贏投資機會
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link to="/properties">
                  探索投資機會
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link to="/calculator">投資計算器</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {platformStats.totalProjects}+
              </div>
              <div className="text-gray-600">專案總數</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                ${(platformStats.totalInvestment / 100000000).toFixed(1)}億
              </div>
              <div className="text-gray-600">累計投資金額</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                {platformStats.totalInvestors.toLocaleString()}+
              </div>
              <div className="text-gray-600">投資人數</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                {platformStats.averageReturn}%
              </div>
              <div className="text-gray-600">平均年化報酬</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              為什麼選擇我們？
            </h2>
            <p className="text-xl text-gray-600">
              三大核心優勢，為您的投資保駕護航
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Properties Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              熱門投資專案
            </h2>
            <p className="text-xl text-gray-600">
              精選優質房地產投資機會
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {hotProperties.map((property) => (
              <Card key={property.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-500">專案圖片</span>
                  </div>
                  <CardTitle className="text-lg">{property.public.title}</CardTitle>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{property.public.area}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      property.public.status === '募集中' ? 'bg-green-100 text-green-800' :
                      property.public.status === '進行中' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {property.public.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">年化報酬率</span>
                      <span className="font-semibold text-green-600">{property.public.returnRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">投資期限</span>
                      <span className="font-semibold">{property.public.duration} 個月</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">最低投資</span>
                      <span className="font-semibold">${property.public.minInvestment.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(property.public.currentAmount / property.public.targetAmount) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>已募集 ${property.public.currentAmount.toLocaleString()}</span>
                    <span>目標 ${property.public.targetAmount.toLocaleString()}</span>
                  </div>
                  <Button asChild className="w-full">
                    <Link to={`/property/${property.id}`}>查看詳情</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild size="lg" variant="outline">
              <Link to="/properties">
                查看更多專案
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            準備開始投資了嗎？
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            聯繫我們的專業團隊，獲得個人化投資建議
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Phone className="mr-2 h-5 w-5" />
              電話諮詢
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <MessageCircle className="mr-2 h-5 w-5" />
              LINE 諮詢
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
