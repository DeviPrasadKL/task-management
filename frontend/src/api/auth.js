import API from './api';

export const signup = (data) => API.post('/auth/signup', data);
export const signin = (data) => API.post('/auth/signin', data);
