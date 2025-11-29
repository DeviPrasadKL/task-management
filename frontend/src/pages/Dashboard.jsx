import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, Table, TableHead, TableRow, TableCell, TableBody, Pagination } from '@mui/material';
import { listTasks, deleteTask } from '../api/tasks';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [tasksData, setTasksData] = useState({ tasks: [], page: 1, limit: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const fetch = async (page = 1) => {
    setLoading(true);
    try {
      const res = await listTasks(page, tasksData.limit);
      setTasksData(res.data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetch(1); }, []);

  const onDelete = async (id) => {
    if (!confirm('Delete task?')) return;
    try {
      await deleteTask(id);
      fetch(tasksData.page);
    } catch (err) { console.error(err); }
  };

  const totalPages = Math.ceil(tasksData.total / tasksData.limit) || 1;

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Tasks</Typography>
        <Box>
          <Button variant="contained" onClick={() => nav('/tasks/new')}>Add Task</Button>
        </Box>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasksData.tasks.map(t => (
            <TableRow key={t._id}>
              <TableCell>{t.title}</TableCell>
              <TableCell>{t.description}</TableCell>
              <TableCell>{t.status}</TableCell>
              <TableCell>{new Date(t.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                <Button size="small" onClick={() => nav('/tasks/' + t._id)}>View</Button>
                <Button size="small" onClick={() => nav('/tasks/' + t._id + '/edit')}>Edit</Button>
                {user?.role === 'admin' ? (
                  <Button size="small" color="error" onClick={() => onDelete(t._id)}>Delete</Button>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination count={totalPages} page={tasksData.page} onChange={(e, p) => fetch(p)} />
      </Box>
    </Container>
  );
}
