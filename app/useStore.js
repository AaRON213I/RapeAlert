import { create } from 'zustand'

const useStore = create((set) => ({
  UserinStore: null,
  isAuthenticated: false,
  storeUserinStore: (data) => set(() => ({ UserinStore: data, isAuthenticated: true })),
  removeAllUserinStore: () => set({ UserinStore: undefined }), // Or set to null if you prefer
  updateUserinStore: (newUserinStore) => set({ UserinStore: newUserinStore }),
}))

export default useStore;
