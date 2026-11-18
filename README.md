# 🌦️ Weather Dashboard
<img width="1920" height="931" alt="image" src="https://github.com/user-attachments/assets/5382dab0-8d6d-41d3-b142-54fb7582082e" />


A modern, responsive, and bilingual (English / Persian) Weather Dashboard built with React, TypeScript, Material UI, and Redux Toolkit. It provides real-time weather conditions, multi-day forecasts, and interactive city search with full RTL/LTR and Dark/Light theme support.

## ✨ Features

- **Real-Time Weather Data**: View current temperature, feels-like temperature, daily high/low, and weather conditions.
- **Multi-Day Forecast**: Interactive forecast cards displaying upcoming days with dynamic weather icons.
- **Smart City Search**: Autocomplete search bar powered by OpenWeather Geocoding API with localized city names.
- **Bilingual Support (i18n)**: Seamless switching between English (`en`) and Persian (`fa`) with dynamic RTL/LTR layout adaptation.
- **Dark & Light Themes**: Built-in theme switcher with custom palettes using Material UI.
- **Performance Optimized**: Component-level code splitting (`React.lazy` & `Suspense`) and Vite `manualChunks` bundling optimization.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **State Management**: Redux Toolkit (`createAsyncThunk`, `createSlice`)
- **UI Framework**: Material UI (`@mui/material`, `@mui/icons-material`)
- **Localization**: `react-i18next`, `i18next`, `stylis-plugin-rtl`
- **Routnig**: React Router Dom
- **HTTP Client**: Axios
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- An API key from [OpenWeatherMap](https://openweathermap.org/api)
  
- To use your own key:
  
  VITE_OPENWEATHER_API_KEY=your_api_key_here
  
  VITE_OPENWEATHER_BASE_URL=[https://api.openweathermap.org/data/2.5](https://api.openweathermap.org/data/2.5)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MMEslami123/weather-dashboard.git
   cd weather-dashboard
