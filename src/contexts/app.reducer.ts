import { Language, Tag } from '../types/api.types';

export type Action = {
  type: string;
  payload?: unknown;
};

export type AppState = {
  fetching: boolean;
  tags: Tag[];
  languages: Language[];
  isSidebarOpen: boolean;
};

export const AppAactions = {
  toggleSideBar: 'toggleSideBar',
  setFetching: 'setFetching',
  setTags: 'setTags',
  setLanguages: 'setLanguages',
};

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case AppAactions.setFetching:
      return { ...state, fetching: action.payload } as AppState;
    case AppAactions.toggleSideBar:
      return { ...state, isSidebarOpen: !state.isSidebarOpen } as AppState;
    case AppAactions.setTags:
      return { ...state, tags: action.payload } as AppState;
    case AppAactions.setLanguages:
      return { ...state, languages: action.payload } as AppState;
    default:
      return state;
  }
};
