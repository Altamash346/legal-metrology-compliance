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
      const message = typeof error.detail === 'string' 
        ? error.detail 
        : (error.message || `API error: ${response.status}`);
      throw new Error(message);
    }

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
    return this.request<any>('/inspections/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async listInspections(page: number = 1, size: number = 20) {
    return this.request<any>(`/inspections/?page=${page}&size=${size}`, { method: 'GET' });
  }

  async getInspection(id: string) {
    return this.request<any>(`/inspections/${id}`, { method: 'GET' });
  }

  // Image upload — runs OCR + field extraction + rule validation automatically
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
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.detail || 'Failed to upload images');
    }
    return response.json();
  }

  // Re-validate: run rule engine again
  async validateInspection(id: string) {
    return this.request<any>(`/inspections/${id}/validate`, { method: 'POST' });
  }

  // Get extracted fields from OCR
  async getExtractedFields(id: string) {
    return this.request<any[]>(`/inspections/${id}/fields`, { method: 'GET' });
  }

  // Get OCR raw results
  async getOcrResults(id: string) {
    return this.request<any[]>(`/inspections/${id}/ocr`, { method: 'GET' });
  }

  // Get compliance report (score, checks, pass/fail)
  async getComplianceReport(id: string) {
    return this.request<any>(`/inspections/${id}/compliance`, { method: 'GET' });
  }

  // Rules
  async listRules() {
    return this.request<any[]>('/rules/', { method: 'GET' });
  }

  async createRule(data: any) {
    return this.request<any>('/rules/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async importRules(rules: any[]) {
    return this.request<any>('/rules/import', {
      method: 'POST',
      body: JSON.stringify({ rules }),
    });
  }

  async exportRules() {
    return this.request<any>('/rules/export/all', { method: 'GET' });
  }

  async deleteRule(id: string) {
    return this.request<any>(`/rules/${id}`, { method: 'DELETE' });
  }

  // Dashboard
  async getDashboardStats() {
    return this.request<any>('/dashboard/stats', { method: 'GET' });
  }
}

export const api = new ApiClient();
