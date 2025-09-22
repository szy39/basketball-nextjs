'use client';

import React from 'react';
import { SeasonCard } from '../types/types';
import LoadingSpinner from '../utils/LoadingSpinner';
import "../CSS/SeasonCard.css"
import Link from 'next/link';

interface SeasonCardsProps {
  seasons: SeasonCard[];
  loading?: boolean;
  error?: string | null;
}

const SeasonCards: React.FC<SeasonCardsProps> = ({ seasons, loading = false, error = null }) => {
  if (loading) {
    return (
      <div className="season-cards-container">
        <h2 className="season-cards-title">Seasons</h2>
        <LoadingSpinner message="Sezonlar yükleniyor..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="season-cards-container">
        <h2 className="season-cards-title">Seasons</h2>
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="season-cards-container">
      <h2 className="season-cards-title">Seasons</h2>
      <div className="season-cards-grid">
        {seasons.map((season) => (
            <Link key={season.id} href={`/seasons/${season.year}`}>
            <div className={`season-card season-card--${season.status}`}>
            <div className="season-card-header">
              <h3 className="season-card-year">{season.year}</h3>
              <span className={`season-card-status season-card-status--${season.status}`}>
                {season.status === 'active' ? 'Active' : 
                 season.status === 'completed' ? 'Completed' : 'Upcoming'}
              </span>
            </div>
            <h4 className="season-card-name">{season.name}</h4>
            <p className="season-card-description">{season.description}</p>
          </div></Link>
          
        ))}
      </div>
    </div>
  );
};

export default SeasonCards