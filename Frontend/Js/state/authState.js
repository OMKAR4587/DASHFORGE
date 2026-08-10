export const authState={
    user:null,
    isAuthenticated:false
}

export function clearAuth(){
    authState.user = null;
    authState.isAuthenticated = false;

    localStorage.removeItem("token")
}