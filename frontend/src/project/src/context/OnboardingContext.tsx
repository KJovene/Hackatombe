import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { OnboardingState, Tag, ContentType } from '../types';
import { initialTags, initialContentTypes } from '../data/mockData';

// Define action types
type Action =
  | { type: 'TOGGLE_TAG'; payload: string }
  | { type: 'TOGGLE_CONTENT_TYPE'; payload: string }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' };

// Initial state
const initialState: OnboardingState = {
  tags: initialTags,
  contentTypes: initialContentTypes,
  currentStep: 0,
  searchQuery: '',
};

// Create context
const OnboardingContext = createContext<{
  state: OnboardingState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Reducer function
function onboardingReducer(state: OnboardingState, action: Action): OnboardingState {
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

// Provider component
interface OnboardingProviderProps {
  children: ReactNode;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  return (
    <OnboardingContext.Provider value={{ state, dispatch }}>
      {children}
    </OnboardingContext.Provider>
  );
};

// Hook for using the context
export const useOnboarding = () => useContext(OnboardingContext);