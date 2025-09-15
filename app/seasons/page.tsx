import React from 'react';
import SeasonCards from '../components/SeasonCards';
import { getAllSeasons } from '../services/api';
import { SeasonCard, SeasonYear } from '../types/types';

// API'den gelen sezon yıllarını SeasonCard formatına çeviren fonksiyon
const transformSeasons = (seasonYears: SeasonYear[]): SeasonCard[] => {
  // Sadece string formatındaki sezonları filtrele (2025-2026 gibi)
  const filteredSeasons = seasonYears.filter(year => typeof year === 'string');
  
  return filteredSeasons.map((year, index) => {
    // Status belirleme mantığı
    let status: 'active' | 'completed' | 'upcoming' = 'completed';
    const currentYear = new Date().getFullYear();
    
    const yearParts = year.split('-');
    const startYear = parseInt(yearParts[0]);
    
    if (startYear === currentYear) {
      status = 'active';
    } else if (startYear > currentYear) {
      status = 'upcoming';
    }

    return {
      id: year,
      year: year,
      name: `Basketball League ${year}`,
      description: status === 'active' 
        ? 'Şu anda devam eden sezon.'
        : status === 'upcoming'
        ? 'Gelecek sezon için hazırlıklar devam ediyor.'
        : 'Bu sezon tamamlandı',
      status: status
    };
  });
};

const SeasonsPage = async () => {
  try {
    const apiResponse = await getAllSeasons();
    console.log(apiResponse, "api cevabı");
    const seasonCardInformations = transformSeasons(apiResponse.response);
    
    return (
      <div className="seasons-page">
        <SeasonCards seasons={seasonCardInformations} />
      </div>
    );
  } catch (err) {
    console.error('Sezonlar yüklenirken hata:', err);
    return (
      <div className="seasons-page">
        <SeasonCards seasons={[]} error="Bir hata oluştu" />
      </div>
    );
  }
};

export default SeasonsPage;