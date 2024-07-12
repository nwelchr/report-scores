import SelectEntrant from "../steps/SelectEntrant";
import OpponentConfirmation from "../steps/OpponentConfirmation";
import OpponentSelection from "../steps/OpponentSelection";
import BestOf from "../steps/BestOf";
import ScoreInput from "../steps/ScoreInput";
import SubmissionConfirmation from "../steps/SubmissionConfirmation";

const stepsGraph = {
  selectEntrant: {
    component: SelectEntrant,
    next: ["confirmOpponent", "selectOpponent"],
    decideNextStep: (state) =>
      state.filteredSets.length === 1 ? "confirmOpponent" : "selectOpponent",
    prev: [],
  },
  confirmOpponent: {
    component: OpponentConfirmation,
    next: ["bestOf", "selectOpponent"],
    decideNextStep: (state, action) =>
      action === "yes" ? "bestOf" : "selectOpponent",
    prev: ["selectEntrant"],
  },
  selectOpponent: {
    component: OpponentSelection,
    next: ["bestOf"],
    decideNextStep: () => "bestOf",
    prev: ["confirmOpponent"],
  },
  bestOf: {
    component: BestOf,
    next: ["scoreInput"],
    decideNextStep: () => "scoreInput",
    prev: ["confirmOpponent", "selectOpponent"],
  },
  scoreInput: {
    component: ScoreInput,
    next: ["submissionConfirmation"],
    decideNextStep: () => "submissionConfirmation",
    prev: ["bestOf"],
  },
  submissionConfirmation: {
    component: SubmissionConfirmation,
    next: [],
    decideNextStep: () => null,
    prev: ["scoreInput"],
  },
};

export default stepsGraph;
