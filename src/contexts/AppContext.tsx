import React, { useState, useEffect, createContext } from 'react';
import { getTags, getLanguages } from '../services/api.service';
import { Language, Tag } from '../types/api.types';

type AppContextType = {
  fetching: boolean | undefined;
  tags: Tag[] | undefined;
  languages: Language[] | undefined;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FunctionComponent = ({ children }) => {
  const [fetching, setFetching] = useState<boolean>(true);
  const [languages, setLanguages] = useState<Language[] | undefined>(undefined);
  const [tags, setTags] = useState<Tag[] | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Languagesdata = await getLanguages();
        const tagsData = await getTags();
        setLanguages(Languagesdata);
        setTags(tagsData);
        setFetching(false);
      } catch (e) {
        setLanguages([]);
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
