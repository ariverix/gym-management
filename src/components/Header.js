import React from 'react';
import { Activity, Users, Wallet } from 'lucide-react';

const Header = ({ totalMembers, totalRevenue }) => {
  return (
    <header className="text-white p-4 shadow-lg" style={{ backgroundColor: '#006b09' }}>
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <div className="flex items-center space-x-3">
          <Activity size={32} />
          <h1 className="text-2xl font-bold">FitLife Gym Management</h1>
        </div>
        <div className="flex items-center space-x-4 mt-2 sm:mt-0">
          <div className="flex items-center space-x-2">
            <Users size={20} />
            <span className="text-sm">Всего членов: {totalMembers}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wallet className="w-5 h-5" />
            <span className="text-sm">Доход: {totalRevenue.toLocaleString()} ₽</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;