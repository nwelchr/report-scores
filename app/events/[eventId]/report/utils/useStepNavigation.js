import { useState, useCallback } from "react";

const useStepNavigation = (initialStep, stepsGraph) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [history, setHistory] = useState([initialStep]);

  const goToNextStep = useCallback(
    (state, action) => {
      console.log({ state });
      const nextStep = stepsGraph[currentStep].decideNextStep(state, action);
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
      console.log({ currentStep });
      const StepComponent = stepsGraph[currentStep].component;
      return <StepComponent {...props} />;
    },
    [currentStep, stepsGraph]
  );

  return { currentStep, goToNextStep, goBack, renderStep };
};

export default useStepNavigation;
