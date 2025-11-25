import { UserManager, WebStorageStateStore, Log } from "oidc-client-ts";

// In-memory storage for tokens
class MemoryStore {
    constructor() {
        this._user = null;
    }
    getItem(key) {
        return this._user;
    }
    setItem(key, value) {
        this._user = value;
    }
    removeItem(key) {
        this._user = null;
    }
}

const userManager = new UserManager({
    // authorization server URL
    authority: import.meta.env.VITE_API_AUTHORITY,
    // Registered client ID in authorization server           
    client_id: import.meta.env.VITE_API_CLIENT_ID,
    // Registered client secret in authorization server                
    client_secret: import.meta.env.VITE_API_CLIENT_SECRET,
    // Vue app's callback URI after login
    redirect_uri: import.meta.env.VITE_APP_REDIRECT_URI,
    // Using Authorization Code Flow
    response_type: "code",
    // The [fapi] scope for accessing to api resource server (cadt-project2-backend express.js project)
    scope: "openid profile offline_access fapi",
    // Redirect after logout           
    post_logout_redirect_uri: import.meta.env.VITE_API_POST_LOGOUT_REDIRECT_URI,
    // Automatically renew the token
    automaticSilentRenew: true,
    // For token renewal              
    silent_redirect_uri: import.meta.env.VITE_API_SILENT_REDIRECT_URI,
    // For cross tabs login/logout
    // userStore: new WebStorageStateStore({ store: window.localStorage })
    userStore: new MemoryStore()     // tokens stored in memory only
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
            await logout();                   // fallback logout
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
const login = () => userManager.signinRedirect();

// Handle callback after login
const loginCallback = async () => {
    const user = await userManager.signinCallback();
    // Tokens are now in memory (MemoryStore)
    // Remove URL code/state
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
