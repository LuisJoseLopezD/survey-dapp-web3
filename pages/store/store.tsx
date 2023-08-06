import { create } from 'zustand';

interface BearState {
    surveyResult: object
  }

const useStore = create<BearState>()((set,get) => ({
    // general
    surveyResult: [],
    
}))

export default useStore;