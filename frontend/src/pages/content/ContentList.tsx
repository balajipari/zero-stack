import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { contentService } from '../../services/contentService';
import type { Content } from '../../services/contentService';

const ContentList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const contentType = searchParams.get('type') || 'blog';

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await contentService.getContentByType(contentType);
        setContent(data);
      } catch (err) {
        setError('Failed to fetch content. Please try again later.');
        console.error('Error fetching content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [contentType]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading content...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
            </div>
            <nav className="flex space-x-8">
              <a href="/members" className="text-gray-600 hover:text-gray-900">Member's Login</a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
              <a href="/write" className="text-gray-600 hover:text-gray-900">Write for Us</a>
              <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Content Type Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-4">
            <a
              href="/content?type=blog"
              className={`px-4 py-2 rounded-md ${
                contentType === 'blog'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Blogs
            </a>
            <a
              href="/content?type=case-study"
              className={`px-4 py-2 rounded-md ${
                contentType === 'case-study'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Case Studies
            </a>
            <a
              href="/content?type=podcast"
              className={`px-4 py-2 rounded-md ${
                contentType === 'podcast'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Podcasts
            </a>
          </nav>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {item.image_url && (
                <div className="aspect-video">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">
                  {new Date(item.created_at).toLocaleDateString()}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <a
                  href={`/content/${item.id}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {content.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No content found</h3>
            <p className="text-gray-600">
              We couldn't find any {contentType} content at the moment. Please check back later.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 BootUp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ContentList; 