import { useState, useCallback } from "react";

const useStepNavigation = (initialStep, stepsGraph) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [history, setHistory] = useState([initialStep]);

  const goToNextStep = useCallback(
    (state) => {
      const nextStep = stepsGraph[currentStep].nextCondition
        ? stepsGraph[currentStep].nextCondition(state)
        : stepsGraph[currentStep].next[0];
      setHistory((prevHistory) => [...prevHistory, nextStep]);
      setCurrentStep(nextStep);
    },
    [currentStep, stepsGraph]
  );

  const goBack = useCallback(() => {
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      newHistory.pop();
      setCurrentStep(newHistory[newHistory.length - 1]);
      return newHistory;
    });
  }, []);

  const renderStep = useCallback(
    (props) => {
      const StepComponent = stepsGraph[currentStep].component;
      return <StepComponent {...props} />;
    },
    [currentStep, stepsGraph]
  );

  return { currentStep, goToNextStep, goBack, renderStep };
};

export default useStepNavigation;
