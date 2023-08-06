import { create } from 'zustand';

interface BearState {
    surveyResult: object,
    balanceData: object
  }

const useStore = create<BearState>()((set,get) => ({
    // general
    surveyResult: [],
    balanceData: {},
    
}))

export default useStore;