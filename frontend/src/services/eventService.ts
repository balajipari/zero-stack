import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  registration_link: string;
  created_at: string;
  updated_at: string;
}

export const eventService = {
  getAllEvents: async (): Promise<Event[]> => {
    const response = await axios.get(`${API_BASE_URL}/content?type=event`);
    return response.data;
  },

  getUpcomingEvents: async (): Promise<Event[]> => {
    const response = await axios.get(`${API_BASE_URL}/content?type=event&upcoming=true`);
    return response.data;
  },

  getPastEvents: async (): Promise<Event[]> => {
    const response = await axios.get(`${API_BASE_URL}/content?type=event&upcoming=false`);
    return response.data;
  },

  getEventById: async (id: string): Promise<Event> => {
    const response = await axios.get(`${API_BASE_URL}/content/${id}`);
    return response.data;
  }
}; 