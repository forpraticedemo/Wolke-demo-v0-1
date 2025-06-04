import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Menu, X, User } from 'lucide-react';
import { Button } from './ui/button';
import { getCurrentUser, switchUser } from '../data/mockData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const location = useLocation();

  const handleUserSwitch = (userType) => {
    const user = switchUser(userType);
    setCurrentUser(user);
  };

  const navigation = [
    { name: '首頁', href: '/' },
    { name: '投資專案', href: '/properties' },
    { name: '投資計算器', href: '/calculator' },
    { name: '關於我們', href: '/about' },
    { name: '聯繫我們', href: '/contact' },
  ];

  if (currentUser.type !== 'guest') {
    navigation.push({ name: '我的儀表板', href: '/dashboard' });
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">房投平台</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Menu & Login */}
          <div className="hidden md:flex items-center space-x-4">
            {/* User Switch for Demo */}
            <select
              value={currentUser.type}
              onChange={(e) => handleUserSwitch(e.target.value)}
              className="text-sm border rounded px-2 py-1"
            >
              <option value="guest">訪客</option>
              <option value="unauthorizedUser">未授權用戶</option>
              <option value="investor">投資人</option>
              <option value="borrower">借款人</option>
            </select>

            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-700">{currentUser.name}</span>
            </div>

            {currentUser.type === 'guest' ? (
              <Button asChild>
                <Link to="/login">登入</Link>
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => handleUserSwitch('guest')}
              >
                登出
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.href
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2 border-t">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700">{currentUser.name}</span>
                </div>
                <select
                  value={currentUser.type}
                  onChange={(e) => handleUserSwitch(e.target.value)}
                  className="w-full text-sm border rounded px-2 py-1 mb-2"
                >
                  <option value="guest">訪客</option>
                  <option value="unauthorizedUser">未授權用戶</option>
                  <option value="investor">投資人</option>
                  <option value="borrower">借款人</option>
                </select>
                {currentUser.type === 'guest' ? (
                  <Button asChild className="w-full">
                    <Link to="/login">登入</Link>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleUserSwitch('guest')}
                  >
                    登出
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
