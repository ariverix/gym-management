import React from 'react';
import { Plus } from 'lucide-react';

const CreateMembershipForm = ({ 
  showForm, 
  setShowForm, 
  newMembership, 
  setNewMembership, 
  handleCreateMembership,
  handleMembershipTypeChange 
}) => {
  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors shadow-lg hover:opacity-90"
          style={{ backgroundColor: showForm ? '#07b148' : '#006b09' }}
        >
          <Plus size={20} />
          <span>Создать абонемент</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-lg"
             style={{
               boxShadow: '0.5em 1em 0.5em 0em rgba(64, 73, 59, 0.281)',
               border: 'dashed 0.1rem #006b09',
               borderRadius: '15px'
             }}>
          <h3 className="text-xl font-bold mb-4 pb-2"
              style={{ borderBottom: '2px solid #07b148' }}>
            Новый абонемент
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Имя клиента *</label>
              <input
                type="text"
                required
                value={newMembership.memberName}
                onChange={(e) => setNewMembership({...newMembership, memberName: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                placeholder="Введите полное имя"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Телефон *</label>
              <input
                type="tel"
                required
                value={newMembership.phone}
                onChange={(e) => setNewMembership({...newMembership, phone: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                placeholder="+7 (999) 123-45-67"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Тип абонемента</label>
              <select
                value={newMembership.membershipType}
                onChange={(e) => handleMembershipTypeChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
              >
                <option value="Базовый">Базовый (5 000 ₽)</option>
                <option value="Стандарт">Стандарт (8 000 ₽)</option>
                <option value="Премиум">Премиум (15 000 ₽)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Цена (₽)</label>
              <input
                type="number"
                min="0"
                value={newMembership.price}
                onChange={(e) => setNewMembership({...newMembership, price: parseInt(e.target.value) || 0})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Дата начала *</label>
              <input
                type="date"
                required
                value={newMembership.startDate}
                onChange={(e) => setNewMembership({...newMembership, startDate: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Дата окончания *</label>
              <input
                type="date"
                required
                value={newMembership.endDate}
                onChange={(e) => setNewMembership({...newMembership, endDate: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
              />
            </div>
            <div className="md:col-span-2 flex space-x-4">
              <button
                onClick={handleCreateMembership}
                className="text-white px-6 py-3 rounded-lg transition-colors hover:opacity-90"
                style={{ backgroundColor: '#006b09' }}
              >
                Создать
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateMembershipForm;