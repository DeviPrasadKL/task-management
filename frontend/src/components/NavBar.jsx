import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useThemeContext } from '../theme/ThemeProvider';
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom';
import { toastSuccess } from "../Utils/toast"; // <-- add this

export default function NavBar(){
  const { theme, setTheme } = useThemeContext();
  const navigate = useNavigate();

  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;

  const handleThemeChange = (checked) => {
    setTheme(checked ? 'dark' : 'light');
    toastSuccess(`Theme switched to ${checked ? 'Dark' : 'Light'} mode`);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toastSuccess("Signed out successfully");
    navigate('/signin');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/dashboard')}
        >
          TaskApp
        </Typography>

        {/* Theme Toggle */}
        <Switch 
          checked={theme === 'dark'} 
          onChange={(e) => handleThemeChange(e.target.checked)} 
        />

        {user ? (
          <>
            <Typography sx={{ mx:2 }}>
              {user.name} ({user.role})
            </Typography>
            <Button color="inherit" onClick={logout}>Sign Out</Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={()=>navigate('/signin')}>Sign In</Button>
            <Button color="inherit" onClick={()=>navigate('/signup')}>Sign Up</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
