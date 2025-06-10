export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'blog' | 'case-study' | 'podcast';
  imageUrl?: string;
  url: string;
  createdAt: string;
  author?: {
    name: string;
    avatarUrl?: string;
  };
}

export interface FeaturedResource extends Resource {
  featured: true;
  featuredOrder: number;
}

export interface ResourcesResponse {
  resources: Resource[];
  featuredResources: FeaturedResource[];
} 