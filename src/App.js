
import './App.css';
import React, {useState} from 'react'
import ButtonValues from './components/ButtonValues';

function App() {
  const [displayValue, setDisplayValue] = useState('0')

  


  return (
    <div className="App">
      <div className='button-row'>
      <div className='display' >
        {displayValue}
      </div>
        <div 
            className="buttons">
          <ButtonValues
          setDisplayValue={setDisplayValue}
          displayValue={displayValue}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
