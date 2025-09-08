import { useEffect, useState } from 'react'

export interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
  onClose: () => void
}

/**
 * Toast Bildirim Bileşeni
 * 
 * Smooth animasyonlar ve otomatik kapanma ile modern toast bildirim sistemi.
 * Her tip için uygun styling ve ikonlarla çoklu tip desteği: success, error, info, warning.
 * 
 * Özellikler:
 * - Belirtilen süre sonra otomatik kapanma (varsayılan: 3000ms)
 * - Smooth slide-in/slide-out animasyonları
 * - Tip tabanlı styling ve ikonlar
 * - Manuel kapatma işlevselliği
 * - Responsive tasarım
 */
export default function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger slide-in animation
    const timer = setTimeout(() => setIsVisible(true), 100)
    
    // Auto-dismiss after duration
    const dismissTimer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Wait for slide-out animation
    }, duration)

    return () => {
      clearTimeout(timer)
      clearTimeout(dismissTimer)
    }
  }, [duration, onClose])

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 border-green-600 text-white'
      case 'error':
        return 'bg-red-500 border-red-600 text-white'
      case 'warning':
        return 'bg-yellow-500 border-yellow-600 text-white'
      case 'info':
        return 'bg-blue-500 border-blue-600 text-white'
      default:
        return 'bg-gray-500 border-gray-600 text-white'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅'
      case 'error':
        return '❌'
      case 'warning':
        return '⚠️'
      case 'info':
        return 'ℹ️'
      default:
        return '📢'
    }
  }

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 max-w-sm w-full
        transform transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${getTypeStyles()}
        rounded-lg shadow-lg border p-4
        flex items-center gap-3
      `}
    >
      <span className="text-lg">{getIcon()}</span>
      <span className="flex-1 text-sm font-medium">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(onClose, 300)
        }}
        className="text-white/80 hover:text-white transition-colors"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  )
}
