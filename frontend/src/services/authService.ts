import axios from 'axios';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
  token: string;
}

const TOKEN_KEY = 'zerostack_token';
const USER_KEY = 'zerostack_user';

export const authService = {
  async login(email: string, password: string): Promise<AuthUser> {
    const res = await axios.post('/api/auth/login', { email, password });
    // Assume backend returns { token, user: { id, name, email, role } }
    const { token, user } = res.data;
    const authUser: AuthUser = { ...user, token };
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return authUser;
  },
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  getUser(): AuthUser | null {
    const user = localStorage.getItem(USER_KEY);
    const token = localStorage.getItem(TOKEN_KEY);
    if (user && token) {
      return { ...JSON.parse(user), token };
    }
    return null;
  },
}; 