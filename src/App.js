import './App.css';

import { Routes, Route } from 'react-router-dom';

// import layout
import Layout from './components/layout/Layout'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes  */}
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />

        {/* protected routes */}
      </Route>
    </Routes>
  );
}

export default App;
