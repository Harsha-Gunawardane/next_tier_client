import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useUserInfo = create()(
  devtools(
    persist(
      (set) => ({
        allUsers: [],
        activeUsers: [],
        pendingUsers: [],
        blockedUsers: [],
        allUsersPageNo: 0,
        activeUsersPageNo: 0,
        pendingUsersPageNo: 0,
        blockedUsersPageNo: 0,

        setAllUsers: (value) => set(() => ({ allUsers: value })),
        setActiveUsers: (value) => set(() => ({ activeUsers: value })),
        setPendingUsers: (value) => set(() => ({ pendingUsers: value })),
        setBlockedUsers: (value) => set(() => ({ pendingUsers: value })),

        setAllUsersPageNo: () =>
          set((state) => ({ allUsersPageNo: state.allUsersPageNo + 1 })),
        setActiveUsersPageNo: () =>
          set((state) => ({ activeUsersPageNo: state.activeUsersPageNo + 1 })),
        setPendingUsersPageNo: () =>
          set((state) => ({
            pendingUsersPageNo: state.pendingUsersPageNo + 1,
          })),
        setBlockedUsersPageNo: () =>
          set((state) => ({
            blockedUsersPageNo: state.blockedUsersPageNo + 1,
          })),

        setPushToAllUsers: (value) =>
          set((state) => ({ allUsers: [...state.allUsers, value] })),
        setPushToActiveUsers: (value) =>
          set((state) => ({ activeUsers: [...state.activeUsers, value] })),
        setPushToPendingUsers: (value) =>
          set((state) => ({ pendingUsers: [...state.pendingUsers, value] })),
        setPushToBlockedUsers: (value) =>
          set((state) => ({ blockedUsers: [...state.blockedUsers] })),
      }),
      { name: "adminsInfo" }
    )
  )
);
