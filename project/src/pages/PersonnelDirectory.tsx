import React, { useState, useEffect } from 'react';
import { User, Search, UserPlus, MapPin, Phone, Mail, Calendar, Filter } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

type Personnel = {
  _id: string;
  name: string;
  employeeId: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  role: string;
  status: string;
  image?: string;
};

const PersonnelDirectory: React.FC = () => {
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    employeeId: '',
    email: '',
    phone: '',
    address: '',
    joinDate: '',
    role: '',
    password: 'securitypass123',
  });

  // Fetch personnel from backend
  useEffect(() => {
    const fetchPersonnel = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:4000/api/personnel');
        const data = await res.json();
        setPersonnel(data);
      } catch (err) {
        console.error('Failed to fetch personnel:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPersonnel();
  }, []);

  // Filter logic
  const filteredPersonnel = personnel.filter((person) => {
    const matchesSearch =
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || person.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Badge helper
  const getStatusBadge = (status: string) => {
    const variants: Record<string, "success" | "destructive" | "warning" | "default" | "secondary" | "outline" | "info"> = {
      active: 'success',
      'on-leave': 'warning',
      inactive: 'destructive',
    };
    return (
      <Badge variant={variants[status] || 'default'}>
        {status === 'on-leave' ? 'On Leave' : status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  // Handle form input
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Password generator (simple)
  const generatePassword = () => {
    const pwd = Math.random().toString(36).slice(-10);
    setForm({ ...form, password: pwd });
  };

  // Handle register personnel
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/personnel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to register personnel');
      const newPerson = await res.json();
      setPersonnel([newPerson, ...personnel]);
      setShowAddForm(false);
      setForm({
        name: '',
        employeeId: '',
        email: '',
        phone: '',
        address: '',
        joinDate: '',
        role: '',
        password: 'securitypass123',
      });
    } catch (err) {
      alert('Error registering personnel');
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Personnel Directory</h1>
          <p className="text-gray-600 mt-1">
            Manage security personnel records, profiles, and information.
          </p>
        </div>
        <Button 
          className="mt-4 sm:mt-0 flex items-center"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : (
            <>
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Personnel
            </>
          )}
        </Button>
      </div>

      {showAddForm && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Register New Security Personnel</h3>
            <form className="space-y-4" onSubmit={handleRegister}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter full name"
                    value={form.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    name="employeeId"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="SEC000"
                    value={form.employeeId}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="name@campus-security.com"
                    value={form.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="(555) 123-4567"
                    value={form.phone}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    name="role"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={form.role}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Select role</option>
                    <option value="Security Officer">Security Officer</option>
                    <option value="Senior Security Officer">Senior Security Officer</option>
                    <option value="Supervisor">Supervisor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Join Date
                  </label>
                  <input
                    type="date"
                    name="joinDate"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={form.joinDate}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Street address"
                    value={form.address}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Initial Password
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      name="password"
                      className="w-full border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      value={form.password}
                      readOnly
                    />
                    <button
                      type="button"
                      className="bg-gray-100 text-gray-700 px-3 py-2 rounded-r-md border border-l-0 border-gray-300"
                      onClick={generatePassword}
                    >
                      Generate
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Personnel will be required to change this on first login
                  </p>
                </div>
              </div>
              <div className="pt-2 flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowAddForm(false)} type="button">
                  Cancel
                </Button>
                <Button type="submit">
                  Register Personnel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, ID, or email..."
            className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2 sm:w-auto">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="on-leave">On Leave</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 py-12">Loading personnel...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPersonnel.map((person) => (
            <Card key={person._id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="p-4 flex items-center space-x-4">
                  {person.image ? (
                    <img
                      src={person.image}
                      alt={person.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                      <User className="h-8 w-8 text-white" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{person.name}</h3>
                    <div className="flex items-center text-gray-500 text-sm">
                      <span className="mr-2">{person.employeeId}</span>
                      {getStatusBadge(person.status)}
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{person.role}</p>
                  </div>
                </div>
                <div className="px-4 pb-4 space-y-2 text-sm">
                  <div className="flex items-start">
                    <Mail className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                    <span className="text-gray-700">{person.email}</span>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                    <span className="text-gray-700">{person.phone}</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                    <span className="text-gray-700">{person.address}</span>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                    <span className="text-gray-700">
                      Joined on {new Date(person.joinDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <div className="border-t border-gray-100 p-4 flex justify-between">
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredPersonnel.length === 0 && (
            <div className="col-span-full p-8 text-center">
              <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No personnel found</h3>
              <p className="text-gray-500">
                No security personnel match your current filters. Try adjusting your search.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonnelDirectory;