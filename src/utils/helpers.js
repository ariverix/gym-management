// Валидация телефона
export const validatePhone = (phone) => {
  const phoneRegex = /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/;
  return phoneRegex.test(phone);
};

// Форматирование даты
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ru-RU');
};

// Определение статуса по цвету
export const getStatusColor = (status) => {
  switch(status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'expired': return 'bg-red-100 text-red-800';
    case 'archived': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusText = (status) => {
  switch(status) {
    case 'active': return 'Активный';
    case 'expired': return 'Истёк';
    case 'archived': return 'Архивный';
    default: return 'Неизвестно';
  }
};