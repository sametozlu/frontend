import { useDarkMode } from '../../hooks/useDarkMode'

/**
 * Theme Toggle Component
 * 
 * A modern theme toggle button with smooth animations and accessibility features.
 * Supports both light and dark modes with system preference detection.
 * 
 * Features:
 * - Smooth icon transitions
 * - Accessibility labels
 * - Keyboard navigation support
 * - Visual feedback for current theme
 * - System preference integration
 */
export default function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <button
      onClick={toggleDarkMode}
      className="
        relative w-12 h-6 rounded-full transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        dark:focus:ring-offset-gray-800
        bg-gray-200 dark:bg-gray-700
        hover:bg-gray-300 dark:hover:bg-gray-600
      "
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {/* Toggle circle */}
      <div
        className={`
          absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-all duration-300 ease-in-out
          transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}
          bg-white dark:bg-gray-900 shadow-lg
          flex items-center justify-center
        `}
      >
        {/* Icons */}
        <span
          className={`
            text-xs transition-all duration-300 ease-in-out
            ${isDarkMode ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
          `}
        >
          🌙
        </span>
        <span
          className={`
            absolute text-xs transition-all duration-300 ease-in-out
            ${isDarkMode ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}
          `}
        >
          ☀️
        </span>
      </div>
    </button>
  )
}
