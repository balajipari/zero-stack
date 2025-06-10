import type { ResourcesResponse } from '../types/resources';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const fetchResources = async (): Promise<ResourcesResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/content`);
    if (!response.ok) {
      throw new Error('Failed to fetch resources');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw error;
  }
};

export const fetchFeaturedResources = async (): Promise<ResourcesResponse['featuredResources']> => {
  try {
    const response = await fetch(`${API_BASE_URL}/content/featured`);
    if (!response.ok) {
      throw new Error('Failed to fetch featured resources');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching featured resources:', error);
    throw error;
  }
}; 