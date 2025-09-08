import './App.css'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useToast } from './hooks/useToast'
import ToastContainer from './components/common/ToastContainer'
import PerformanceMonitor from './components/common/PerformanceMonitor'
import ThemeToggle from './components/common/ThemeToggle'

/**
 * Ana App Bileşeni
 * 
 * Uygulamanın ana layout yapısını sağlayan root component:
 * - Aktif sayfa yönetimi ile navigasyon çubuğu
 * - Routing ile ana içerik alanı
 * - Modern styling ile responsive tasarım
 * 
 * Özellikler:
 * - Navigasyonda aktif sayfa vurgulama
 * - Farklı ekran boyutlarına uyum sağlayan responsive navbar
 * - Navigasyon ve içerik alanlarının temiz ayrımı
 */
function App() {
  const location = useLocation()
  const { toasts, removeToast } = useToast()

  return (
    <div className="app-container">
      {/* Navigasyon Çubuğu - Modern glassmorphism efekti ile sticky header */}
      <nav className="navbar">
        <div className="navbar-content">
          {/* Görsel çekicilik için emoji ile brand logosu */}
          <Link to="/" className="navbar-brand">
            📊 Data Manager
          </Link>
          
          {/* Aktif durum yönetimi ile navigasyon linkleri */}
          <ul className="navbar-links">
            <li>
              <Link 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''}
              >
                🏠 Home
              </Link>
            </li>
            <li>
              <Link 
                to="/users" 
                className={location.pathname.startsWith('/users') ? 'active' : ''}
              >
                👥 Users
              </Link>
            </li>
            <li>
              <Link 
                to="/posts" 
                className={location.pathname.startsWith('/posts') ? 'active' : ''}
              >
                📝 Posts
              </Link>
            </li>
            <li className="flex items-center gap-4">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </nav>
      
      {/* Tutarlı padding ve max-width ile ana içerik alanı */}
      <main className="main-content">
        <div className="page-container">
          {/* Router outlet - mevcut sayfa component'ini render eder */}
          <Outlet />
        </div>
      </main>

      {/* Toast Bildirimleri */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      
      {/* Performans Monitörü */}
      <PerformanceMonitor />
    </div>
  )
}

export default App
