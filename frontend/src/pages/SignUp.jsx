import React, { useState } from 'react';
import { 
  Container, TextField, Button, Box, Typography, 
  MenuItem, Select, InputLabel, FormControl, IconButton, InputAdornment 
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { signup } from '../api/auth';
import { toastSuccess, toastError } from '../Utils/toast';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'user' });
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  const submit = async () => {
    if (!form.name || !form.email || !form.password) {
      return toastError("Please fill all fields");
    }

    try {
      await signup(form);
      toastSuccess("Account created successfully!");
      setTimeout(() => nav('/signin'), 1200);
    } catch (e) {
      toastError(e?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt:4 }}>
      <Typography variant="h5">Sign Up</Typography>
      <Box sx={{ display:'flex', flexDirection:'column', gap:2, mt:2 }}>

        <TextField 
          label="Name"
          value={form.name}
          onChange={(e)=>setForm({...form, name:e.target.value})}
        />

        <TextField 
          label="Email"
          value={form.email}
          onChange={(e)=>setForm({...form, email:e.target.value})}
        />

        <TextField 
          type={showPassword ? "text" : "password"}
          label="Password"
          value={form.password}
          onChange={(e)=>setForm({...form, password:e.target.value})}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <FormControl>
          <InputLabel>Role</InputLabel>
          <Select
            value={form.role}
            label="Role"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" onClick={submit}>Sign Up</Button>
      </Box>
    </Container>
  );
}
