import React from 'react'

const btnValues = [
  'C', 'sin', 'cos', 'tan', 'log', 'sqrt', '^','OFF',
  '7', '8', '9', '/',
  '4', '5', '6', '*',
  '1', '2', '3', '-',
  '0', '.', '+', '=',
  ]

const ButtonValues = ({ setDisplayValue, displayValue }) => {
  
const handleButtonClick = (value) => {
  if (value === '=') {
    try {
      const result = new Function('return ' + displayValue)();
      setDisplayValue(formatResult(result));
    } catch (err) {
      setDisplayValue('Error');
    }
  } else if (value === 'C') {
    setDisplayValue('0');
  } else if (['sin', 'cos', 'tan'].includes(value)) {
    const radians = (Math.PI / 180) * parseFloat(displayValue);
    let result;
    if (value === 'sin') result = Math.sin(radians);
    else if (value === 'cos') result = Math.cos(radians);
    else if (value === 'tan') result = Math.tan(radians);
    setDisplayValue(formatResult(result));
  } else if (value === 'log') {
    setDisplayValue(formatResult(Math.log10(parseFloat(displayValue))));
  } else if (value === 'sqrt') {
    setDisplayValue(formatResult(Math.sqrt(parseFloat(displayValue))));
  } else if (value === '^') {
    setDisplayValue(displayValue + '^');
  } else if (['+', '-', '*', '/'].includes(value)) {
    if (!isNaN(displayValue.slice(-1))) {
      setDisplayValue(displayValue + value);
    }
  } else if (value === 'OFF') {
    setDisplayValue('');
  } else {
    if (displayValue === '0' || displayValue === 'Error') {
      setDisplayValue(value);
    } else if (value === '.' && displayValue.includes('.')) {
      return;
    } else {
      setDisplayValue(displayValue + value);
    }
  }
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