import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useGuardianInfo = create()(
  devtools(
    persist(
      (set) => ({
        fName: "",
        address: "",
        phoneNo: "",

        setFName: (value) => set(() => ({ fName: value })),
        setAddress: (value) => set(() => ({ address: value })),
        setPhoneNo: (value) => set(() => ({ phoneNo: value })),
      }),
      { name: "guardianInfo" }
    )
  )
);