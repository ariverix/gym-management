import React, { useState } from 'react';
import Header from './components/Header';
import StatisticsCards from './components/StatisticsCards';
import CreateMembershipForm from './components/CreateMembershipForm';
import MembershipCard from './components/MembershipCard';
import { useMemberships } from './hooks/useMemberships';
import { formatDate, getStatusColor, getStatusText } from './utils/helpers';
import { Archive, Trash2 } from 'lucide-react';

const GymManagementApp = () => {
  const { 
    memberships, 
    loading, 
    createMembership, 
    deleteMembership, 
    archiveMembership, 
    activateMembership 
  } = useMemberships();
  
  const [showForm, setShowForm] = useState(false);
  const [newMembership, setNewMembership] = useState({
    memberName: '',
    membershipType: 'Базовый',
    startDate: '',
    endDate: '',
    price: 5000,
    phone: ''
  });

  // Обработчик создания абонемента
  const handleCreateMembership = () => {
    // Валидация и добавление нового абонемента через хук useMemberships
    if (createMembership(newMembership)) {
      setNewMembership({
        memberName: '',
        membershipType: 'Базовый',
        startDate: '',
        endDate: '',
        price: 5000,
        phone: ''
      });
      setShowForm(false);
    }
  };

  // Обработчик смены типа абонемента с автоматическим обновлением цены
  const handleMembershipTypeChange = (type) => {
    const prices = {
      'Базовый': 5000,
      'Стандарт': 8000,
      'Премиум': 15000
    };
    setNewMembership({
      ...newMembership,
      membershipType: type,
      price: prices[type]
    });
  };

  // Фильтрация абонементов по статусу
  const activeMemberships = memberships.filter(m => m.status === 'active');
  const expiredMemberships = memberships.filter(m => m.status === 'expired');
  const archivedMemberships = memberships.filter(m => m.status === 'archived');

  // Подсчёт общего дохода только по активным абонементам
  const totalRevenue = memberships
    .filter(m => m.status === 'active')
    .reduce((sum, m) => sum + m.price, 0);

  // Отображение индикатора загрузки при получении данных
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-800 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Загрузка данных с сервера...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header totalMembers={memberships.length} totalRevenue={totalRevenue} />
      
      <div className="container mx-auto p-4 space-y-6">
        <StatisticsCards 
          activeMemberships={activeMemberships}
          expiredMemberships={expiredMemberships}
          archivedMemberships={archivedMemberships}
          totalRevenue={totalRevenue}
        />

        <CreateMembershipForm
          showForm={showForm}
          setShowForm={setShowForm}
          newMembership={newMembership}
          setNewMembership={setNewMembership}
          handleCreateMembership={handleCreateMembership}
          handleMembershipTypeChange={handleMembershipTypeChange}
        />

        {/* Активные абонементы */}
        <section className="bg-white p-6 rounded-2xl shadow-lg"
                 style={{
                   boxShadow: '0.5em 1em 0.5em 0em rgba(64, 73, 59, 0.281)',
                   border: 'dashed 0.1rem #006b09',
                   borderRadius: '15px'
                 }}>
          <h2 className="text-2xl font-bold mb-6 pb-2"
              style={{ borderBottom: '2px solid #07b148' }}>
            Активные абонементы ({activeMemberships.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Рендер карточек активных абонементов */}
            {activeMemberships.map(membership => (
              <MembershipCard
                key={membership.id}
                membership={membership}
                onArchive={archiveMembership}
                onDelete={deleteMembership}
                onActivate={activateMembership}
                formatDate={formatDate}
                getStatusColor={getStatusColor}
                getStatusText={getStatusText}
              />
            ))}
          </div>
          {activeMemberships.length === 0 && (
            <p className="text-gray-500 text-center py-8">Активных абонементов нет</p>
          )}
        </section>

        {/* Истёкшие абонементы */}
        <section className="bg-white p-6 rounded-2xl shadow-lg"
                 style={{
                   boxShadow: '0.5em 1em 0.5em 0em rgba(64, 73, 59, 0.281)',
                   border: 'dashed 0.1rem #006b09',
                   borderRadius: '15px'
                 }}>
          <h2 className="text-2xl font-bold mb-6 pb-2"
              style={{ borderBottom: '2px solid #07b148' }}>
            Истёкшие абонементы ({expiredMemberships.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Рендер карточек истёкших абонементов */}
            {expiredMemberships.map(membership => (
              <MembershipCard
                key={membership.id}
                membership={membership}
                onArchive={archiveMembership}
                onDelete={deleteMembership}
                onActivate={activateMembership}
                formatDate={formatDate}
                getStatusColor={getStatusColor}
                getStatusText={getStatusText}
              />
            ))}
          </div>
          {expiredMemberships.length === 0 && (
            <p className="text-gray-500 text-center py-8">Истёкших абонементов нет</p>
          )}
        </section>

        {/* Архив */}
        <section className="bg-white p-6 rounded-2xl shadow-lg"
                 style={{
                   boxShadow: '0.5em 1em 0.5em 0em rgba(64, 73, 59, 0.281)',
                   border: 'dashed 0.1rem #006b09',
                   borderRadius: '15px'
                 }}>
          <h2 className="text-2xl font-bold mb-6 pb-2"
              style={{ borderBottom: '2px solid #07b148' }}>
            Архив ({archivedMemberships.length})
          </h2>
          {archivedMemberships.length > 0 ? (
            <ul className="space-y-2">
              {/* Список архивных абонементов с возможностью удаления */}
              {archivedMemberships.map(membership => (
                <li key={membership.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Archive size={16} className="text-gray-500" />
                    <span className="font-medium">{membership.memberName}</span>
                    <span className="text-sm text-gray-500">({membership.membershipType})</span>
                    <span className="text-sm text-gray-500">{membership.price.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">{formatDate(membership.endDate)}</span>
                    <button
                      onClick={() => deleteMembership(membership.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Удалить навсегда"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-8">Архив пуст</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default GymManagementApp;