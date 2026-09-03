import { getToken } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = getToken();
    const headers = new Headers(options.headers || {});
    
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    
    if (!options.body || typeof options.body === 'string') {
        if (!headers.has('Content-Type')) {
            headers.set('Content-Type', 'application/json');
        }
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || error.message || 'API request failed');
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  // Auth
  async login(credentials: any) {
    return this.request<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(data: any) {
    return this.request<any>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMe() {
    return this.request<any>('/auth/me', { method: 'GET' });
  }

  // Inspections
  async createInspection(data: any) {
    return this.request<any>('/inspections', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async listInspections() {
    return this.request<any[]>('/inspections', { method: 'GET' });
  }

  async getInspection(id: string) {
    return this.request<any>(`/inspections/${id}`, { method: 'GET' });
  }

  // Note: FormData is passed, so we do not stringify it or set content-type
  async uploadImages(id: string, formData: FormData) {
    const token = getToken();
    const headers = new Headers();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    const response = await fetch(`${API_URL}/inspections/${id}/images`, {
      method: 'POST',
      headers,
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to upload images');
    return response.json();
  }

  async processInspection(id: string) {
    return this.request<any>(`/inspections/${id}/process`, { method: 'POST' });
  }

  // Additional methods...
  async getDashboardStats() {
    return this.request<any>('/dashboard/stats', { method: 'GET' });
  }
}

export const api = new ApiClient();
