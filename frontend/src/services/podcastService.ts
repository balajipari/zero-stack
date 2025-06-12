import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface Podcast {
  id: string;
  title: string;
  description: string;
  audio_url: string;
  image_url?: string;
  published_at: string;
}

export const podcastService = {
  getAllPodcasts: async (): Promise<Podcast[]> => {
    const response = await axios.get(`${API_BASE_URL}/content?type=podcast`);
    return response.data;
  },
  getPodcastById: async (id: string): Promise<Podcast> => {
    const response = await axios.get(`${API_BASE_URL}/content/${id}`);
    return response.data;
  }
}; 