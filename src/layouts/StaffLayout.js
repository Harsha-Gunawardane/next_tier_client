import React from 'react'
import { Outlet } from 'react-router-dom'

function StaffLayout() {

  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default StaffLayout