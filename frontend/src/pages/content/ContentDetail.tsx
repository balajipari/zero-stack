import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { contentService } from '../../services/contentService';
import type { Content } from '../../services/contentService';

const ContentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      if (!id) return;

      try {
        const data = await contentService.getContentById(id);
        setContent(data);
      } catch (err) {
        setError('Failed to fetch content. Please try again later.');
        console.error('Error fetching content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading content...</div>;
  }

  if (error || !content) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error || 'Content not found'}
      </div>
    );
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-blue-600 hover:text-blue-800 flex items-center"
        >
          ← Back to {content.type === 'blog' ? 'Blogs' : content.type === 'case-study' ? 'Case Studies' : 'Podcasts'}
        </button>

        {/* Content Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{content.title}</h1>
          <div className="text-sm text-gray-500">
            {new Date(content.created_at).toLocaleDateString()}
          </div>
        </div>

        {/* Featured Image */}
        {content.image_url && (
          <div className="mb-8">
            <img
              src={content.image_url}
              alt={content.title}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Content Body */}
        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: content.content }} />
        </div>

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this {content.type}</h3>
          <div className="flex space-x-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(content.title)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(content.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              LinkedIn
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              Facebook
            </a>
          </div>
        </div>
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

export default ContentDetail; 