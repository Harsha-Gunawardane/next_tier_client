import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const employeesAdapter = createEntityAdapter({})

const initialState = employeesAdapter.getInitialState()

export const employeesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEmployees: builder.query({
            query: () => '/employees',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedEmployees = responseData.map(employee => {
                    return employee
                })
                return employeesAdapter.setAll(initialState, loadedEmployees)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return [
                        {type: 'Employee', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'Employee', id}))
                    ]
                } else return [{type: 'Employee', id: 'LIST'}]
            }

        })
    })
})

export const {
    useGetEmployeesQuery
} = employeesApiSlice

export const selectEmployeesResult = employeesApiSlice.endpoints.getEmployees.select()

const selectEmployeesData = createSelector(
    selectEmployeesResult,
    employeesResult => employeesResult.data
)

export const {
    selectAll: selectAllEmployees
} = employeesAdapter.getSelectors(state => selectEmployeesData(state) ?? initialState)