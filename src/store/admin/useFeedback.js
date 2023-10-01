import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useFeedback = create()(
  devtools(
    persist(
      (set) => ({
        allFeedbacks: [],
        newFeedbacks: [],
        inActionFeedbacks: [],

        setAllFeedbacks: (value) =>
          set(() => ({
            allFeedbacks: value,
            newFeedbacks: value.filter((feedback) => feedback.status === "NEW"),
            inActionFeedbacks: value.filter(
              (feedback) => feedback.status === "IN_ACTION"
            ),
          })),

        removeFeedback: (id, status) => {
          set((state) => {
            // Use filter to create a new array without the feedback with the specified id
            const updatedAllFeedbacks = state.allFeedbacks.filter(
              (feedback) => feedback.id !== id
            );

            // Update the other filtered arrays as well
            let updatedNewFeedbacks = state.newFeedbacks;
            let updatedInActionFeedbacks = state.inActionFeedbacks;

            if (status === "NEW") {
              updatedNewFeedbacks = updatedAllFeedbacks.filter(
                (feedback) => feedback.status === "NEW"
              );
            } else if (status === "IN_ACTION") {
              updatedInActionFeedbacks = updatedAllFeedbacks.filter(
                (feedback) => feedback.status === "IN_ACTION"
              );
            }

            return {
              allFeedbacks: updatedAllFeedbacks,
              newFeedbacks: updatedNewFeedbacks,
              inActionFeedbacks: updatedInActionFeedbacks,
            };
          });
        },

        updateStatus: (id) => {
          set((state) => {
            // Create a copy of allFeedbacks with the updated status
            const updatedAllFeedbacks = state.allFeedbacks.map((feedback) => {
              if (feedback.id === id) {
                return { ...feedback, status: "IN_ACTION" };
              }
              return feedback;
            });

            // Update the other filtered arrays as well
            const updatedNewFeedbacks = updatedAllFeedbacks.filter(
              (feedback) => feedback.status === "NEW"
            );
            const updatedInActionFeedbacks = updatedAllFeedbacks.filter(
              (feedback) => feedback.status === "IN_ACTION"
            );

            return {
              allFeedbacks: updatedAllFeedbacks,
              newFeedbacks: updatedNewFeedbacks,
              inActionFeedbacks: updatedInActionFeedbacks,
            };
          });
        }
      }),
      { name: "feedbacks" }
    )
  )
);
