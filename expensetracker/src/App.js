import React from 'react';
import Wallet from './component/wallet';   
import Circles from './component/circle';


const App = () => {
  return (
    <div>
      <Circles/>
      <div className="expense">
        <Wallet/>
      </div>
    </div>
  );
};

export default App;



