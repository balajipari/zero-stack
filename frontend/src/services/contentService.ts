import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';  

export interface Content {
  id: string;
  title: string;
  description: string;
  content: string;
  type: 'blog' | 'case-study' | 'podcast';
  image_url?: string;
  author_id: number;
  created_at: string;
  updated_at: string;
}

export const contentService = {
  getAllContent: async (): Promise<Content[]> => {
    const response = await axios.get(`${API_BASE_URL}/content`);
    return response.data;
  },

  getContentByType: async (type: string): Promise<Content[]> => {
    const response = await axios.get(`${API_BASE_URL}/content?type=${type}`);
    return response.data;
  },

  getContentById: async (id: string): Promise<Content> => {
    const response = await axios.get(`${API_BASE_URL}/content/${id}`);
    return response.data;
  },

  createContent: async (content: Omit<Content, 'id' | 'created_at' | 'updated_at'>): Promise<Content> => {
    const response = await axios.post(`${API_BASE_URL}/content`, content);
    return response.data;
  },

  updateContent: async (id: string, content: Partial<Content>): Promise<Content> => {
    const response = await axios.put(`${API_BASE_URL}/content/${id}`, content);
    return response.data;
  },

  deleteContent: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/content/${id}`);
  }
}; 