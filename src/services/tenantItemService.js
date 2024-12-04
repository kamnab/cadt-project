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

const getTenantItemIdsByTerm = async (postIds, tenantId, term) => {
    var user = await loggedInUser();
    if (user) {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_TENANT_CONENT_ENDPOINT}/embed/article/filter`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                },
                params: {
                    ...postIds.reduce((acc, id, index) => {
                        acc[`postIds[${index}]`] = id;
                        return acc;
                    }, {}),
                    tenantId: tenantId,
                    term: term,         // Passing term as query parameter
                },
                paramsSerializer: (params) => {
                    return new URLSearchParams(params).toString();
                },
            });

            return response.data;

        } catch (error) {
            console.error('API call failed:', error);
        }
    }

    return null
};

const getTenantFilteredItems = async (postIds, tenantId) => {
    var user = await loggedInUser();
    if (user) {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_TENANT_CONENT_ENDPOINT}/embed/article/list`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                },
                params: {
                    ...postIds.reduce((acc, id, index) => {
                        acc[`postIds[${index}]`] = id;
                        return acc;
                    }, {}),
                    tenantId: tenantId
                },
                paramsSerializer: (params) => {
                    return new URLSearchParams(params).toString();
                },
            });

            return response.data;

        } catch (error) {
            console.error('API call failed:', error);
        }
    }

    return null
};

export { getTenantItems, getTenantItemIdsByTerm, getTenantFilteredItems }

