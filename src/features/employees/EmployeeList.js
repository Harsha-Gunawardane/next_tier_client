import React from "react";
import { useGetEmployeesQuery } from "./employeesApiSlice";

const EmployeeList = () => {
  const {
    data: employees,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetEmployeesQuery("employeesList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    content = JSON.stringify(employees);
  }

  return (
    <main>
      <p>{content}</p>
    </main>
  );
};

export default EmployeeList;
