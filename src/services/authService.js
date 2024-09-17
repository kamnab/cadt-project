import { UserManager, WebStorageStateStore, Log } from "oidc-client-ts";

const userManager = new UserManager({
    // authorization server URL
    authority: "https://localhost:44313",
    // Registered client ID in authorization server           
    client_id: "cadt-project1-frontend",
    // Registered client secret in authorization server                
    client_secret: "CADT-PROJECT1-FRONTEND-2024",
    // Vue app's callback URI after login
    redirect_uri: "https://localhost:5173/callback",
    // Using Authorization Code Flow
    response_type: "code",
    // The [fapi] scope for accessing to api resource server (cadt-project2-backend express.js project)
    scope: "openid profile fapi",
    // Redirect after logout           
    post_logout_redirect_uri: "https://localhost:5173",
    // Automatically renew the token
    automaticSilentRenew: true,
    // For token renewal              
    silent_redirect_uri: "https://localhost:5173/callback",
    userStore: new WebStorageStateStore({ store: window.localStorage })
});

// Set up logging (optional)
Log.setLogger(console);
Log.setLevel(Log.DEBUG);

// Initialize event listeners
const initAuthListeners = () => {
    // Listen for access token expiring
    userManager.events.addAccessTokenExpiring(() => {
        console.log('Access token is about to expire...');
    });

    // Listen for access token expired
    userManager.events.addAccessTokenExpired(() => {
        console.warn('Access token has expired.');
    });

    // Listen for silent renew errors
    userManager.events.addSilentRenewError(err => {
        console.error('Silent renew error:', err);
    });

    // Listen for when a user is successfully loaded after silent renew
    userManager.events.addUserLoaded(user => {
        console.log('User loaded after silent renew:', user);
        console.log('New access token:', user.access_token);
    });
};

const login = () => userManager.signinRedirect();
const loginCallback = () => userManager.signinCallback();
const loggedInUser = () => userManager.getUser();
const logout = async () => {
    var isLoggingOut = true;
    try {
        await userManager.removeUser();  // Clear user data from localStorage/sessionStorage
        await userManager.signoutRedirect();  // Redirect to identity provider's logout page
    } catch (error) {
        console.error("Error during logout", error);
        isLoggingOut = false;
    }
};

export { initAuthListeners, login, loginCallback, loggedInUser, logout };
