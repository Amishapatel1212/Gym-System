export const dummyMembers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-0101',
    joinDate: '2024-01-15',
    status: 'active',
    plan: 'Premium',
    lastVisit: '2024-11-14'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '555-0102',
    joinDate: '2024-02-20',
    status: 'active',
    plan: 'Standard',
    lastVisit: '2024-11-13'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '555-0103',
    joinDate: '2024-03-10',
    status: 'inactive',
    plan: 'Basic',
    lastVisit: '2024-10-15'
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '555-0104',
    joinDate: '2024-04-05',
    status: 'active',
    plan: 'Premium',
    lastVisit: '2024-11-14'
  },
];

export const dummyPlans = [
  {
    id: 1,
    name: 'Basic',
    price: 29,
    duration: 1,
    features: ['Gym access', 'Locker room', '1 guest pass/month']
  },
  {
    id: 2,
    name: 'Standard',
    price: 49,
    duration: 3,
    features: ['Gym access', 'Locker room', 'Group classes', '4 guest passes/month']
  },
  {
    id: 3,
    name: 'Premium',
    price: 79,
    duration: 12,
    features: ['Gym access', 'Personal training', 'Nutrition plan', 'Unlimited guest passes']
  },
];

export const dummyAttendance = [
  {
    id: 1,
    memberId: 1,
    memberName: 'John Doe',
    checkIn: '2024-11-14 07:30 AM',
    checkOut: '2024-11-14 08:45 AM',
    planStatus: 'Active',
    expiryDate: '2025-02-15'
  },
  {
    id: 2,
    memberId: 2,
    memberName: 'Jane Smith',
    checkIn: '2024-11-14 06:00 AM',
    checkOut: '2024-11-14 07:15 AM',
    planStatus: 'Active',
    expiryDate: '2025-03-20'
  },
  {
    id: 3,
    memberId: 3,
    memberName: 'Mike Johnson',
    checkIn: '2024-11-12 05:30 PM',
    checkOut: '2024-11-12 06:45 PM',
    planStatus: 'Expired',
    expiryDate: '2024-10-15'
  },
];

export const dashboardStats = {
  totalMembers: 1248,
  activeMembers: 892,
  monthlyRevenue: 45230,
  pendingPayments: 3450
};

export const chartData = [
  { month: 'Jan', members: 400, revenue: 2400 },
  { month: 'Feb', members: 520, revenue: 2210 },
  { month: 'Mar', members: 680, revenue: 2290 },
  { month: 'Apr', members: 750, revenue: 2000 },
  { month: 'May', members: 820, revenue: 2181 },
  { month: 'Jun', members: 892, revenue: 2500 },
];

export const activityFeed = [
  { id: 1, action: 'New member registered', member: 'Alex Brown', time: '2 hours ago' },
  { id: 2, action: 'Payment received', member: 'John Doe', time: '1 hour ago' },
  { id: 3, action: 'Plan upgraded', member: 'Jane Smith', time: '30 minutes ago' },
  { id: 4, action: 'Membership expired', member: 'Mike Johnson', time: '15 minutes ago' },
];
