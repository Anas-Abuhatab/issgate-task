
export const isUserLoggedIn = () => !!(localStorage.getItem('userDataInfo') && localStorage.getItem('accessToken'));