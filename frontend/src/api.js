import axios from 'axios';
const isDevelopment = import.meta.env.DEV;
export const api = axios.create({
baseURL: isDevelopment 
  ? 'http://localhost:4000/api'
  : 'https://backend-black-phi-29.vercel.app/api'
});
export const UsuariosAPI = {
list: () => api.get('/usuarios').then(r => r.data),
get: (username) => api.get(`/usuarios/${username}`).then(r => r.data),
create: (data) => api.post('/usuarios', data).then(r => r.data),
update: (username, data) => api.put(`/usuarios/${username}`, data).then(r => r.data),
remove: (username) => api.delete(`/usuarios/${username}`).then(r => r.data)
};
export const CatalogosAPI = {
estados: () => api.get('/estados').then(r => r.data),
tipos: () => api.get('/tipos').then(r => r.data)
};

