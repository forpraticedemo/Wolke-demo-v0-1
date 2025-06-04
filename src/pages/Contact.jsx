import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    contactMethod: 'email'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 模擬表單提交
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6 text-yellow-600" />,
      title: '電話諮詢',
      description: '專業投資顧問為您服務',
      contact: '02-1234-5678',
      availability: '週一至週五 9:00-18:00',
      action: '立即撥打'
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-green-600" />,
      title: 'LINE 諮詢',
      description: '加入官方 LINE 獲得即時回覆',
      contact: '@p2property',
      availability: '24小時線上服務',
      action: '加入好友'
    },
    {
      icon: <Mail className="h-6 w-6 text-purple-600" />,
      title: '電子信箱',
      description: '詳細問題請寄信給我們',
      contact: 'service@p2property.com',
      availability: '24小時內回覆',
      action: '發送郵件'
    }
  ];

  const faqItems = [
    {
      question: '最低投資金額是多少？',
      answer: '不同專案的最低投資金額不同，一般從 5 萬元到 20 萬元不等。您可以在各專案頁面查看具體要求。'
    },
    {
      question: '投資資金何時可以取回？',
      answer: '投資資金會在專案完成時返還，具體時間依照各專案的投資期限而定，通常為 12-36 個月。'
    },
    {
      question: '如何確保投資安全？',
      answer: '我們對每個專案都進行嚴格的盡職調查，包括財務審核、法律檢視和風險評估。所有專案都有相應的擔保措施。'
    },
    {
      question: '收益如何計算和發放？',
      answer: '收益按照約定的年化報酬率計算，通常按月或按季發放。具體發放方式會在投資合約中明確說明。'
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">訊息已送出</h2>
            <p className="text-gray-600 mb-6">
              感謝您的聯繫，我們會在 24 小時內回覆您的問題。
            </p>
            <Button onClick={() => setIsSubmitted(false)}>
              返回聯繫頁面
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            聯繫我們
          </h1>
          <p className="text-xl text-gray-600">
            任何問題都歡迎與我們聯繫，專業團隊為您服務
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">聯繫方式</h2>
            
            {contactMethods.map((method, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {method.icon}
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="font-medium">{method.contact}</div>
                    <div className="text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {method.availability}
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}

            {/* Office Location */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-red-600" />
                  <CardTitle className="text-lg">辦公地址</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="font-medium">台北市信義區松仁路100號 20樓</div>
                  <div className="text-gray-600">近捷運市政府站</div>
                  <div className="text-gray-500 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    週一至週五 9:00-18:00
                  </div>
                </div>
                <div className="mt-4 h-32 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-gray-500">地圖位置</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form & FAQ */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">聯繫表單</CardTitle>
                <p className="text-gray-600">
                  填寫以下表單，我們會盡快回覆您
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        姓名 *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="請輸入您的姓名"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        電話
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="請輸入您的電話"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      電子信箱 *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="請輸入您的電子信箱"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      主旨 *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value="">請選擇問題類型</option>
                      <option value="投資諮詢">投資諮詢</option>
                      <option value="開戶問題">開戶問題</option>
                      <option value="平台操作">平台操作</option>
                      <option value="收益查詢">收益查詢</option>
                      <option value="其他問題">其他問題</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      希望的聯繫方式
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="contactMethod"
                          value="email"
                          checked={formData.contactMethod === 'email'}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        電子信箱
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="contactMethod"
                          value="phone"
                          checked={formData.contactMethod === 'phone'}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        電話
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="contactMethod"
                          value="line"
                          checked={formData.contactMethod === 'line'}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        LINE
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      詳細內容 *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="請詳細描述您的問題..."
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Send className="h-4 w-4 mr-2" />
                    送出訊息
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">常見問題</CardTitle>
                <p className="text-gray-600">
                  快速找到您需要的答案
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h3 className="font-medium text-gray-900 mb-2">
                        Q: {item.question}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        A: {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
