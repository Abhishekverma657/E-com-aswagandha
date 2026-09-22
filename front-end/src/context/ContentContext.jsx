import { createContext, useContext, useState, useEffect } from 'react';

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(null);
  const [loadingContent, setLoadingContent] = useState(true);
  const [contentError, setContentError] = useState(null);

  const fetchContent = async () => {
    setLoadingContent(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/content`);
      if (!res.ok) throw new Error('Failed to fetch storefront content');
      const data = await res.json();
      setContent(data);
      setContentError(null);
    } catch (err) {
      console.error(err);
      setContentError(err.message);
    } finally {
      setLoadingContent(false);
    }
  };

  useEffect(() => {
    // If inside a preview iframe or preview session, check sessionStorage first
    try {
      const previewData = sessionStorage.getItem('nagori_preview_content');
      if (previewData) {
        setContent(JSON.parse(previewData));
      }
    } catch (_) {}

    fetchContent();

    // Listen for real-time live preview updates from parent admin editor
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'NAGORI_PREVIEW_UPDATE' && event.data.content) {
        setContent(event.data.content);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <ContentContext.Provider value={{ content, setContent, loadingContent, contentError, refreshContent: fetchContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
