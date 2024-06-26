import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    try {
      const token = this.getToken();
      if (!token || token === undefined || token === null) {
        return false;
      }
      return decode(token);
    } catch {
      return null;
    }
  }

  loggedIn() {
    const token = this.getToken();
    if (!token || token === 'undefined') {
      return false;
    }
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    const token = localStorage.getItem('id_token');
    if (!token || token === undefined || token === null) {
      return false;
    }
    return token;
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthService();
