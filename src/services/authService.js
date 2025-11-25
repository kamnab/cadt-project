import { UserManager, WebStorageStateStore, Log } from "oidc-client-ts";

const userManager = new UserManager({
    // authorization server URL
    authority: import.meta.env.VITE_API_AUTHORITY,
    // Registered client ID in authorization server           
    client_id: import.meta.env.VITE_API_CLIENT_ID,
    // Vue app's callback URI after login
    redirect_uri: import.meta.env.VITE_APP_REDIRECT_URI,
    // Using Authorization Code Flow
    response_type: "code",
    // The [fapi] scope for accessing to api resource server (cadt-project2-backend express.js project)
    scope: "openid profile fapi",
    // Redirect after logout           
    post_logout_redirect_uri: import.meta.env.VITE_API_POST_LOGOUT_REDIRECT_URI,
    // Automatically renew the token
    automaticSilentRenew: true,
    // For token renewal              
    silent_redirect_uri: import.meta.env.VITE_API_SILENT_REDIRECT_URI,
    // For cross tabs login/logout
    userStore: new WebStorageStateStore({ store: window.sessionStorage })
});

// Set up logging (optional)
Log.setLogger(console);
Log.setLevel(Log.DEBUG);

// Initialize event listeners
const initAuthListeners = () => {
    // Listen for access token expiring
    userManager.events.addAccessTokenExpiring(() => {
        console.log('[OIDC] Access token expiring soon...');
    });

    // Listen for access token expired
    userManager.events.addAccessTokenExpired(async () => {
        console.warn('[OIDC] Access token expired.');
        try {
            await userManager.signinSilent();  // attempt silent renew
        } catch {
            await login();                   // fallback logout
        }
    });

    // Listen for silent renew errors
    userManager.events.addSilentRenewError(async (err) => {
        console.error('[OIDC] Silent renew error:', err);
        await logout();  // Auto-logout the user
    });

    // Listen for when a user is successfully loaded after silent renew
    userManager.events.addUserLoaded(user => {
        console.log('User loaded after silent renew:', user);
        console.log('New access token:', user.access_token);
    });
};

// Login redirect
const login = async () => await userManager.signinRedirect();

// Handle callback after login
const loginCallback = async () => {
    const user = await userManager.signinCallback();
    // Remove code/state from URL
    window.history.replaceState({}, document.title, '/');
    return user;
};

// Get currently logged-in user (from memory)
const loggedInUser = () => userManager.getUser();

const logout = async () => {
    try {
        await userManager.removeUser();  // Clear user data from localStorage/sessionStorage
        await userManager.signoutRedirect();  // Redirect to identity provider's logout page
    } catch (error) {
        console.error("Error during logout", error);
        window.location.href = '/';
    }
};

// Get access token for API calls
const getAccessToken = async () => {
    const user = await loggedInUser();
    if (!user) throw new Error('User not authenticated');
    return user.access_token;
};

export {
    initAuthListeners, login, loginCallback, loggedInUser, logout,
    getAccessToken
};
