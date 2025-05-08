import React from 'react';
import { Calendar, Clock, CreditCard, Users, Clipboard, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const isManager = user?.role === 'manager';

  // Mock data for demonstration
  const stats = {
    totalPersonnel: 24,
    onDuty: 18,
    onLeave: 3,
    pendingLeaveRequests: 5,
    pendingLoanRequests: 2,
    dutyCompliance: 94,
  };

  const upcomingDuties = [
    { id: 1, post: 'Main Gate', date: 'Today', time: '8:00 AM - 4:00 PM' },
    { id: 2, post: 'Library', date: 'Tomorrow', time: '10:00 AM - 6:00 PM' },
    { id: 3, post: 'Admin Block', date: 'May 12, 2025', time: '9:00 AM - 5:00 PM' },
  ];

  const recentLeaves = [
    { id: 1, type: 'Sick Leave', from: 'May 5, 2025', to: 'May 7, 2025', status: 'approved' },
    { id: 2, type: 'Personal Leave', from: 'May 20, 2025', to: 'May 22, 2025', status: 'pending' },
  ];

  const alerts = [
    { id: 1, title: 'Understaffed Areas', description: 'Library area needs additional personnel this week' },
    { id: 2, title: 'Equipment Check Required', description: 'Quarterly equipment check due in 3 days' },
  ];

  const renderManagerDashboard = () => (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Personnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-7 w-7 text-primary" />
              <span className="text-2xl font-bold ml-2">{stats.totalPersonnel}</span>
            </div>
            <div className="mt-2">
              <span className="text-green-600 text-sm font-medium">
                +4% <span className="text-gray-500">from last month</span>
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">On Duty Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clipboard className="h-7 w-7 text-blue-600" />
              <span className="text-2xl font-bold ml-2">{stats.onDuty}</span>
            </div>
            <div className="mt-2">
              <span className="text-gray-600 text-sm">
                {stats.totalPersonnel - stats.onDuty} off duty
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Personnel on Leave</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-7 w-7 text-amber-600" />
              <span className="text-2xl font-bold ml-2">{stats.onLeave}</span>
            </div>
            <div className="mt-2">
              <span className="text-gray-600 text-sm">
                {stats.pendingLeaveRequests} pending requests
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Duty Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-7 w-7 text-green-600" />
              <span className="text-2xl font-bold ml-2">{stats.dutyCompliance}%</span>
            </div>
            <div className="mt-2">
              <div className="bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${stats.dutyCompliance}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="font-medium text-amber-800 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Leave Requests
                </h3>
                <div className="mt-2 divide-y divide-gray-200">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="py-3 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Alex Johnson</p>
                        <p className="text-xs text-gray-500">
                          May {10 + i} - May {12 + i}, 2025 • Sick Leave
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                          Approve
                        </button>
                        <button className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Loan Requests
                </h3>
                <div className="mt-2 divide-y divide-gray-200">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="py-3 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Sarah Miller</p>
                        <p className="text-xs text-gray-500">
                          ${5000 + i * 1000} • {15 + i * 5}% monthly deduction
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                          Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="bg-red-50 rounded-lg p-4">
                  <h3 className="font-medium text-red-800 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    {alert.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-700">{alert.description}</p>
                </div>
              ))}
              
              <div className="mt-4">
                <h3 className="font-medium text-gray-800 mb-2">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-primary text-white p-2 rounded text-sm">
                    Assign Duties
                  </button>
                  <button className="bg-secondary text-white p-2 rounded text-sm">
                    View Reports
                  </button>
                  <button className="border border-gray-300 text-gray-700 p-2 rounded text-sm col-span-2">
                    Register New Personnel
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );

  const renderSecurityDashboard = () => (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Duties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDuties.map((duty) => (
                <div key={duty.id} className="flex">
                  <div className="bg-blue-100 text-blue-800 p-2 rounded flex items-center justify-center">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{duty.post}</p>
                    <p className="text-xs text-gray-500">
                      {duty.date} • {duty.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeaves.map((leave) => (
                <div key={leave.id} className="flex">
                  <div className="bg-amber-100 text-amber-800 p-2 rounded flex items-center justify-center">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <div className="flex items-center">
                      <p className="text-sm font-medium">{leave.type}</p>
                      <Badge
                        variant={leave.status === 'approved' ? 'success' : 'warning'}
                        className="ml-2"
                      >
                        {leave.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">
                      {leave.from} to {leave.to}
                    </p>
                  </div>
                </div>
              ))}
              <button className="w-full mt-2 bg-primary hover:bg-primary-600 text-white py-2 rounded-md text-sm">
                Request Leave
              </button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800">$2,450</h3>
                <p className="text-sm text-gray-600">May 2025 Salary</p>
                <div className="mt-2 text-xs text-gray-500">
                  <p>Payment date: May 28, 2025</p>
                  <p>Status: Pending</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Loan Status</h3>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Active Loan</p>
                      <p className="text-xs text-gray-500">$3,500 remaining</p>
                    </div>
                    <Badge variant="info">12 months left</Badge>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-gray-600">Monthly deduction: $250 (10%)</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{ width: '30%' }}
                      ></div>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 bg-secondary hover:bg-secondary/90 text-white py-2 rounded-md text-sm">
                  Request Loan
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening {isManager ? 'with your security team' : 'with your schedule'} today.
        </p>
      </div>

      {isManager ? renderManagerDashboard() : renderSecurityDashboard()}
    </div>
  );
};

export default Dashboard;