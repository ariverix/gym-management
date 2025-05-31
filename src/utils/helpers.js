// Валидация телефона
export const validatePhone = (phone) => {
  // Проверка соответствия формату: +7 (999) 123-45-67
  const phoneRegex = /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/;
  return phoneRegex.test(phone);
};

// Форматирование даты
export const formatDate = (dateString) => {
  // Преобразование строки даты в форматированный вид для ru-RU
  return new Date(dateString).toLocaleDateString('ru-RU');
};

// Определение статуса по цвету
export const getStatusColor = (status) => {
  // Возвращает строку классов Tailwind для цвета статуса
  switch(status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'expired': return 'bg-red-100 text-red-800';
    case 'archived': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusText = (status) => {
  // Возвращает текст статуса
  switch(status) {
    case 'active': return 'Активный';
    case 'expired': return 'Истёк';
    case 'archived': return 'Архивный';
    default: return 'Неизвестно';
  }
};