import apiClient from './apiClient';

const sweetService = {
    getAllSweets: async () => {
        try {
            const response = await apiClient.get('/sweets');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    searchSweets: async (params) => {
        try {
            const queryParams = new URLSearchParams();
            if (params.name) queryParams.append('name', params.name);
            if (params.category) queryParams.append('category', params.category);
            if (params.minPrice) queryParams.append('minPrice', params.minPrice);
            if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice);

            const response = await apiClient.get(`/sweets/search?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getSweetById: async (id) => {
        try {
            const response = await apiClient.get(`/sweets/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createSweet: async (sweetData) => {
        try {
            const response = await apiClient.post('/sweets', sweetData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateSweet: async (id, sweetData) => {
        try {
            const response = await apiClient.put(`/sweets/${id}`, sweetData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteSweet: async (id) => {
        try {
            const response = await apiClient.delete(`/sweets/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    purchaseSweet: async (id, quantity) => {
        try {
            const response = await apiClient.post(`/sweets/${id}/purchase`, { quantity });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    restockSweet: async (id, quantity) => {
        try {
            const response = await apiClient.post(`/sweets/${id}/restock`, { quantity });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default sweetService;
