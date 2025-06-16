import React, { useEffect, useState } from 'react';
import { Search, MoreHorizontal, ArrowUpRight, ArrowDownRight, RefreshCw, Monitor, Tablet, Smartphone, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Sidebar } from '../widgets/layout/sidebar';
import axios from 'axios';
import {
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { parseISO, format, addMonths, isBefore, isSameMonth,subMonths, addDays, isSameDay, addYears } from 'date-fns';
import { useLoading, Audio } from '@agney/react-loading';
import moment from "moment";

export function DashboardOverview() {
  const today = new Date();
  const sixMonthsAgo = subMonths(today, 5);
  const [isSync, setIsSync] = useState(false);
  const [dashboardData, setDashboardData] = useState('');
  const [salesData, setSalesData] = useState([]);
  const [userRegistrationFilter, setUserRegistrationFilter] = useState('bulan'); // Default filter
  const [userRegistationStartDate, setUserRegistrationStartDate] = useState(format(sixMonthsAgo, "yyyy-MM-dd"));
  const [userRegistrationEndDate, setUserRegistrationEndDate] = useState(format(today, "yyyy-MM-dd"));
  const [jenisFilter, setJenisFilter] = useState('Pengeluaran'); // Default jenis filter
  const [loading, setLoading] = useState(true);
  const [jenisKategoriData, setJenisKategoriData] = useState([]);
  const [userReg, setUserReg] = useState([])
  const [dataKey, setDataKey] = useState("")


  const generateSalesData = (groupedData, startDate, endDate) => {
    const sales = [];
    let current = startDate;

    const useDayFormat = userRegistrationFilter === 'hari';
    const useYearFormat = userRegistrationFilter === 'tahun';

    if (useDayFormat) {
      setDataKey("day");
    } else if (useYearFormat) {
      setDataKey("year");
    } else {
      setDataKey("month");
    }

    console.log(dataKey)

    while (
      isBefore(current, endDate) ||
      (useDayFormat ? isSameDay(current, endDate) : isSameMonth(current, endDate))
    ) {
      const key = format(current, useDayFormat ? 'yyyy-MM-dd' : 'yyyy-MM');
      const value = groupedData[key] || 0;

      if (useDayFormat) {
        sales.push({
          day: format(current, 'dd MMM'),
          value,
        });
        current = addDays(current, 1);
      } else if (useYearFormat) {
        sales.push({
          year: format(current, 'yyyy'),
          value,
        });
        current = addYears(current, 1);
      } else {
        sales.push({
          month: format(current, 'MMM'),
          value,
        });
        current = addMonths(current, 1);
      }
    }

    return sales;
  };



  function getRandomBrightColor() {
    const hue = Math.floor(Math.random() * 360); // warna 0–359 derajat
    const saturation = 90 + Math.random() * 10; // saturasi tinggi: 90–100%
    const lightness = 60 + Math.random() * 10;  // terang: 60–70%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }


 const getDashboardData = () => {
  setLoading(true);
  try {
    axios
      .get(import.meta.env.VITE_API_BASE + `/getDashbaoardAnalytics/admin?userRegistration=${userRegistrationFilter}&startDate=${userRegistationStartDate}&endDate=${userRegistrationEndDate}&jenis=${jenisFilter}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'If-Modified-Since': '0',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
      })
      .then((response) => {
        if (response.data.isSucces) {
          const newDashboardData = response.data.data; // Simpan dalam variable
          setDashboardData(newDashboardData);
          console.log(response.data);

          // Gunakan newDashboardData, bukan dashboardData
          if (newDashboardData.userRegistrationData?.groupedRegistrations) {
            const sales = generateSalesData(
              newDashboardData.userRegistrationData.groupedRegistrations, 
              userRegistationStartDate, 
              userRegistrationEndDate
            );
            setSalesData(sales);
            console.log('Sales data processed successfully', sales);
          }

          if (newDashboardData.totalEachKategori) {
            const jenisKategori = Object.entries(newDashboardData.totalEachKategori).map(([jenis, total]) => ({
              name: jenis,
              value: total,
              color: getRandomBrightColor(),
            }));

            setJenisKategoriData(jenisKategori);
            console.log('Jenis Kategori data processed successfully', jenisKategori);
          }
          
          console.log(newDashboardData.userRegistrationData.userReg);
          setUserReg(newDashboardData.userRegistrationData.userReg);

        } else {
          console.error('Failed to fetch dashboard data', response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching dashboard data', error);
      });
  } catch(error) {
    console.error('Error in getDashboardData:', error);
  } finally {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Kurangi delay jadi 1 detik
  }
};

  const latestProducts = [
    {
      id: 1,
      name: 'Soja & Co. Eucalyptus',
      image: '/api/placeholder/40/40',
      updatedDate: 'Mar 8, 2024'
    },
    {
      id: 2,
      name: 'Necessaire Body Lotion',
      image: '/api/placeholder/40/40',
      updatedDate: 'Mar 8, 2024'
    },
    {
      id: 3,
      name: 'Ritual of Sakura',
      image: '/api/placeholder/40/40',
      updatedDate: 'Mar 8, 2024'
    },
    {
      id: 4,
      name: 'Lancome Rouge',
      image: '/api/placeholder/40/40',
      updatedDate: 'Mar 8, 2024'
    },
    {
      id: 5,
      name: 'Erbology Aloe Vera',
      image: '/api/placeholder/40/40',
      updatedDate: 'Mar 8, 2024'
    }
  ];

  const latestOrders = [
    { id: 'ORD-007', customer: 'Ekaterina Tankova', date: 'Mar 8, 2024', status: 'Pending' },
    { id: 'ORD-006', customer: 'Cao Yu', date: 'Mar 8, 2024', status: 'Delivered' },
    { id: 'ORD-004', customer: 'Alexa Richardson', date: 'Mar 8, 2024', status: 'Refunded' },
    { id: 'ORD-003', customer: 'Anje Keizer', date: 'Mar 8, 2024', status: 'Pending' },
    { id: 'ORD-002', customer: 'Clarke Gillebert', date: 'Mar 8, 2024', status: 'Delivered' },
    { id: 'ORD-001', customer: 'Adam Denisov', date: 'Mar 8, 2024', status: 'Delivered' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Refunded':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSync = () => {
    setIsSync(true);
    setTimeout(() => setIsSync(false), 1000);
  };

  // Initial load
  useEffect(() => {
    getDashboardData();
  }, []); // Run sekali saat mount

  // Update saat filter berubah
  useEffect(() => {
    if (userRegistrationFilter && userRegistationStartDate && userRegistrationEndDate && jenisFilter) {
      getDashboardData();
    }
  }, [userRegistrationFilter, userRegistationStartDate, userRegistrationEndDate, jenisFilter]);

  const { containerProps, indicatorEl } = useLoading({
      loading: true,
      indicator: <Audio width="50" />,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gray-100">
        <div {...containerProps} className="flex items-center justify-center">
          {indicatorEl}
        </div>
      </div>
    );
  }else{
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">

        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Budget Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Coming Soon</div>
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold">$</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">Coming Soon</div>
              <div className="flex items-center text-sm">
                <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">12%</span>
                <span className="text-gray-500 ml-2">Since last month</span>
              </div>
            </div>

            {/* Total Customers Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Users</div>
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">👥</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{dashboardData? dashboardData.userRegistrationData.totalUsers : 0 }</div>
              <div className="flex items-center text-sm">
                <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                <span className="text-red-500 font-medium">16%</span>
                <span className="text-gray-500 ml-2">Since last month</span>
              </div>
            </div>

            {/* Task Progress Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Coming Soon</div>
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">=</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">Coming Soon</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75.5%' }}></div>
              </div>
            </div>

            {/* Total Profit Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Coming Soon</div>
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">💬</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">Coming Soon</div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Sales Chart */}
            <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">

                <h3 className="text-lg font-semibold text-gray-900">User Registration</h3>
                <button
                  onClick={handleSync}
                  className={`flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors ${isSync ? 'animate-spin' : ''}`}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Sync</span>
                </button>
              </div>
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="w-full lg:w-1/3">
                  <label className="block mb-1 text-sm font-medium text-gray-700">Filter By</label>
                  <Select
                    value={userRegistrationFilter}
                    onChange={(val) => setUserRegistrationFilter(val)}  // val langsung string-nya
                    className="w-full"
                  >
                    <Option value="hari">Daily</Option>
                    <Option value="bulan">Monthly</Option>
                    <Option value="tahun">Yearly</Option>
                  </Select>

                </div>

                <div className="w-full lg:w-1/3">
                  <label className="block mb-1 text-sm font-medium text-gray-700">Start Date</label>
                  <Input
                    type="date"
                    value={userRegistationStartDate}
                    onChange={(e) => setUserRegistrationStartDate(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="w-full lg:w-1/3">
                  <label className="block mb-1 text-sm font-medium text-gray-700">End Date</label>
                  <Input
                    type="date"
                    value={userRegistrationEndDate}
                    onChange={(e) => setUserRegistrationEndDate(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="h-80">
                {salesData.length > 0 && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <XAxis
                      dataKey={dataKey}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                )}
              </div>

              {/* Bottom Section */}
          <div className=" mt-20">
            {/* Latest Products */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Latest User Registration</h3>
                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors">
                  <span className="text-sm font-medium">View all</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {userReg.map((user) => (
                  <div key={user.userId} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">IMG</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.email}</div>
                        <div className="text-xs text-gray-500">Registration on {moment(new Date(user.createdAt._seconds * 1000)).format("YYYY-MM-DD HH:mm")}</div>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Orders */}
            {/* <div className="bg-white rounded-lg p-6 shadow-sm   ">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Latest orders</h3>
                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors">
                  <span className="text-sm font-medium">View all</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="pb-3">Order</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {latestOrders.map((order, index) => (
                      <tr key={order.id} className={index !== latestOrders.length - 1 ? 'border-b border-gray-100' : ''}>
                        <td className="py-3 text-sm font-medium text-blue-600">{order.id}</td>
                        <td className="py-3 text-sm text-gray-900">{order.customer}</td>
                        <td className="py-3 text-sm text-gray-500">{order.date}</td>
                        <td className="py-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div> */}
          </div>
            </div>

            {/* Traffic Source Chart */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic source</h3>
                <label className="block mb-1 text-sm font-medium text-gray-700">Jenis Kategori</label>
                  <Select
                    value={jenisFilter}
                    onChange={(val) => setJenisFilter(val)}  // val langsung string-nya
                    className="w-full"
                  >
                    <Option value="Pemasukan">Pemasukan</Option>
                    <Option value="Pengeluaran">Pengeluaran</Option>
                  </Select>
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-60 h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={jenisKategoriData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {jenisKategoriData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="space-y-4">
                {jenisKategoriData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-600">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          

          {/* Overview Link */}
          <div className="flex justify-end mt-6">
            <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors">
              <span className="text-sm font-medium">Overview</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
}

export default DashboardOverview;