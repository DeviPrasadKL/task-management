import API from './api';

export const listTasks = (page=1, limit=10) => API.get('/tasks', { params: { page, limit }});
export const createTask = (data) => API.post('/tasks', data);
export const updateTask = (id, data) => API.put('/tasks/' + id, data);
export const deleteTask = (id) => API.delete('/tasks/' + id);
export const getTask = (id) => API.get(`/tasks/${id}`);
