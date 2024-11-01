import axios from 'axios';
import { loggedInUser } from '@/services/authService';

const getTenantItems = async (tenantId) => {
    var user = await loggedInUser();
    if (user) {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_ENDPOINT}/tenantItems/${tenantId}`, {
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

const getTenantItemIdsByTerm = async (tenantIds, term) => {
    var user = await loggedInUser();
    if (user) {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_TENANT_CONENT_ENDPOINT}/embed/article/filter`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                },
                params: {
                    tenantIds, // Passing tenantIds as query parameter
                    term,         // Passing term as query parameter
                },
            });

            return response.data;

        } catch (error) {
            console.error('API call failed:', error);
        }
    }

    return null
};

export { getTenantItems, getTenantItemIdsByTerm }

