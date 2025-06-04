import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Users, TrendingUp, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { switchUser } from '../data/mockData';

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLineLogin = () => {
    setIsLoading(true);
    // 模擬 LINE 登入流程
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      // 預設登入為投資人身份
      switchUser('investor');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 2000);
  };

  const benefits = [
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: '豐富投資機會',
      description: '存取完整的房地產投資專案，享受多元化投資選擇'
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: '專業風險評估',
      description: '查看詳細的財務資料和風險分析報告'
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: '專屬投資顧問',
      description: '獲得一對一的專業投資建議和客戶服務'
    }
  ];

  const steps = [
    {
      step: '1',
      title: 'LINE 登入',
      description: '使用您的 LINE 帳號快速登入平台'
    },
    {
      step: '2',
      title: '身份驗證',
      description: '完成身份證明和風險評估問卷'
    },
    {
      step: '3',
      title: '開始投資',
      description: '選擇適合的專案，開始您的投資之旅'
    }
  ];

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">登入成功！</h2>
            <p className="text-gray-600 mb-4">
              歡迎加入我們的投資平台
            </p>
            <div className="text-sm text-gray-500">
              正在為您導向儀表板...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            開始您的投資之旅
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            註冊成為會員，解鎖完整的投資功能和專案資訊
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Login Form */}
          <div>
            <Card className="max-w-md mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">會員登入</CardTitle>
                <p className="text-gray-600">
                  使用 LINE 帳號快速登入，安全又便利
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button
                  onClick={handleLineLogin}
                  disabled={isLoading}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg"
                  size="lg"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>登入中...</span>
                    </div>
                  ) : (
                    <>
                      <MessageCircle className="h-5 w-5 mr-2" />
                      使用 LINE 登入
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">或</span>
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">
                    還沒有帳號？
                  </p>
                  <Button variant="outline" className="w-full">
                    立即註冊
                  </Button>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  登入即表示您同意我們的
                  <a href="#" className="text-blue-600 hover:underline">服務條款</a>
                  和
                  <a href="#" className="text-blue-600 hover:underline">隱私政策</a>
                </div>
              </CardContent>
            </Card>

            {/* Demo Users */}
            <Card className="max-w-md mx-auto mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Demo 測試帳號</CardTitle>
                <p className="text-sm text-gray-600">
                  您可以使用導覽列的用戶切換功能體驗不同權限
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">訪客</span>
                    <span>基本瀏覽權限</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">未授權用戶</span>
                    <span>已註冊但未開戶</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">投資人</span>
                    <span>完整投資功能</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">借款人</span>
                    <span>借款相關功能</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benefits & Process */}
          <div className="space-y-8">
            {/* Benefits */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                會員專屬優勢
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Steps */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                開戶流程
              </h2>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                    {index < steps.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">需要協助？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  如果您在登入或註冊過程中遇到任何問題，我們的客服團隊隨時為您服務。
                </p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    LINE 客服
                  </Button>
                  <Button variant="outline" size="sm">
                    電話諮詢
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
