import { create } from "zustand";
import { devtools } from "zustand/middleware";
import api from "../api/axios";
// import useAxiosPrivate from "../hooks/useAxiosPrivate"; // Remove this line

// Define the Zustand store
const StaffStore = (set) => ({
  staffs: [],
  staff: null, // Add a property to store the single staff

  fetchStaffs: async () => {
    try {
      const axiosPrivate = import("../hooks/useAxiosPrivate"); // Import here
      const response = await axiosPrivate.get("/tutor/staffs");
      if (!response) {
        set({ staffs: [] });
      }
      set({ staffs: response.data });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  },

  addStaff: (newStaff) =>
    set((state) => ({ staffs: [...state.staffs, newStaff] })),

  deleteStaff: (id) =>
    set((state) => ({
      staffs: state.staffs.filter((staff) => staff.id !== id),
    })),

  fetchSingleStaff: async (id) => {
    try {
      const response = await api.get(`/staffs/${id}`);
      if (response.data) {
        set({ staff: response.data });
      } else {
        // If staff not found, set it to null
        set({ staff: null });
      }
    } catch (error) {
      console.log(error.response.data);
      // If there's an error, set staff to null
      set({ staff: null });
    }
  },
});

// Create the Zustand store with devtools middleware
const useStaffStore = create(devtools(StaffStore));

export default useStaffStore;
