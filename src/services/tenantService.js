import axios from 'axios';
import { loggedInUser } from '@/services/authService';

const getTenantById = async (id) => {
    var user = await loggedInUser();
    if (user) {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_ENDPOINT_TENANTS}/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                },
            });

            const { id: _id, name, description } = response.data;
            return { id, name, description };

            //console.log(tenants.value);
        } catch (error) {
            console.error('API call failed:', error);
        }
    }

    return null
};

export { getTenantById }

