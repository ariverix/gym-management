import { useState, useEffect } from 'react';
import { BACKEND_DATA } from '../data/mockData';
import { validatePhone } from '../utils/helpers';

export const useMemberships = () => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загрузка данных (имитация запроса к серверу)
  useEffect(() => {
    const fetchMemberships = async () => {
      setLoading(true);
      // Искусственная задержка для имитации загрузки
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Клонирование данных для предотвращения мутаций
      const jsonResponse = JSON.stringify(BACKEND_DATA);
      const parsedData = JSON.parse(jsonResponse);
      
      setMemberships(parsedData);
      setLoading(false);
    };

    fetchMemberships();
  }, []);

  // Автоматическое обновление статуса истёкших абонементов
  useEffect(() => {
    const updateExpiredMemberships = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Сброс времени для корректного сравнения дат
      
      setMemberships(prev => 
        prev.map(membership => {
          const endDate = new Date(membership.endDate);
          endDate.setHours(0, 0, 0, 0);
          
          // Если абонемент активен и дата окончания меньше сегодняшней — переводим в "истёкшие"
          if (membership.status === 'active' && endDate < today) {
            return { ...membership, status: 'expired' };
          }
          return membership;
        })
      );
    };

    updateExpiredMemberships();
    // Проверка истёкших абонементов раз в сутки
    const interval = setInterval(updateExpiredMemberships, 24 * 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Функция создания абонемента с валидацией данных
  const createMembership = (newMembership) => {
    // Проверка обязательных полей
    if (!newMembership.memberName.trim() || !newMembership.phone.trim() || !newMembership.startDate || !newMembership.endDate) {
      alert('Пожалуйста, заполните все обязательные поля');
      return false;
    }
    
    // Проверка формата телефона
    if (!validatePhone(newMembership.phone)) {
      alert('Пожалуйста, введите телефон в формате: +7 (999) 123-45-67');
      return false;
    }
    
    // Проверка корректности дат
    if (new Date(newMembership.endDate) <= new Date(newMembership.startDate)) {
      alert('Дата окончания должна быть позже даты начала');
      return false;
    }
    
    // Формирование нового объекта абонемента
    const membership = {
      ...newMembership,
      id: Date.now(),
      status: 'active',
      memberName: newMembership.memberName.trim(),
      phone: newMembership.phone.trim()
    };
    
    setMemberships(prev => [...prev, membership]);
    return true;
  };

  // Удаление абонемента с подтверждением
  const deleteMembership = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот абонемент?')) {
      setMemberships(prev => prev.filter(m => m.id !== id));
    }
  };

  // Перевод абонемента в архив
  const archiveMembership = (id) => {
    setMemberships(prev => prev.map(m => 
      m.id === id ? { ...m, status: 'archived' } : m
    ));
  };

  // Активация абонемента (например, после истечения)
  const activateMembership = (id) => {
    setMemberships(prev => prev.map(m => 
      m.id === id ? { ...m, status: 'active' } : m
    ));
  };

  return {
    memberships,
    loading,
    createMembership,
    deleteMembership,
    archiveMembership,
    activateMembership
  };
};