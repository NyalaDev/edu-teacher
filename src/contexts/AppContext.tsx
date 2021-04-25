import React, { useEffect, createContext, useReducer } from 'react';
import { getTags, getLanguages } from '../services/api.service';

import { reducer, AppState, AppAactions, Action } from './app.reducer';

const initialState: AppState = {
  fetching: true,
  tags: [],
  languages: [],
  isSidebarOpen: false,
};

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export const AppProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const languages = await getLanguages();
        const tags = await getTags();
        dispatch({ type: AppAactions.setLanguages, payload: languages });
        dispatch({ type: AppAactions.setTags, payload: tags });
      } finally {
        dispatch({ type: AppAactions.setFetching, payload: false });
      }
    };
    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
