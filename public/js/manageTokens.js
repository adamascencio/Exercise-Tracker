export const addToken = token => {
  localStorage.setItem('token', token);
}

export const removeToken = () => {
  localStorage.removeItem('token');
}

export const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const payload = JSON.parse(window.atob(token.split('.')[1]));
  const isTokenExpired = payload.exp < Date.now() / 1000;
  if (isTokenExpired) {
    removeToken();
    return null;
  } else {
    return payload;
  }
}