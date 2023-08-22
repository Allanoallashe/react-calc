import React, { useEffect, useState } from 'react'

const btnValues = [
  'C', 'sin', 'cos', 'tan', 'log', 'sqrt', '^','OFF',
  '7', '8', '9', '/',
  '4', '5', '6', '*',
  '1', '2', '3', '-',
  '0', '.', '+', '=',
  ]

const ButtonValues = ({ setDisplayValue, displayValue }) => {

  const [keyBuffer, setKeyBuffer] = useState('');
  const [lastKeyPressed, setLastKeyPressed] = useState('');
  const [exponentBuffer, setExponentBuffer] = useState(null); 


const handleKeyDown = (event) => {
  const key = event.key;

  if (/^[0-9]$/.test(key)) {
    event.preventDefault();
    handleButtonClick(key);
  } else if (/^[+\-*/.^]$/.test(key)) {
    event.preventDefault();
    if (key === '^') {
      setKeyBuffer(''); // Clear keyBuffer for exponent input
      handleButtonClick('^'); // Handle '^' separately
    } else if (!isNaN(displayValue.slice(-1))) {
      handleButtonClick(key);
    }
  } else if (key === 'Enter') {
    event.preventDefault();
    handleButtonClick('=');
  } else if (key === 'Backspace') {
    event.preventDefault();
    if (displayValue.length > 0) {
      setDisplayValue(displayValue.slice(0, -1));
      setKeyBuffer(keyBuffer.slice(0, -1)); // Remove the last character from keyBuffer
    }
  }

  // Don't set the keyBuffer here
};

  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyBuffer]);


const handleButtonClick = (value) => {
  if (value === '=') {
    try {
      let result = displayValue;
      if (exponentBuffer !== null) {
        const base = parseFloat(exponentBuffer);
        const exponent = parseFloat(displayValue);
        result = Math.pow(base, exponent);
      } else {
        result = new Function('return ' + displayValue)();
      }
      setDisplayValue(formatResult(result));
    } catch (err) {
      setDisplayValue('Error');
    }
    setKeyBuffer('');
    setExponentBuffer(null); // Reset exponentBuffer
  } else if (value === 'C') {
    setDisplayValue('0');
    setKeyBuffer('');
    setExponentBuffer(null); // Reset exponentBuffer
  } else if (['sin', 'cos', 'tan'].includes(value)) {
    const radians = (Math.PI / 180) * parseFloat(displayValue);
    let result;
    if (value === 'sin') result = Math.sin(radians);
    else if (value === 'cos') result = Math.cos(radians);
    else if (value === 'tan') result = Math.tan(radians);
    setDisplayValue(formatResult(result));
    setKeyBuffer('');
    setExponentBuffer(null); // Reset exponentBuffer
    setLastKeyPressed('='); // Reset lastKeyPressed when trigonometric button is clicked
  } else if (value === 'log') {
    const result = Math.log10(parseFloat(displayValue));
    setDisplayValue(formatResult(result));
    setKeyBuffer('');
    setExponentBuffer(null); // Reset exponentBuffer
  } else if (value === 'sqrt') {
    const result = Math.sqrt(parseFloat(displayValue));
    setDisplayValue(formatResult(result));
    setKeyBuffer('');
    setExponentBuffer(null); // Reset exponentBuffer
  } else if (value === '^') {
    if (!isNaN(displayValue)) {
      setExponentBuffer(displayValue); // Capture the base value
      setDisplayValue(displayValue + '^'); // Display the base with '^'
      setKeyBuffer('');
      setLastKeyPressed('^'); // Set lastKeyPressed to '^'
    }
  } else if (['+', '-', '*', '/'].includes(value)) {
    if (!isNaN(keyBuffer) && !isNaN(displayValue.slice(-1))) {
      setDisplayValue(displayValue + value);
    }
  } else if (value === 'OFF') {
    setDisplayValue('');
    setKeyBuffer('');
    setExponentBuffer(null); // Reset exponentBuffer
  } else {
    if (displayValue === '0' || displayValue === 'Error' || lastKeyPressed === '=' || ['sin', 'cos', 'tan'].includes(lastKeyPressed)) {
      setDisplayValue(value);
    } else if (value === '.' && displayValue.includes('.')) {
      return;
    } else {
      setDisplayValue(displayValue + value);
    }
  }

  if (/^[0-9]$/.test(value)) {
    setKeyBuffer(keyBuffer + value);
    if (exponentBuffer !== null) {
      setExponentBuffer(exponentBuffer + value);
    }
  } else if (value === '^') {
    setKeyBuffer('');
  } else {
    setKeyBuffer('');
    setExponentBuffer(null);
  }

  setLastKeyPressed(value);
};






const formatResult = (value) => {
  const roundedValue = parseFloat(value).toFixed(8);
  const parts = roundedValue.split('.');
  if (parts[1] === '00000000') {
    return parts[0]; // Remove decimal point if all digits are zero
  }
  return roundedValue;
};



  return btnValues.map((value) => (
    <button
      className='simple-buttons'
      key={value}
      onClick={()=>handleButtonClick(value)}
    >
      {value}
    </button>
  ))
}

export default ButtonValues