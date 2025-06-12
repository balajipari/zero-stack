import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface Guide {
  id: number;
  title: string;
  description: string;
  content: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export const guideService = {
  // Get all guides
  getAllGuides: async (): Promise<Guide[]> => {
    const response = await axios.get(`${API_BASE_URL}/content?type=guide`);
    return response.data;
  },

  // Get featured guides
  getFeaturedGuides: async (): Promise<Guide[]> => {
    const response = await axios.get(`${API_BASE_URL}/content?type=guide&featured=true`);
    return response.data;
  },

  // Get a single guide by ID
  getGuideById: async (id: number): Promise<Guide> => {
    const response = await axios.get(`${API_BASE_URL}/content/${id}`);
    return response.data;
  }
}; 