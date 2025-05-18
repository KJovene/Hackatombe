import { OnboardingProvider, useOnboarding } from '../context/OnboardingContext';
import Header from '../components/ui/Header';
import TagSelectionPage from '../components/onboarding/TagSelectionPage';
import ContentTypeSelectionPage from '../components/onboarding/ContentTypeSelectionPage';
import SuccessPage from '../components/onboarding/SuccessPage';

const OnboardingSteps = () => {
  const { state } = useOnboarding();
  const { currentStep } = state;

  return (
    <div className="min-h-screen flex flex-col">
      {currentStep === 0 && <TagSelectionPage />}
      {currentStep === 1 && <ContentTypeSelectionPage />}
      {currentStep === 2 && <SuccessPage />}
    </div>
  );
};

const Onboarding = () => {
  return (
    <OnboardingProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <OnboardingSteps />
      </div>
    </OnboardingProvider>
  );
};

export default Onboarding;