import React, { useState } from 'react';
import { DollarSign, CreditCard, PiggyBank, ArrowRight, ArrowUp, ArrowDown, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

const Financial: React.FC = () => {
  const [activeTab, setActiveTab] = useState('salary');
  const [requestingLoan, setRequestingLoan] = useState(false);
  
  // Mock data for demonstration
  const salaryHistory = [
    {
      month: 'April',
      year: 2025,
      basic: 2200,
      overtime: 350,
      deductions: 150,
      loanRepayment: 250,
      netAmount: 2150,
      paymentDate: '2025-04-28',
      paymentStatus: 'paid',
    },
    {
      month: 'March',
      year: 2025,
      basic: 2200,
      overtime: 150,
      deductions: 150,
      loanRepayment: 250,
      netAmount: 1950,
      paymentDate: '2025-03-28',
      paymentStatus: 'paid',
    },
    {
      month: 'February',
      year: 2025,
      basic: 2200,
      overtime: 0,
      deductions: 150,
      loanRepayment: 250,
      netAmount: 1800,
      paymentDate: '2025-02-28',
      paymentStatus: 'paid',
    },
  ];

  const activeLoan = {
    id: 'L2024001',
    amount: 5000,
    approvedDate: '2024-12-15',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    purpose: 'Home renovation',
    monthlyDeduction: 250,
    deductionPercentage: 10,
    amountPaid: 1000,
    remainingAmount: 4000,
    status: 'active',
  };

  const loanHistory = [
    {
      id: 'L2023001',
      amount: 3000,
      approvedDate: '2023-05-10',
      startDate: '2023-06-01',
      endDate: '2024-05-31',
      purpose: 'Medical expenses',
      status: 'completed',
    },
    {
      id: 'L2022001',
      amount: 2000,
      approvedDate: '2022-08-15',
      startDate: '2022-09-01',
      endDate: '2023-02-28',
      purpose: 'Education fees',
      status: 'completed',
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Financial Management</h1>
        <p className="text-gray-600 mt-1">
          View your salary details, manage loans and financial information.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('salary')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'salary'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Salary Information
            </button>
            <button
              onClick={() => setActiveTab('loans')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'loans'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Loan Management
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'salary' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Current Month Salary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-500 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">$2,450</span>
                </div>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span>$300 more than last month</span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Expected payment date: May 28, 2025
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Year-to-Date Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <PiggyBank className="h-8 w-8 text-primary mr-2" />
                  <span className="text-2xl font-bold text-gray-900">$9,850</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Including 4 months of 2025
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: '33%' }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  33% of annual projection
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Deductions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-gray-700">Loan Repayment</div>
                    <div className="text-lg font-semibold text-gray-900">$250/month</div>
                  </div>
                  <Badge variant="info">10% of salary</Badge>
                </div>
                <div className="my-2 border-t border-gray-100"></div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-gray-700">Tax</div>
                    <div className="text-lg font-semibold text-gray-900">$150/month</div>
                  </div>
                  <Badge variant="secondary">Fixed amount</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-4">Salary History</h2>
          
          <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Month
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Basic Salary
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Overtime
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deductions
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loan Repayment
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {salaryHistory.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.month} {item.year}
                          </div>
                          <div className="text-xs text-gray-500">
                            Paid on {new Date(item.paymentDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${item.basic}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${item.overtime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${item.deductions}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${item.loanRepayment}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${item.netAmount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="success">Paid</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === 'loans' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Active Loan</CardTitle>
                </CardHeader>
                <CardContent>
                  {activeLoan ? (
                    <div>
                      <div className="flex justify-between mb-4">
                        <div>
                          <div className="text-sm text-gray-500">Loan ID</div>
                          <div className="text-lg font-semibold">{activeLoan.id}</div>
                        </div>
                        <Badge variant="success" className="h-fit">Active</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">Total Amount</div>
                          <div className="text-lg font-semibold">${activeLoan.amount}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Monthly Deduction</div>
                          <div className="text-lg font-semibold">${activeLoan.monthlyDeduction}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Deduction Rate</div>
                          <div className="text-lg font-semibold">{activeLoan.deductionPercentage}% of salary</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Start Date</div>
                          <div className="text-base">{new Date(activeLoan.startDate).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">End Date</div>
                          <div className="text-base">{new Date(activeLoan.endDate).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Purpose</div>
                          <div className="text-base">{activeLoan.purpose}</div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <div className="flex justify-between mb-2">
                          <div className="text-sm text-gray-700">Repayment Progress</div>
                          <div className="text-sm font-medium">
                            ${activeLoan.amountPaid} of ${activeLoan.amount} ({Math.round((activeLoan.amountPaid / activeLoan.amount) * 100)}%)
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{ width: `${(activeLoan.amountPaid / activeLoan.amount) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-gray-500">
                          <span>$0</span>
                          <span>${activeLoan.amount}</span>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-lg font-semibold">Remaining Amount</div>
                            <div className="text-sm text-gray-500">
                              Estimated completion: December 2025
                            </div>
                          </div>
                          <div className="text-xl font-bold text-primary">${activeLoan.remainingAmount}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No Active Loans</h3>
                      <p className="text-gray-500 mb-4">
                        You don't have any active loans at the moment.
                      </p>
                      <Button onClick={() => setRequestingLoan(true)}>
                        Apply for a Loan
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Apply for a Loan</CardTitle>
                </CardHeader>
                <CardContent>
                  {requestingLoan ? (
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Loan Amount ($)
                        </label>
                        <input
                          type="number"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter amount"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Purpose
                        </label>
                        <select
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select purpose</option>
                          <option value="medical">Medical Expenses</option>
                          <option value="education">Education</option>
                          <option value="home">Home Improvement</option>
                          <option value="emergency">Emergency</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Monthly Deduction (% of salary)
                        </label>
                        <select
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="5">5% of monthly salary</option>
                          <option value="10" selected>10% of monthly salary</option>
                          <option value="15">15% of monthly salary</option>
                          <option value="20">20% of monthly salary</option>
                          <option value="25">25% of monthly salary</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">
                          Based on your current salary, this would be approximately $250 per month.
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Additional Details
                        </label>
                        <textarea
                          rows={3}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Provide any additional information"
                        ></textarea>
                      </div>
                      <div className="pt-2 flex space-x-3">
                        <Button variant="outline" onClick={() => setRequestingLoan(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">
                          Submit Request
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-medium text-blue-800">Loan Eligibility</h3>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Maximum amount:</span>
                            <span className="text-sm font-medium">$10,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Based on:</span>
                            <span className="text-sm font-medium">2.5 years service</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Repayment period:</span>
                            <span className="text-sm font-medium">Up to 36 months</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full" onClick={() => setRequestingLoan(true)}>
                        Apply for a Loan
                      </Button>
                      
                      <div className="text-xs text-gray-500 mt-2">
                        <p>
                          Note: Loan approval is subject to manager review and availability of funds.
                          The maximum loan amount is based on your service duration and salary level.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-4">Loan History</h2>
          
          <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loan ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Purpose
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loanHistory.map((loan) => (
                  <tr key={loan.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{loan.id}</div>
                      <div className="text-xs text-gray-500">
                        Approved: {new Date(loan.approvedDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${loan.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{loan.purpose}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(loan.startDate).toLocaleDateString()} - {new Date(loan.endDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {Math.ceil((new Date(loan.endDate).getTime() - new Date(loan.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))} months
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="success">Completed</Badge>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{activeLoan.id}</div>
                    <div className="text-xs text-gray-500">
                      Approved: {new Date(activeLoan.approvedDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${activeLoan.amount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{activeLoan.purpose}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(activeLoan.startDate).toLocaleDateString()} - {new Date(activeLoan.endDate).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.ceil((new Date(activeLoan.endDate).getTime() - new Date(activeLoan.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))} months
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge>Active</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Financial;