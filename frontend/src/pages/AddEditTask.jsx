import React, { useState, useEffect } from 'react';
import {
  Container, TextField, Button, Box,
  Typography, Select, MenuItem, IconButton, CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { createTask, updateTask, getTask } from '../api/tasks';
import { useNavigate, useParams } from 'react-router-dom';

import { toastSuccess, toastError } from '../utils/toast';

export default function AddEditTask() {
  const [form, setForm] = useState({ title: '', description: '', status: 'pending' });
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      setLoading(true);
      getTask(params.id)
        .then(res => {
          setForm({
            title: res.data.title,
            description: res.data.description,
            status: res.data.status
          });
        })
        .catch(() => toastError("Failed to load task"))
        .finally(() => setLoading(false));
    }
  }, [params.id]);

  const submit = async () => {
    if (!form.title.trim()) {
      toastError("Title is required");
      return;
    }

    try {
      if (params.id) {
        await updateTask(params.id, form);
        toastSuccess("Task updated successfully");
      } else {
        await createTask(form);
        toastSuccess("Task created successfully");
      }
      nav('/dashboard');
    } catch (err) {
      toastError(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container sx={{ mt: 4 }} maxWidth="sm">

      {/* BACK BUTTON */}
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => nav('/dashboard')}
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      <Typography variant="h5" sx={{ mt: 1 }}>
        {params.id ? "Edit Task" : "Add Task"}
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <TextField
            label="Description"
            multiline
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <Select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>

          <Button variant="contained" onClick={submit}>
            {params.id ? 'Save Changes' : 'Create Task'}
          </Button>
        </Box>
      )}

    </Container>
  );
}
