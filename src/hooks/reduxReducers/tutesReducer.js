import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useAxiosPrivate from "../useAxiosPrivate";
import * as Action from "../../redux/tutesSlice";

const TUTES_URL = "/stu/tutes";

export const useFetchTutes = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  useEffect(() => {
    const getTutes = async () => {
      setData((prev) => ({ ...prev, isLoading: true }));
      try {
        const response = await axiosPrivate.get(TUTES_URL);

        console.log(response?.data?.data);
        const data = response?.data?.data;

        if (data) {
          setData((prev) => ({ ...prev, isLoading: false, apiData: data }));
        }

        dispatch(Action.initialize(data));
      } catch (error) {
        setData((prev) => ({
          ...prev,
          isLoading: false,
          serverError: error?.response?.data?.error,
        }));
      } finally {
        setData((prev) => ({ ...prev, isLoading: false }));
      }
    };

    getTutes();
  }, [dispatch, axiosPrivate]);

  return data;
};

export const addPage = (id, name) => async (dispatch) => {
    try {
        await dispatch(Action.addPage({id, name}))
    } catch (error) {
        console.log(error);
    }
}

export const setCurrentPage = (id, name, content) => async (dispatch) => {
  try {
      await dispatch(Action.setCurrentPage({id, name, content}))
  } catch (error) {
      console.log(error);
  }
}