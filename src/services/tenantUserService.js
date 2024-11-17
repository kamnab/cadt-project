import axios from 'axios';
import { loggedInUser } from '@/services/authService';

const getTenantUsers = async (tenantId) => {
    var user = await loggedInUser();
    if (user) {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_ENDPOINT}/tenantUsers/${tenantId}`, {
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

export { getTenantUsers }

