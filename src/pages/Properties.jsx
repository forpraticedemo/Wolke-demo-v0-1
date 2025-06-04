import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { mockProperties, getCurrentUser } from '../data/mockData';

export default function Properties() {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [filter, setFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const properties = mockProperties;

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  const filteredProperties = properties.filter(property => {
    const typeMatch = filter === 'all' || property.public.type.includes(filter);
    const statusMatch = statusFilter === 'all' || property.public.status === statusFilter;
    return typeMatch && statusMatch;
  });

  const getVisibleData = (property) => {
    if (currentUser.permissions.viewPrivateInfo) {
      return { ...property.public, ...property.private };
    }
    return property.public;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            投資專案
          </h1>
          <p className="text-xl text-gray-600">
            瀏覽我們精選的房地產投資機會
          </p>
          
          {/* User Permission Notice */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2">
              {currentUser.permissions.viewPrivateInfo ? (
                <Eye className="h-5 w-5 text-blue-600" />
              ) : (
                <EyeOff className="h-5 w-5 text-gray-500" />
              )}
              <span className="text-sm">
                {currentUser.permissions.viewPrivateInfo 
                  ? '您可以查看所有詳細資訊和高解析度圖片' 
                  : '登入並獲得授權後可查看詳細資訊'}
              </span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <span className="font-medium">篩選條件</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                專案類型
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">全部類型</option>
                <option value="住宅">住宅建設</option>
                <option value="工業">工業建設</option>
                <option value="商業">商業建設</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                專案狀態
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">全部狀態</option>
                <option value="募集中">募集中</option>
                <option value="進行中">進行中</option>
                <option value="已完成">已完成</option>
              </select>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => {
            const visibleData = getVisibleData(property);
            const progressPercentage = (property.public.currentAmount / property.public.targetAmount) * 100;

            return (
              <Card key={property.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center relative">
                    {currentUser.permissions.viewPrivateInfo ? (
                      <span className="text-gray-500">高解析度圖片</span>
                    ) : (
                      <>
                        <span className="text-gray-500">模糊圖片</span>
                        <div className="absolute inset-0 bg-white bg-opacity-50 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <EyeOff className="h-8 w-8 text-gray-400" />
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{property.public.title}</CardTitle>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      property.public.status === '募集中' ? 'bg-green-100 text-green-800' :
                      property.public.status === '進行中' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {property.public.status}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <div>{property.public.type}</div>
                    <div>
                      {currentUser.permissions.viewPrivateInfo && visibleData.exactLocation
                        ? visibleData.exactLocation
                        : property.public.area}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">年化報酬率</span>
                      <span className="font-semibold text-green-600">
                        {property.public.returnRate}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">投資期限</span>
                      <span className="font-semibold">{property.public.duration} 個月</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">風險等級</span>
                      <span className={`font-semibold ${
                        property.public.riskLevel === '低' ? 'text-green-600' :
                        property.public.riskLevel === '中等' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {property.public.riskLevel}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">最低投資</span>
                      <span className="font-semibold">
                        ${property.public.minInvestment.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>募集進度</span>
                      <span>{progressPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>${property.public.currentAmount.toLocaleString()}</span>
                      <span>${property.public.targetAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button asChild className="w-full">
                      <Link to={`/property/${property.id}`}>查看詳情</Link>
                    </Button>
                    
                    {currentUser.permissions.invest && property.public.status === '募集中' && (
                      <Button variant="outline" className="w-full">
                        立即投資
                      </Button>
                    )}
                  </div>

                  {!currentUser.permissions.viewPrivateInfo && (
                    <div className="mt-3 p-2 bg-yellow-50 rounded text-xs text-yellow-800">
                      登入並獲得授權後可查看詳細財務資料和清晰圖片
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">沒有符合條件的專案</div>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setFilter('all');
                setStatusFilter('all');
              }}
            >
              清除篩選
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
