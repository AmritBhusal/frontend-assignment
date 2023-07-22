import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Pages/Home';
import NavigationBar from './Navbar/Navbar';

const App = () => {
  return (
    <BrowserRouter>
    <NavigationBar />
      <Home />
    </BrowserRouter>
  );
};

export default App;
