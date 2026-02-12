# Contact Dashboard
A modern, responsive contact management system built with React, Redux, and styled-components.

## Features

  Dashboard with contact statistics
  Complete contact management (Add, Edit, View)
  Advanced filtering (search by any column, date range, month, year)
  Excel export functionality
  Responsive design (mobile-friendly)
  Fast and efficient with Redux state management
  Sorting by any column
  Mobile-optimized table view

## Tech Stack

- **React** - UI Library
- **Redux Toolkit** - State Management
- **React Router** - Navigation
- **Styled Components** - Styling
- **React Hook Form** - Form Management
- **XLSX** - Excel Export
- **Vite** - Build Tool

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd contact-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

   Or using yarn:
   ```bash
   yarn install
   ```

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

Or using yarn:
```bash
yarn dev
```

The application will open at `http://localhost:5173`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

Or using yarn:
```bash
yarn build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

Or using yarn:
```bash
yarn preview
```

## Project Structure

```
contact-dashboard/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── GlobalFilter.jsx
│   │   ├── Pagination.jsx
│   │   └── Sidebar.jsx
│   ├── features/
│   │   └── contactSlice.js
│   ├── pages/
│   │   ├── Contacts.jsx
│   │   └── Dashboard.jsx
│   ├── store/
│   │   └── store.js
│   ├── styles/
│   │   └── global.css
│   ├── utils/
│   │   └── contactData.js
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Dependencies

### Main Dependencies
- react (^18.3.1)
- react-dom (^18.3.1)
- react-redux (^9.2.0)
- @reduxjs/toolkit (^2.6.1)
- react-router-dom (^7.5.0)
- styled-components (^6.3.9)
- react-hook-form (^7.55.0)
- react-toastify (^11.0.5)
- xlsx (^0.18.5)

### Dev Dependencies
- vite (^6.2.0)
- @vitejs/plugin-react (^4.3.4)
- eslint (^9.21.0)

## Features in Detail

### Dashboard
- View total contacts, active contacts, pending actions
- Quick statistics at a glance
- Clean and modern UI

### Contact Management
- Add new contacts with validation
- Edit existing contacts
- Search and filter contacts
- Export to Excel
- Sort by any column
- Pagination with page jump
- Date filtering (by date range, month, or year)

### Responsive Design
- Mobile-optimized sidebar
- Responsive tables
- Touch-friendly interface

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
