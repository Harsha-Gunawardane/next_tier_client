import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useStudentInfo = create()(
  devtools(
    persist(
      (set) => ({
        fName: "",
        lName: "",
        address: "",
        dob: "",
        medium: "",
        stream: "",
        college: "",
        phoneNo: "",
        NIC: "",

        setFName: (value) => set(() => ({ fName: value })),
        setLName: (value) => set(() => ({ lName: value })),
        setAddress: (value) => set(() => ({ address: value })),
        setDob: (value) => set(() => ({ dob: value })),
        setMedium: (value) => set(() => ({ medium: value })),
        setStream: (value) => set(() => ({ stream: value })),
        setCollege: (value) => set(() => ({ college: value })),
        setPhoneNo: (value) => set(() => ({ phoneNo: value })),
        setNIC: (value) => set(() => ({ NIC: value }))
      }),
      { name: "studentInfo" }
    )
  )
);
