import { useState } from "react";

const useStepNavigation = (initialStep, graph) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const goToNextStep = (state) => {
    const nextStep = graph[currentStep].nextCondition
      ? graph[currentStep].nextCondition(state)
      : graph[currentStep].next[0];

    if (nextStep && graph[nextStep]) {
      setCurrentStep(nextStep);
    }
  };

  const goBack = () => {
    const prevSteps = graph[currentStep].prev;
    if (prevSteps.length > 0) {
      setCurrentStep(prevSteps[prevSteps.length - 1]);
    }
  };

  const renderStep = (props) => {
    const StepComponent = graph[currentStep].component;
    return <StepComponent {...props} />;
  };

  return { currentStep, goToNextStep, goBack, renderStep };
};

export default useStepNavigation;
