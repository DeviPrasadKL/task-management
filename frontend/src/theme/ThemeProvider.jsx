import React, { createContext, useContext, useState } from 'react'
import { createTheme } from '@mui/material/styles'

const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  return useContext(ThemeContext);
}

export function getTheme(mode) {
  return createTheme({
    palette: {
      mode,
      primary: { main: '#1976d2' },
      secondary: { main: '#9c27b0' }
    }
  });
}

export default ThemeContext;
