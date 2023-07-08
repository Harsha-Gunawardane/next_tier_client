import { apiSlice } from "../../app/api/apiSlice"
import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";

const studentAdapter = createEntityAdapter({})
const initialState = studentAdapter.getInitialState()

export const studentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getStudent: builder.query({
            query: ({ username }) => `/user${username}`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                return studentAdapter.setOne(initialState, responseData)
            }
        })
    })
})

export const {
    useGetStudentQuery
} = studentApiSlice

export const selectStudentResult = studentApiSlice.endpoints.getStudent.select()

const selectStudentData = createSelector(
    selectStudentResult,
    studentResult => studentResult.data
)

export const {
    selectByUsername: selectStudent
} = studentAdapter.getSelectors(state => selectStudentData(state) ?? initialState)