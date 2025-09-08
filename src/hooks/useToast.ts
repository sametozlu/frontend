import { useState, useCallback } from 'react'

export interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

/**
 * Toast Bildirimleri için Custom Hook
 * 
 * Uygulama genelinde toast bildirimlerini yönetmek için basit API sağlar.
 * Otomatik ID oluşturma, kuyruk yönetimi ve temizlik işlemlerini halleder.
 * 
 * Kullanım:
 * ```tsx
 * const { showToast, toasts, removeToast } = useToast()
 * 
 * // Farklı tiplerde toast'lar göster
 * showToast('Kullanıcı başarıyla oluşturuldu!', 'success')
 * showToast('Veri kaydetme başarısız', 'error')
 * showToast('Lütfen girişinizi kontrol edin', 'warning')
 * ```
 */
export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = useCallback((
    message: string, 
    type: 'success' | 'error' | 'info' | 'warning' = 'info',
    duration?: number
  ) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: ToastMessage = { id, message, type, duration }
    
    setToasts(prev => [...prev, newToast])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const clearAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  return {
    toasts,
    showToast,
    removeToast,
    clearAllToasts
  }
}
