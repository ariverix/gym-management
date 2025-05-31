import { useState, useEffect } from 'react';
import { BACKEND_DATA } from '../data/mockData';
import { validatePhone } from '../utils/helpers';

export const useMemberships = () => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загрузка данных
  useEffect(() => {
    const fetchMemberships = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const jsonResponse = JSON.stringify(BACKEND_DATA);
      const parsedData = JSON.parse(jsonResponse);
      
      setMemberships(parsedData);
      setLoading(false);
    };

    fetchMemberships();
  }, []);

  // Автоматическое обновление истекших абонементов
  useEffect(() => {
    const updateExpiredMemberships = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      setMemberships(prev => 
        prev.map(membership => {
          const endDate = new Date(membership.endDate);
          endDate.setHours(0, 0, 0, 0);
          
          if (membership.status === 'active' && endDate < today) {
            return { ...membership, status: 'expired' };
          }
          return membership;
        })
      );
    };

    updateExpiredMemberships();
    const interval = setInterval(updateExpiredMemberships, 24 * 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Функции управления абонементами
  const createMembership = (newMembership) => {
    if (!newMembership.memberName.trim() || !newMembership.phone.trim() || !newMembership.startDate || !newMembership.endDate) {
      alert('Пожалуйста, заполните все обязательные поля');
      return false;
    }
    
    if (!validatePhone(newMembership.phone)) {
      alert('Пожалуйста, введите телефон в формате: +7 (999) 123-45-67');
      return false;
    }
    
    if (new Date(newMembership.endDate) <= new Date(newMembership.startDate)) {
      alert('Дата окончания должна быть позже даты начала');
      return false;
    }
    
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

  const deleteMembership = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот абонемент?')) {
      setMemberships(prev => prev.filter(m => m.id !== id));
    }
  };

  const archiveMembership = (id) => {
    setMemberships(prev => prev.map(m => 
      m.id === id ? { ...m, status: 'archived' } : m
    ));
  };

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