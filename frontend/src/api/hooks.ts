import { useQuery } from '@tanstack/react-query';
import { fetchResources } from './resources';

export const useResources = () => {
  return useQuery({
    queryKey: ['resources'],
    queryFn: fetchResources,
  });
}; 