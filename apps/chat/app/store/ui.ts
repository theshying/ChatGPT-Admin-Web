import { create } from "zustand";
export type UiStore = {
  modal: {
    login: boolean;
  };
  setModalLogin: (login: boolean) => void;
};
const useUiStore = create<UiStore>((set) => ({
  modal: {
    login: false,
  },
  setModalLogin: (login: boolean) =>
    set((state) => ({ modal: { ...state.modal, login } })),
}));

export default useUiStore;
