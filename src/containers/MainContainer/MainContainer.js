import React from 'react';
import './MainContainer.css';

const MainContainer = ({ children }) => {
  return (
    <main className="MainContainer">
      {children}
    </main>
  );
};

export default MainContainer;
