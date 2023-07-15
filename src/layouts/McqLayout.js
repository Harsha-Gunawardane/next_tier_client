import React from 'react'
import { Outlet } from 'react-router-dom'

function McqLayout() {

  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default McqLayout