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
    fetchContent();
  }, []);

  return (
    <ContentContext.Provider value={{ content, loadingContent, contentError, refreshContent: fetchContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
