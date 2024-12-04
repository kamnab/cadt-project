import axios from 'axios';
import { loggedInUser } from '@/services/authService';

const createTenantCategory = async (tenantId, name) => {
    const user = await loggedInUser();
    const response = await axios.post(`${import.meta.env.VITE_API_BACKEND_ENDPOINT}/tenantCategories/${tenantId}`, { name }, {
        headers: {
            Authorization: `Bearer ${user.access_token}`,
        }
    });

    return response.data;
}

const getTenantCategories = async (tenantId) => {
    const user = await loggedInUser();
    if (user) {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_ENDPOINT}/tenantCategories/${tenantId}`, {
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

export { createTenantCategory, getTenantCategories }

