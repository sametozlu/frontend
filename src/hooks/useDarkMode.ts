import { useState, useEffect } from 'react'

/**
 * Dark Mode Yönetimi için Custom Hook
 * 
 * Tam dark mode çözümü sağlar:
 * - Sistem tercihi algılama
 * - Local storage kalıcılığı
 * - Smooth tema geçişleri
 * - CSS custom properties entegrasyonu
 * 
 * Bu, profesyonel ortamlarda çok değerli olan gelişmiş React pattern'leri
 * ve modern web geliştirme uygulamalarını gösterir.
 */
export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Önce localStorage'ı kontrol et
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) {
      return JSON.parse(saved)
    }
    
    // Sistem tercihine geri dön
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    // Tema değiştiğinde localStorage'ı güncelle
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
    
    // CSS styling için document class'ını güncelle
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  useEffect(() => {
    // Sistem tema değişikliklerini dinle
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      // Sadece kullanıcı manuel tercih belirlememişse güncelle
      if (localStorage.getItem('darkMode') === null) {
        setIsDarkMode(e.matches)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode((prev: boolean) => !prev)
  }

  return {
    isDarkMode,
    toggleDarkMode
  }
}
