import React from 'react';
import { useResources } from '../api/hooks';

const Resources: React.FC = () => {
  const { data, isLoading, isError } = useResources();

  return (
    <div className="min-h-screen bg-[#FCFAF7]">
      {/* Header Navigation */}
      <header className="w-full flex justify-end items-center px-12 py-8">
        <nav className="flex space-x-10 text-base font-medium text-[#6D666F]">
          <a href="/login" className="hover:text-[#1A223E] transition">Member's Login</a>
          <a href="/contact" className="hover:text-[#1A223E] transition">Contact</a>
          <a href="/write" className="hover:text-[#1A223E] transition">Write for Us</a>
          <a href="/about" className="hover:text-[#1A223E] transition">About</a>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#232B36] mb-6">Resources</h1>
          <p className="text-xl text-[#6D666F] max-w-2xl mx-auto">
            Access our curated collection of resources to help you grow in your tech and product journey.
          </p>
        </section>

        {/* Loading and Error States */}
        {isLoading && (
          <div className="text-center text-lg text-[#6D666F] mb-16">Loading resources...</div>
        )}
        {isError && (
          <div className="text-center text-red-600 mb-16">Failed to load resources. Please try again later.</div>
        )}

        {/* Resource Categories */}
        {!isLoading && !isError && data && (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Blog Posts */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <h2 className="text-2xl font-semibold text-[#232B36] mb-4">Blog Posts</h2>
              <p className="text-[#6D666F] mb-6">Latest insights and articles from our community.</p>
              <a href="/blog" className="text-[#1A223E] font-medium hover:underline">Browse Posts →</a>
            </div>
            {/* Case Studies */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <h2 className="text-2xl font-semibold text-[#232B36] mb-4">Case Studies</h2>
              <p className="text-[#6D666F] mb-6">Real-world examples and success stories.</p>
              <a href="/case-studies" className="text-[#1A223E] font-medium hover:underline">View Cases →</a>
            </div>
            {/* Podcasts */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <h2 className="text-2xl font-semibold text-[#232B36] mb-4">Podcasts</h2>
              <p className="text-[#6D666F] mb-6">Listen to industry experts and community members.</p>
              <a href="/podcasts" className="text-[#1A223E] font-medium hover:underline">Listen Now →</a>
            </div>
          </section>
        )}

        {/* Featured Resources */}
        {!isLoading && !isError && data && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#232B36] mb-8">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.featuredResources && data.featuredResources.length > 0 ? (
                data.featuredResources.map((resource) => (
                  <div key={resource.id} className="bg-white rounded-xl p-6 shadow-sm">
                    {resource.imageUrl ? (
                      <img src={resource.imageUrl} alt={resource.title} className="aspect-video object-cover rounded-lg mb-4" />
                    ) : (
                      <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
                    )}
                    <h3 className="text-xl font-semibold text-[#232B36] mb-2">{resource.title}</h3>
                    <p className="text-[#6D666F] mb-2">{resource.description}</p>
                    <a href={resource.url} className="text-[#1A223E] font-medium hover:underline" target="_blank" rel="noopener noreferrer">
                      View Resource →
                    </a>
                  </div>
                ))
              ) : (
                <div className="text-[#6D666F]">No featured resources available.</div>
              )}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="text-center bg-[#1A223E] text-white rounded-xl p-12 mb-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Dive Deeper?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community to access exclusive resources and connect with like-minded individuals.
          </p>
          <a
            href="/register"
            className="inline-block px-8 py-3 bg-white text-[#1A223E] rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Join Now
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-sm text-[#6D666F] bg-transparent">
        &copy; {new Date().getFullYear()} ZeroStack. All rights reserved.
      </footer>
    </div>
  );
};

export default Resources; 