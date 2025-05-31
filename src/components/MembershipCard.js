import React from 'react';
import { User, Calendar, Wallet, Activity } from 'lucide-react';

const MembershipCard = ({ membership, onArchive, onDelete, onActivate, formatDate, getStatusColor, getStatusText }) => {
  const isActive = membership.status === 'active';
  const isExpired = membership.status === 'expired';
  
  return (
    <div className={`p-4 rounded-lg border transition-shadow hover:shadow-md ${
      isExpired ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
    }`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <User size={18} style={{ color: isExpired ? '#dc2626' : '#006b09' }} />
          <h3 className="font-semibold text-lg">{membership.memberName}</h3>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(membership.status)}`}>
          {getStatusText(membership.status)}
        </span>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Activity size={16} />
          <span>{membership.membershipType}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar size={16} />
          <span>{formatDate(membership.startDate)} - {formatDate(membership.endDate)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Wallet size={16} />
          <span>{membership.price.toLocaleString()} ₽</span>
        </div>
        <div className="text-xs text-gray-500">
          {membership.phone}
        </div>
      </div>
      
      <div className="flex space-x-2 mt-4">
        {isActive && (
          <>
            <button
              onClick={() => onArchive(membership.id)}
              className="flex-1 text-white px-3 py-2 rounded text-sm transition-colors hover:opacity-90"
              style={{ backgroundColor: '#A3AE9E' }}
            >
              Архив
            </button>
            <button
              onClick={() => onDelete(membership.id)}
              className="flex-1 text-white px-3 py-2 rounded text-sm transition-colors hover:opacity-90"
              style={{ backgroundColor: '#CF3A15' }}
            >
              Удалить
            </button>
          </>
        )}
        
        {isExpired && (
          <>
            <button
              onClick={() => onActivate(membership.id)}
              className="flex-1 text-white px-3 py-2 rounded text-sm transition-colors hover:opacity-90"
              style={{ backgroundColor: '#006b09' }}
            >
              Активировать
            </button>
            <button
              onClick={() => onArchive(membership.id)}
              className="flex-1 text-white px-3 py-2 rounded text-sm transition-colors hover:opacity-90"
              style={{ backgroundColor: '#A3AE9E' }}
            >
              Архив
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MembershipCard;