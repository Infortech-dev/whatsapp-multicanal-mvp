import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

// Interceptor injeta o header automaticamente antes de enviar qualquer requisição
api.interceptors.request.use((config) => {
    const currentTenant = '00000000-0000-0000-0000-000000000000'; // UUID cadastrado no seu banco
    config.headers['X-Tenant-ID'] = currentTenant;
    return config;
});

export default api;