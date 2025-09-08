import Toast from './Toast'

export interface ToastContainerProps {
  toasts: Array<{
    id: string
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
    duration?: number
  }>
  onRemove: (id: string) => void
}

/**
 * Toast Container Component
 * 
 * Manages multiple toast notifications with proper positioning and z-index.
 * Renders toasts in a stack with proper spacing and animation timing.
 * 
 * Features:
 * - Multiple toast support with proper stacking
 * - Automatic positioning to prevent overlap
 * - Smooth animations for each toast
 * - Proper cleanup and memory management
 */
export default function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          style={{
            transform: `translateY(${index * 8}px)`,
            zIndex: 1000 - index
          }}
        >
          <Toast
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => onRemove(toast.id)}
          />
        </div>
      ))}
    </div>
  )
}
