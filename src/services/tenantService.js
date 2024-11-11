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

const getTenants = async () => {
    var user = await loggedInUser();
    if (user) {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_ENDPOINT_TENANTS}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                },
            });

            //console.log(response.data);
            const responseData = Array.from(response.data)
                .map((tenant) => ({
                    id: tenant._id,
                    name: tenant.name,
                    description: tenant.description,
                    isOwner: tenant.createdByUserId == user.profile.sub,
                    code: tenant.inviteCode
                }));

            // Function to remove duplicates with isOwner = false
            const uniqueData = responseData.reduce((tenant, obj) => {
                // Check if we've already seen this ID
                const existingObj = tenant.find(item => item.id === obj.id);

                // If ID doesn't exist in tenant, or the current object has isOwner true, add it
                if (!existingObj || obj.isOwner) {
                    // If the object isOwner is true, replace the existing one
                    if (existingObj) {
                        tenant = tenant.filter(item => item.id !== obj.id);
                    }
                    tenant.push(obj);
                }

                return tenant;
            }, []);

            return uniqueData;

            //console.log(tenants.value);
        } catch (error) {
            console.error('API call failed:', error);
        }
    }

    return [];
};

export { getTenantById, getTenants }

