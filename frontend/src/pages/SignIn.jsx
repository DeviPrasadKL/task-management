import React, { useState } from 'react';
import { 
  Container, TextField, Button, Box, Typography, 
  IconButton, InputAdornment 
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { signin } from '../api/auth';
import { toastSuccess, toastError } from '../utils/toast';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [form, setForm] = useState({ email:'', password:''});
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  const submit = async () => {
    if (!form.email || !form.password) {
      return toastError("Please enter email and password");
    }

    try {
      const res = await signin(form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      toastSuccess("Signed in successfully!");
      setTimeout(() => nav('/dashboard'), 800);
    } catch (e) {
      toastError(e?.response?.data?.message || "Invalid login credentials");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt:4 }}>
      <Typography variant="h5">Sign In</Typography>
      <Box sx={{ display:'flex', flexDirection:'column', gap:2, mt:2 }}>
        
        <TextField 
          label="Email"
          value={form.email}
          onChange={(e)=>setForm({...form, email:e.target.value})}
        />

        <TextField 
          label="Password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={(e)=>setForm({...form, password:e.target.value})}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Button variant="contained" onClick={submit}>Sign In</Button>
      </Box>
    </Container>
  );
}
