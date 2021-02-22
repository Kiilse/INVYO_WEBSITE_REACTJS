const TOKEN_KEY = 'jwt';
const REFRESH_KEY = 'tok';
const PRINT_KEY = 'prt';

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

export const prints = () => {
    localStorage.setItem(PRINT_KEY, 'Print');
    window.location.reload();
}

export const Donotprint = () => {
    localStorage.removeItem(PRINT_KEY);
}

export const isprintable = () => {
    if (localStorage.getItem(PRINT_KEY)) {
        return true;
    }
    return false;
}