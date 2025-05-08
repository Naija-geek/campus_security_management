// Core type definitions for the Campus Security Management System

export type UserRole = 'security' | 'manager';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}

export interface SecurityPersonnel extends User {
  employeeId: string;
  phone: string;
  address: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'on-leave';
  salary: number;
}

export interface DutyPost {
  id: string;
  name: string;
  location: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

export interface DutyAssignment {
  id: string;
  personnelId: string;
  postId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'missed';
  isOvertime: boolean;
}

export interface LeaveRequest {
  id: string;
  personnelId: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewDate?: string;
  comments?: string;
}

export interface LoanRequest {
  id: string;
  personnelId: string;
  amount: number;
  requestDate: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedAmount?: number;
  deductionPercentage: number;
  reviewedBy?: string;
  reviewDate?: string;
  comments?: string;
}

export interface SalaryRecord {
  id: string;
  personnelId: string;
  month: string;
  year: number;
  basicSalary: number;
  overtime: number;
  deductions: number;
  loanDeduction: number;
  netSalary: number;
  paymentStatus: 'pending' | 'processed' | 'paid';
  paymentDate?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}