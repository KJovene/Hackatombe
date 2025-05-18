import React, { createContext, useContext, useReducer } from 'react';
import { initialTags, initialContentTypes } from '../data/mockData';

const OnboardingContext = createContext({
  state: {
    tags: initialTags,
    contentTypes: initialContentTypes,
    currentStep: 0,
    searchQuery: '',
  },
  dispatch: () => null,
});

function onboardingReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_TAG':
      return {
        ...state,
        tags: state.tags.map((tag) =>
          tag.id === action.payload ? { ...tag, selected: !tag.selected } : tag
        ),
      };
    case 'TOGGLE_CONTENT_TYPE':
      return {
        ...state,
        contentTypes: state.contentTypes.map((type) =>
          type.id === action.payload ? { ...type, selected: !type.selected } : type
        ),
      };
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(0, state.currentStep - 1),
      };
    default:
      return state;
  }
}

export const OnboardingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(onboardingReducer, {
    tags: initialTags,
    contentTypes: initialContentTypes,
    currentStep: 0,
    searchQuery: '',
  });

  return (
    <OnboardingContext.Provider value={{ state, dispatch }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);