"use client"

import React from 'react'

interface LoadingSpinnerProps {
  message?: string
  size?: 'small' | 'medium' | 'large'
  className?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Yükleniyor...", 
  size = 'medium',
  className = ''
}) => {
  const getSizeStyle = () => {
    switch (size) {
      case 'small': return { width: '24px', height: '24px' }
      case 'medium': return { width: '40px', height: '40px' }
      case 'large': return { width: '64px', height: '64px' }
      default: return { width: '40px', height: '40px' }
    }
  }

  return (
    <div className={`loading-container ${className}`}>
      <div 
        className="loading-spinner" 
        style={getSizeStyle()}
      ></div>
      <p>{message}</p>
    </div>
  )
}

export default LoadingSpinner
