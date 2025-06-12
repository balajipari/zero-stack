import React, { useEffect, useState } from 'react';

interface Photo {
  id: string;
  photo_url: string;
}

interface PhotoGalleryProps {
  meetupId: string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ meetupId }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        // Replace with real API call
        const response = await fetch(`/api/meetups/${meetupId}/photos`);
        const data = await response.json();
        setPhotos(data);
      } catch {
        setError('Failed to load photos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [meetupId]);

  if (loading) {
    return <div className="text-gray-500">Loading photos...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (photos.length === 0) {
    return <div className="text-gray-500">No photos yet.</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={photo.photo_url}
          alt="Meetup photo"
          className="w-full h-48 object-cover rounded-lg shadow"
        />
      ))}
    </div>
  );
};

export default PhotoGallery; 