import React, { useState } from 'react';
import { Calendar, Clock, MapPin, AlertCircle, Check, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

const DutyManagement: React.FC = () => {
  const [filter, setFilter] = useState('upcoming');
  
  // Mock data for demonstration
  const duties = [
    { 
      id: '1', 
      post: 'Main Gate', 
      location: 'Campus Entrance',
      date: '2025-05-10', 
      day: 'Monday',
      startTime: '08:00', 
      endTime: '16:00',
      status: 'upcoming',
      priority: 'high'
    },
    { 
      id: '2', 
      post: 'Library', 
      location: 'Central Library',
      date: '2025-05-11', 
      day: 'Tuesday',
      startTime: '10:00', 
      endTime: '18:00',
      status: 'upcoming',
      priority: 'medium'
    },
    { 
      id: '3', 
      post: 'Dormitory B', 
      location: 'West Campus',
      date: '2025-05-09', 
      day: 'Sunday',
      startTime: '22:00', 
      endTime: '06:00',
      status: 'completed',
      priority: 'medium'
    },
    { 
      id: '4', 
      post: 'Admin Block', 
      location: 'Administrative Building',
      date: '2025-05-08', 
      day: 'Saturday',
      startTime: '09:00', 
      endTime: '17:00',
      status: 'completed',
      priority: 'low'
    },
    { 
      id: '5', 
      post: 'Sports Complex', 
      location: 'North Campus',
      date: '2025-05-12', 
      day: 'Wednesday',
      startTime: '14:00', 
      endTime: '22:00',
      status: 'upcoming',
      priority: 'high'
    },
  ];

  const filteredDuties = duties.filter(duty => {
    if (filter === 'all') return true;
    return duty.status === filter;
  });

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, any> = {
      high: { variant: 'destructive', icon: <AlertCircle className="h-3 w-3 mr-1" /> },
      medium: { variant: 'warning', icon: <Clock className="h-3 w-3 mr-1" /> },
      low: { variant: 'info', icon: <Check className="h-3 w-3 mr-1" /> },
    };
    
    const { variant, icon } = variants[priority] || variants.medium;
    
    return (
      <Badge variant={variant} className="flex items-center">
        {icon}
        {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
      </Badge>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Duty Management</h1>
        <p className="text-gray-600 mt-1">
          View and manage your assigned duties, schedules, and posts.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setFilter('upcoming')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                filter === 'upcoming'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upcoming Duties
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                filter === 'completed'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Completed Duties
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                filter === 'all'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Duties
            </button>
          </nav>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDuties.map((duty) => (
          <Card key={duty.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className={`h-2 ${
              duty.priority === 'high' 
                ? 'bg-red-500' 
                : duty.priority === 'medium' 
                  ? 'bg-amber-500' 
                  : 'bg-blue-500'
            }`}></div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{duty.post}</CardTitle>
                {getPriorityBadge(duty.priority)}
              </div>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {duty.location}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium">{new Date(duty.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}</p>
                      <p className="text-xs text-gray-500">{duty.day}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium">{duty.startTime} - {duty.endTime}</p>
                      <p className="text-xs text-gray-500">8 hours shift</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4 flex justify-between">
                  {duty.status === 'upcoming' ? (
                    <>
                      <Button variant="outline" size="sm" className="w-1/2 mr-2">
                        Request Change
                      </Button>
                      <Button variant="default" size="sm" className="w-1/2">
                        Confirm Duty
                      </Button>
                    </>
                  ) : (
                    <div className="flex items-center w-full justify-center py-1">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-green-600">Duty Completed</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Request overtime section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Request Overtime</h2>
        <Card>
          <CardContent className="pt-6">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Post
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a post</option>
                    <option value="main-gate">Main Gate</option>
                    <option value="library">Library</option>
                    <option value="dormitory-b">Dormitory B</option>
                    <option value="admin-block">Admin Block</option>
                    <option value="sports-complex">Sports Complex</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Overtime
                </label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Please provide a reason for requesting overtime"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <Button type="submit">
                  Submit Overtime Request
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DutyManagement;