# 📊 Data Manager - Frontend (Phase 1)

A modern React + TypeScript application built with Vite that implements Phase 1 of the assignment. Features a beautiful, responsive UI for managing users and posts with full CRUD operations.

## ✨ Features

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern Styling**: Clean, professional interface with smooth animations
- **Interactive Elements**: Hover effects, loading states, and visual feedback
- **Intuitive Navigation**: Clear breadcrumbs and active page indicators

### 👥 Users Management
- **Full CRUD Operations**: Create, read, update, and delete users
- **Real-time Search**: Filter users by name, username, or email
- **User Details**: Click on any user to view their profile and posts
- **Form Validation**: Proper input validation and error handling

### 📝 Posts Management
- **Full CRUD Operations**: Create, read, update, and delete posts
- **Author Selection**: Link posts to users through dropdown selection
- **Content Preview**: See post content in the table with truncation
- **Advanced Search**: Search by title or content

### 🔗 Data Relationships
- **User-Post Linking**: Posts are properly linked to users via userId
- **Navigation**: Easy navigation between users and their posts
- **Breadcrumbs**: Clear navigation path showing current location

### 🚀 Performance & UX
- **Loading States**: Beautiful loading animations with spinners
- **Error Handling**: User-friendly error messages and recovery
- **Optimistic Updates**: UI updates immediately for better UX
- **Confirmation Dialogs**: Safe delete operations with confirmation

## 🛠️ Tech Stack

- **React 19** - Latest React with modern features
- **TypeScript** - Full type safety and better development experience
- **Vite** - Lightning-fast build tool and dev server
- **React Router** - Client-side routing with lazy loading
- **ESLint + Prettier** - Code quality and formatting
- **CSS3** - Modern styling with flexbox, grid, and animations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
src/
├── components/
│   ├── common/
│   │   └── Loader.tsx          # Loading component with animations
│   ├── users/
│   │   └── UsersTable.tsx      # Users management table
│   └── posts/
│       └── PostsTable.tsx      # Posts management table
├── pages/
│   ├── HomePage.tsx            # Welcome page with features overview
│   ├── UsersPage.tsx           # Users listing page
│   ├── UserDetailPage.tsx      # Individual user details and posts
│   └── PostsPage.tsx           # Posts listing page
├── services/
│   ├── apiClient.ts            # HTTP client for API calls
│   ├── usersService.ts         # User-related API functions
│   └── postsService.ts         # Post-related API functions
├── types/
│   ├── user.ts                 # User TypeScript interfaces
│   └── post.ts                 # Post TypeScript interfaces
├── App.tsx                     # Main app component with routing
├── main.tsx                    # Application entry point
├── App.css                     # App-specific styles
└── index.css                   # Global styles and utilities
```

## 🎯 Key Features Implemented

### ✅ Assignment Requirements
- [x] React + TypeScript + Vite setup
- [x] Homepage with navigation links
- [x] Users list (id, name, username, email)
- [x] Posts list (userId, id, title)
- [x] Full CRUD operations for both entities
- [x] Data relationships via userId
- [x] Clean, readable UI/UX
- [x] ESLint compliance

### 🚀 Additional Enhancements
- [x] **Responsive Design**: Mobile-first approach
- [x] **Modern UI**: Professional styling with gradients and shadows
- [x] **Loading States**: Animated loading indicators
- [x] **Error Handling**: User-friendly error messages
- [x] **Search & Filter**: Real-time search functionality
- [x] **Navigation**: Breadcrumbs and active page indicators
- [x] **User Details**: Dedicated user profile pages
- [x] **Form Validation**: Input validation and error states
- [x] **Confirmation Dialogs**: Safe delete operations
- [x] **Content Preview**: Post content preview in tables
- [x] **Animations**: Smooth transitions and hover effects
- [x] **Resilient API Layer**: Timeout-aware HTTP client with clearer error messages
- [x] **Retry UX**: One-click retry actions on key data screens
- [x] **Routing Quality**: Dedicated 404 page and safer production routing

### 🌟 Advanced Professional Features
- [x] **Toast Notifications**: Real-time user feedback system
- [x] **Dark Mode**: Complete theme switching with system preference detection
- [x] **Keyboard Shortcuts**: Professional keyboard navigation (Ctrl+H, Ctrl+N, etc.)
- [x] **Help System**: Comprehensive help modal with shortcuts guide
- [x] **Performance Monitor**: Real-time performance metrics and optimization
- [x] **Accessibility**: Full ARIA labels and keyboard navigation support
- [x] **Type Safety**: Comprehensive TypeScript integration with strict mode
- [x] **Code Documentation**: Detailed JSDoc comments throughout
- [x] **Custom Hooks**: Reusable logic with useToast, useDarkMode, useKeyboardShortcuts
- [x] **Error Boundaries**: Graceful error handling and recovery
- [x] **Memory Management**: Optimized component lifecycle and cleanup
- [x] **Error Boundary**: Global runtime fallback UI for unexpected render errors

## 🔧 API Integration

Currently uses JSONPlaceholder API for demonstration:
- **Base URL**: `https://jsonplaceholder.typicode.com`
- **Endpoints**: `/users`, `/posts`
- **Note**: Changes are not persisted (demo API limitation)

For Phase 2, replace with your NestJS backend endpoints.

You can override the API URL in production via:

```bash
VITE_API_BASE_URL=https://your-api.example.com
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#3b82f6 to #1d4ed8)
- **Secondary**: Gray gradient (#6b7280 to #4b5563)
- **Success**: Green gradient (#10b981 to #059669)
- **Danger**: Red gradient (#ef4444 to #dc2626)
- **Background**: Light gradient with purple accent

### Typography
- **Font**: Inter (system fallback)
- **Headings**: 600 weight, various sizes
- **Body**: 400 weight, 1.6 line height
- **Code**: Courier New monospace

## 🚀 Deployment Ready

The application is production-ready and can be deployed to:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **Any static hosting service**

## 📝 Notes

- ✅ Code passes all ESLint rules
- ✅ TypeScript strict mode enabled
- ✅ Responsive design tested on multiple devices
- ✅ Accessibility considerations included
- ✅ Performance optimized with lazy loading
- ✅ Professional-grade code documentation
- ✅ Advanced React patterns and hooks
- ✅ Modern web development best practices
- ✅ Production-ready error handling
- ✅ Comprehensive user experience features

## 🔄 Next Steps (Phase 2)

To implement Phase 2:
1. Create NestJS backend with CRUD endpoints
2. Update `apiClient.ts` to point to your backend
3. Implement proper data persistence
4. Add authentication if required

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
