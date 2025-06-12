import React, { useRef, useState } from 'react';

interface FileUploadProps {
  meetupId: string;
  onUpload: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ meetupId, onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // Replace with real API call
      const formData = new FormData();
      formData.append('photo', file);
      await fetch(`/api/meetups/${meetupId}/photos`, {
        method: 'POST',
        body: formData,
      });
      setSuccess(true);
      onUpload();
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch {
      setError('Failed to upload photo. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-[#232B36] mb-2">Upload Photo</label>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        disabled={loading}
      />
      {loading && <div className="text-gray-500 mt-2">Uploading...</div>}
      {error && <div className="text-red-600 mt-2">{error}</div>}
      {success && <div className="text-green-600 mt-2">Photo uploaded successfully!</div>}
    </div>
  );
};

export default FileUpload; 