import React, { useState, useEffect, createContext } from 'react';
import { getTags, getLanguages } from '../services/api.service';
import { Language, Tag } from '../types/api.types';

type AppContextType = {
  fetching: boolean;
  tags: Tag[];
  languages: Language[];
};

const initialState: AppContextType = {
  fetching: false,
  tags: [],
  languages: [],
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider: React.FunctionComponent = ({ children }) => {
  const [fetching, setFetching] = useState<boolean>(true);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Languagesdata = await getLanguages();
        const tagsData = await getTags();
        setLanguages(Languagesdata);
        setTags(tagsData);
        setFetching(false);
      } catch (e) {
        setFetching(false);
      }
    };
    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ fetching, tags, languages }}>
      {children}
    </AppContext.Provider>
  );
};
