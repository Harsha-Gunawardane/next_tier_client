import * as Action from "../../redux/tuteSlice";

export const createTute = (id, name, content) => async (dispatch) => {
  try {
    await dispatch(Action.createTute({ id, name, content }));
  } catch (error) {
    console.log(error);
  }
};
