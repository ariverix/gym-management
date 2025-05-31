import React from 'react';
import { Activity, Clock, Archive, Wallet } from 'lucide-react';

const StatisticsCards = ({ activeMemberships, expiredMemberships, archivedMemberships, totalRevenue }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Активные */}
      <div className="bg-white rounded-lg shadow p-6 flex items-center">
        <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
          <Activity className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Активные</p>
          <p className="text-2xl font-semibold">{activeMemberships.length}</p>
        </div>
      </div>

      {/* Истёкшие */}
      <div className="bg-white rounded-lg shadow p-6 flex items-center">
        <div className="p-3 rounded-full bg-orange-100 text-orange-600 mr-4">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Истёкшие</p>
          <p className="text-2xl font-semibold">{expiredMemberships.length}</p>
        </div>
      </div>

      {/* Архивные */}
      <div className="bg-white rounded-lg shadow p-6 flex items-center">
        <div className="p-3 rounded-full bg-gray-100 text-gray-600 mr-4">
          <Archive className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Архивные</p>
          <p className="text-2xl font-semibold">{archivedMemberships.length}</p>
        </div>
      </div>

      {/* Общий доход */}
      <div className="bg-white rounded-lg shadow p-6 flex items-center">
        <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
          <Wallet className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Общий доход</p>
          <p className="text-2xl font-semibold">{totalRevenue.toLocaleString()} ₽</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCards;