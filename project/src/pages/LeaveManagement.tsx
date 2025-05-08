import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

const LeaveManagement: React.FC = () => {
  const [isRequestingLeave, setIsRequestingLeave] = useState(false);
  
  // Mock data for demonstration
  const leaveRequests = [
    {
      id: '1',
      type: 'Sick Leave',
      startDate: '2025-05-12',
      endDate: '2025-05-14',
      reason: 'Medical treatment and recovery',
      status: 'approved',
      approvedBy: 'John Manager',
      approvedOn: '2025-05-05',
    },
    {
      id: '2',
      type: 'Personal Leave',
      startDate: '2025-06-10',
      endDate: '2025-06-12',
      reason: 'Family event',
      status: 'pending',
    },
    {
      id: '3',
      type: 'Annual Leave',
      startDate: '2025-07-25',
      endDate: '2025-08-05',
      reason: 'Summer vacation',
      status: 'pending',
    },
    {
      id: '4',
      type: 'Emergency Leave',
      startDate: '2025-04-18',
      endDate: '2025-04-19',
      reason: 'Family emergency',
      status: 'rejected',
      rejectedBy: 'John Manager',
      rejectedOn: '2025-04-17',
      rejectionReason: 'Insufficient staffing for the requested dates'
    },
  ];

  const leaveBalance = {
    sick: { total: 12, used: 3, remaining: 9 },
    annual: { total: 20, used: 5, remaining: 15 },
    personal: { total: 5, used: 2, remaining: 3 },
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      approved: { variant: 'success', icon: <CheckCircle className="h-3 w-3 mr-1" /> },
      pending: { variant: 'warning', icon: <Clock className="h-3 w-3 mr-1" /> },
      rejected: { variant: 'destructive', icon: <XCircle className="h-3 w-3 mr-1" /> },
    };
    
    const { variant, icon } = variants[status] || variants.pending;
    
    return (
      <Badge variant={variant} className="flex items-center">
        {icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-gray-600 mt-1">
            Track and request time off, view leave history, and check leave balances.
          </p>
        </div>
        <Button 
          onClick={() => setIsRequestingLeave(!isRequestingLeave)}
          className="flex items-center"
        >
          {isRequestingLeave ? (
            <>Cancel</>
          ) : (
            <>
              <Plus className="mr-1 h-4 w-4" />
              Request Leave
            </>
          )}
        </Button>
      </div>

      {isRequestingLeave && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>New Leave Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Leave Type
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select leave type</option>
                    <option value="sick">Sick Leave</option>
                    <option value="annual">Annual Leave</option>
                    <option value="personal">Personal Leave</option>
                    <option value="emergency">Emergency Leave</option>
                  </select>
                </div>
                <div></div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Leave
                </label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Please provide details about your leave request"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setIsRequestingLeave(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Submit Request
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Sick Leave Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">
                {leaveBalance.sick.remaining} days
              </span>
              <Badge variant="success">Available</Badge>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${(leaveBalance.sick.used / leaveBalance.sick.total) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Used: {leaveBalance.sick.used} days</span>
                <span>Total: {leaveBalance.sick.total} days</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Annual Leave Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">
                {leaveBalance.annual.remaining} days
              </span>
              <Badge variant="success">Available</Badge>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${(leaveBalance.annual.used / leaveBalance.annual.total) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Used: {leaveBalance.annual.used} days</span>
                <span>Total: {leaveBalance.annual.total} days</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Personal Leave Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">
                {leaveBalance.personal.remaining} days
              </span>
              <Badge variant="success">Available</Badge>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${(leaveBalance.personal.used / leaveBalance.personal.total) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Used: {leaveBalance.personal.used} days</span>
                <span>Total: {leaveBalance.personal.total} days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Leave History & Requests</h2>
        
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaveRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{request.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                      <div className="text-sm text-gray-900">
                        {new Date(request.startDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })} - {new Date(request.endDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.ceil((new Date(request.endDate).getTime() - new Date(request.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} days
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request.reason}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(request.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.status === 'approved' && (
                      <div className="text-xs">
                        <p>Approved by {request.approvedBy}</p>
                        <p>on {new Date(request.approvedOn!).toLocaleDateString()}</p>
                      </div>
                    )}
                    {request.status === 'rejected' && (
                      <div className="text-xs">
                        <p>Rejected by {request.rejectedBy}</p>
                        <p>Reason: {request.rejectionReason}</p>
                      </div>
                    )}
                    {request.status === 'pending' && (
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" className="text-xs">
                          Cancel
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;