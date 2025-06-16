import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import TasksList from '@/components/dashboard/TasksList';
import ComplianceHealth from '@/components/dashboard/ComplianceHealth';
import CompanyStatusCard from '@/components/dashboard/CompanyStatusCard';
import DocumentsCard from '@/components/dashboard/DocumentsCard';
import SupportButton from '@/components/dashboard/SupportButton';
import { Task } from '@/components/dashboard/TasksList';

// Dummy data for tasks
const dummyTasks: Task[] = [
  {
    id: '1',
    title: 'File GST Return',
    dueDate: '2024-05-15',
    category: 'Tax',
    priority: 'high',
    status: 'pending',
    regulatoryReference: 'GST Act Section 39'
  },
  {
    id: '2',
    title: 'Prepare Financial Statements',
    dueDate: '2024-06-30',
    category: 'Accounting',
    priority: 'medium',
    status: 'in-progress'
  },
  {
    id: '3',
    title: 'Renew Business License',
    dueDate: '2024-07-01',
    category: 'Compliance',
    priority: 'high',
    status: 'pending'
  },
  {
    id: '4',
    title: 'Submit Income Tax Return',
    dueDate: '2024-08-31',
    category: 'Tax',
    priority: 'medium',
    status: 'pending'
  },
];

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your company's financial health, compliance status, and upcoming tasks
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Revenue" value="$250,000" delta="+12%" />
          <StatsCard title="Expenses" value="$180,000" delta="-8%" />
          <StatsCard title="Net Profit" value="$70,000" delta="+20%" />
          <StatsCard title="Compliance Score" value="95%" delta="+5%" />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tasks List */}
          <div className="lg:col-span-2">
            <TasksList tasks={dummyTasks} />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <ComplianceHealth score={85} />
            <CompanyStatusCard />
            <DocumentsCard />
          </div>
        </div>
      </div>
      <SupportButton />
    </MainLayout>
  );
};

export default Dashboard;
