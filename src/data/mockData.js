// 模擬使用者資料
export const mockUsers = {
  guest: {
    id: 'guest',
    type: 'guest',
    name: '訪客',
    permissions: {
      viewPublicInfo: true,
      viewPrivateInfo: false,
      invest: false,
      borrow: false
    }
  },
  unauthorizedUser: {
    id: 'user_001',
    type: 'unauthorizedUser',
    name: '張小明',
    email: 'ming@example.com',
    phone: '0912345678',
    permissions: {
      viewPublicInfo: true,
      viewPrivateInfo: false,
      invest: false,
      borrow: false
    }
  },
  investor: {
    id: 'investor_001',
    type: 'investor',
    name: '李投資',
    email: 'investor@example.com',
    phone: '0923456789',
    permissions: {
      viewPublicInfo: true,
      viewPrivateInfo: true,
      invest: true,
      borrow: false
    },
    portfolio: {
      totalInvestment: 5000000,
      currentValue: 5250000,
      totalReturn: 250000,
      monthlyReturn: 15000
    }
  },
  borrower: {
    id: 'borrower_001',
    type: 'borrower',
    name: '王借款',
    email: 'borrower@example.com',
    phone: '0934567890',
    permissions: {
      viewPublicInfo: true,
      viewPrivateInfo: true,
      invest: false,
      borrow: true
    },
    creditScore: 750,
    borrowHistory: []
  }
};

// 當前使用者狀態
let currentUser = mockUsers.guest;

// 使用者切換功能
export const switchUser = (userType) => {
  if (mockUsers[userType]) {
    currentUser = mockUsers[userType];
    return currentUser;
  }
  return null;
};

// 獲取當前使用者
export const getCurrentUser = () => currentUser;

// 房地產專案資料
export const mockProperties = [
  {
    id: 'property_001',
    public: {
      title: '信義區豪宅開發案',
      type: '住宅大樓建設',
      area: '台北市信義區',
      status: '募集中',
      targetAmount: 50000000,
      currentAmount: 35000000,
      returnRate: 8.5,
      duration: 24,
      riskLevel: '中等',
      blurredImages: [
        '/images/property1-blur.jpg',
        '/images/property1-blur2.jpg'
      ],
      description: '位於台北市精華地段，預計建造30層住宅大樓...',
      minInvestment: 100000
    },
    private: {
      exactLocation: '台北市信義區松仁路100號',
      clearImages: [
        '/images/property1-clear.jpg',
        '/images/property1-clear2.jpg',
        '/images/property1-clear3.jpg'
      ],
      financialDetails: {
        landCost: 30000000,
        constructionCost: 15000000,
        expectedRevenue: 60000000,
        expectedProfit: 15000000
      },
      legalDocuments: [
        '土地使用權證明',
        '建築許可證',
        '環評報告'
      ],
      riskAnalysis: '詳細風險分析報告...'
    }
  },
  {
    id: 'property_002',
    public: {
      title: '桃園工業廠房案',
      type: '工業建設',
      area: '桃園市龜山區',
      status: '進行中',
      targetAmount: 30000000,
      currentAmount: 25000000,
      returnRate: 7.2,
      duration: 18,
      riskLevel: '低',
      blurredImages: [
        '/images/property2-blur.jpg'
      ],
      description: '現代化工業廠房，已有租客預訂...',
      minInvestment: 50000
    },
    private: {
      exactLocation: '桃園市龜山區工業二路50號',
      clearImages: [
        '/images/property2-clear.jpg',
        '/images/property2-clear2.jpg'
      ],
      financialDetails: {
        landCost: 18000000,
        constructionCost: 10000000,
        expectedRevenue: 35000000,
        expectedProfit: 7000000
      }
    }
  },
  {
    id: 'property_003',
    public: {
      title: '台中商辦大樓',
      type: '商業建設',
      area: '台中市西屯區',
      status: '已完成',
      targetAmount: 80000000,
      currentAmount: 80000000,
      returnRate: 9.1,
      duration: 36,
      riskLevel: '高',
      blurredImages: [
        '/images/property3-blur.jpg'
      ],
      description: '市中心商辦大樓，出租率95%...',
      minInvestment: 200000
    },
    private: {
      exactLocation: '台中市西屯區市政路200號',
      clearImages: [
        '/images/property3-clear.jpg'
      ],
      financialDetails: {
        landCost: 50000000,
        constructionCost: 25000000,
        expectedRevenue: 95000000,
        expectedProfit: 20000000
      }
    }
  }
];

// 投資記錄資料
export const mockInvestments = [
  {
    id: 'inv_001',
    userId: 'investor_001',
    propertyId: 'property_001',
    amount: 500000,
    date: '2024-01-15',
    status: '進行中',
    expectedReturn: 42500,
    currentReturn: 15000
  },
  {
    id: 'inv_002',
    userId: 'investor_001',
    propertyId: 'property_002',
    amount: 300000,
    date: '2024-02-20',
    status: '進行中',
    expectedReturn: 21600,
    currentReturn: 8000
  },
  {
    id: 'inv_003',
    userId: 'investor_001',
    propertyId: 'property_003',
    amount: 1000000,
    date: '2023-12-01',
    status: '已完成',
    expectedReturn: 91000,
    currentReturn: 91000
  }
];

// 平台統計資料
export const platformStats = {
  totalProjects: 150,
  totalInvestment: 2500000000,
  totalInvestors: 8500,
  averageReturn: 8.3,
  successRate: 96.5
};

// 獲取使用者投資記錄
export const getUserInvestments = (userId) => {
  return mockInvestments.filter(inv => inv.userId === userId);
};

// 獲取房地產詳情（根據權限）
export const getPropertyDetails = (propertyId, user = currentUser) => {
  const property = mockProperties.find(p => p.id === propertyId);
  if (!property) return null;
  
  if (user.permissions.viewPrivateInfo) {
    return { ...property.public, ...property.private };
  }
  return property.public;
};
