import axios from 'axios';
import { loggedInUser } from '@/services/authService';

const addTenantItemToCategory = async (tenantId, categoryId, itemId) => {
    var user = await loggedInUser();
    if (user) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BACKEND_ENDPOINT}/tenants/${tenantId}/categories`, { itemId, categoryId }, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                }
            });

            return response.data;

        } catch (error) {
            console.error('API call failed:', error);
        }
    }

    return null
}

const getTenantCategoryItems = async (tenantId, categoryId) => {
    var user = await loggedInUser();
    if (user) {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_ENDPOINT}/tenants/${tenantId}/categories/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                },
            });

            return response.data;

        } catch (error) {
            console.error('API call failed:', error);
        }
    }

    return null
};

export { addTenantItemToCategory, getTenantCategoryItems }

