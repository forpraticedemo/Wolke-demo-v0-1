import { Users, TrendingUp, Shield, Award, Phone, Mail, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { platformStats } from '../data/mockData';

export default function About() {
  const teamMembers = [
    {
      name: '陳執行長',
      role: '執行長',
      experience: '20年房地產經驗',
      description: '曾任知名建設公司總經理，專精於房地產開發與投資管理'
    },
    {
      name: '林技術長',
      role: '技術長',
      experience: '15年金融科技經驗',
      description: '前大型銀行數位金融部門主管，專精於金融科技創新'
    },
    {
      name: '王投資長',
      role: '投資長',
      experience: '18年投資管理經驗',
      description: '前資產管理公司投資總監，擅長風險控制與投資組合管理'
    }
  ];

  const milestones = [
    { year: '2020', event: '公司成立，獲得金融科技許可' },
    { year: '2021', event: '首個房地產專案成功募資完成' },
    { year: '2022', event: '平台用戶突破5,000人' },
    { year: '2023', event: '累計投資金額達10億元' },
    { year: '2024', event: '獲得A輪融資，擴大業務規模' }
  ];

  const advantages = [
    {
      icon: <Shield className="h-8 w-8 text-yellow-600" />,
      title: '嚴格風控',
      description: '多層級風險評估機制，確保每個專案都經過嚴格審核'
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: '穩定收益',
      description: '專注於優質房地產專案，提供穩定且具競爭力的投資報酬'
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: '專業團隊',
      description: '資深房地產與金融專家組成的專業團隊'
    },
    {
      icon: <Award className="h-8 w-8 text-orange-600" />,
      title: '合規經營',
      description: '嚴格遵循金融法規，提供透明安全的投資環境'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            關於我們
          </h1>
          <p className="text-xl md:text-2xl text-yellow-100 max-w-3xl mx-auto">
            致力於打造最專業、最透明的 P2P 房地產投資平台，為投資人與借款人創造雙贏價值
          </p>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                創新金融科技，重新定義房地產投資
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  我們是台灣領先的 P2P 房地產投資平台，成立於2020年，專注於連接有資金需求的房地產開發商與尋求穩定收益的投資人。
                </p>
                <p>
                  透過創新的金融科技解決方案，我們降低了房地產投資的門檻，讓更多人能夠參與優質的房地產投資機會，同時為開發商提供多元化的資金來源。
                </p>
                <p>
                  我們堅持透明、專業、安全的經營理念，每個專案都經過嚴格的盡職調查和風險評估，確保為所有參與者創造最大價值。
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-6 bg-yellow-50 rounded-lg">
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {platformStats.totalProjects}+
                </div>
                <div className="text-gray-600">成功專案</div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {platformStats.successRate}%
                </div>
                <div className="text-gray-600">成功率</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {platformStats.totalInvestors.toLocaleString()}+
                </div>
                <div className="text-gray-600">投資人數</div>
              </div>
              <div className="text-center p-6 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  ${(platformStats.totalInvestment / 100000000).toFixed(1)}億
                </div>
                <div className="text-gray-600">投資總額</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              我們的優勢
            </h2>
            <p className="text-xl text-gray-600">
              四大核心優勢，打造最值得信賴的投資平台
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {advantage.icon}
                  </div>
                  <CardTitle className="text-lg">{advantage.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              專業團隊
            </h2>
            <p className="text-xl text-gray-600">
              資深專家組成的領導團隊
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <div className="text-yellow-600 font-medium">{member.role}</div>
                  <div className="text-sm text-gray-500">{member.experience}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              發展歷程
            </h2>
            <p className="text-xl text-gray-600">
              見證我們的成長軌跡
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">
                    {milestone.year}
                  </div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <p className="text-gray-700">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-yellow-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              聯繫我們
            </h2>
            <p className="text-xl text-yellow-100">
              任何問題都歡迎與我們聯繫
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Phone className="h-8 w-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">電話諮詢</h3>
              <p className="text-yellow-100">02-1234-5678</p>
              <p className="text-yellow-100">週一至週五 9:00-18:00</p>
            </div>
            <div>
              <Mail className="h-8 w-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">電子信箱</h3>
              <p className="text-yellow-100">service@p2property.com</p>
              <p className="text-yellow-100">24小時內回覆</p>
            </div>
            <div>
              <MapPin className="h-8 w-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">辦公地址</h3>
              <p className="text-yellow-100">台北市信義區松仁路100號</p>
              <p className="text-yellow-100">20樓</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
