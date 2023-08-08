import { create } from 'zustand';

interface BearState {
    surveyResult: any,
    answers: Array<object>,
    balanceData: object,
    contractAddress: String,
  }

const useStore = create<BearState>()((set,get) => ({
    // general
    surveyResult: [],
    answers: [],
    balanceData: {},
    contractAddress: "0x437eF217203452317C3C955Cf282b1eE5F6aaF72",
    
}))

export default useStore;