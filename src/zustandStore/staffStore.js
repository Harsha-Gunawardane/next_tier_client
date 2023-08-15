import { create } from "zustand";
import { devtools } from "zustand/middleware";
import api from "../api/axios";
// import { persist } from "zustand/middleware";

const StaffStore = (set) => ({
  staffs: [],

  fetchStaffs: async () => {
    try {
      const response = await api.get("/staffs");
      if (!response) {
        set({ staffs: [] });
      }
      set({ staffs: response.data });
    } catch (error) {
      console.log(error.response.data);
    }
  },

  addStaffs: (newStaff) =>
    set((state) => ({ staffs: [...state.staffs, newStaff] })),

  deleteStaff: (id) =>
    set((state) => ({
      staffs: state.staffs.filter((staff) => staff.id !== id),
    })),
});

const useStaffStore = create(devtools(StaffStore));

export default useStaffStore;
