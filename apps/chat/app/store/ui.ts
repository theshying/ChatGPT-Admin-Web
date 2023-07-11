import { create } from "zustand";
export type UiStore = {
  loginModal: {
    show: boolean;
    setShow: (show: boolean) => void;
  };
  profileModal: {
    show: boolean;
    setShow: (show: boolean) => void;
  };
};
const useUiStore = create<UiStore>((set) => ({
  loginModal: {
    show: false,
    setShow(show) {
      set((state) => ({
        ...state,
        loginModal: {
          ...state.loginModal,
          show,
        },
      }));
    },
  },
  profileModal: {
    show: false,
    setShow(show) {
      set((state) => ({
        ...state,
        profileModal: {
          ...state.profileModal,
          show,
        },
      }));
    },
  },
}));

export default useUiStore;
