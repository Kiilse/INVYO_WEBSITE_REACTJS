const TOKEN_KEY = 'jwt';
const REFRESH_KEY = 'tok';

export const login = () => {
    localStorage.setItem(TOKEN_KEY, 'TestLogin');
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }
    return false;
}

export const refreshed = () => {
    localStorage.setItem(REFRESH_KEY, 'Refresh');
    window.location.reload();
}

export const needToRefresh = () => {
    localStorage.removeItem(REFRESH_KEY);
}

export const isrefresh = () => {
    if (localStorage.getItem(REFRESH_KEY)) {
        return true;
    }
    return false;
}