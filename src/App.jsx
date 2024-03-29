import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './components/layouts/MainLayout';

import { Home, NotFound } from './pages';

function App() {
   return (
      <Routes>
         <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
         </Route>
      </Routes>
   );
}

export default App;
