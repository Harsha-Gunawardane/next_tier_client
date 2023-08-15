import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useUserInfo = create()(
  devtools(
    persist(
      (set) => ({
        fName: "",
        lName: "",
        userRole: "",

        setFName: (value) => set(() => ({ fName: value })),
        setLName: (value) => set(() => ({ lName: value })),
        setUserRole: (value) => set(() => ({ userRole: value })),
      }),
      { name: "userInfo" }
    )
  )
);