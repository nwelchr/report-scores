import SelectEntrant from "../steps/SelectEntrant";
import OpponentConfirmation from "../steps/OpponentConfirmation";
import OpponentSelection from "../steps/OpponentSelection";
import BestOf from "../steps/BestOf";
import ScoreInput from "../steps/ScoreInput";
import SubmissionConfirmation from "../steps/SubmissionConfirmation";

const stepsGraph = {
  selectEntrant: {
    component: SelectEntrant,
    next: ["confirmOpponent"],
    prev: [],
  },
  confirmOpponent: {
    component: OpponentConfirmation,
    next: ["selectOpponent", "bestOf"],
    nextCondition: (state) =>
      state.filteredSets.length > 1 ? "selectOpponent" : "bestOf",
    prev: ["selectEntrant"],
  },
  selectOpponent: {
    component: OpponentSelection,
    next: ["bestOf"],
    prev: ["confirmOpponent"],
  },
  bestOf: {
    component: BestOf,
    next: ["scoreInput"],
    prev: ["confirmOpponent", "selectOpponent"],
  },
  scoreInput: {
    component: ScoreInput,
    next: ["submissionConfirmation"],
    prev: ["bestOf"],
  },
  submissionConfirmation: {
    component: SubmissionConfirmation,
    next: [],
    prev: ["scoreInput"],
  },
};

export default stepsGraph;
