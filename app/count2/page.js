'use client';

import { useState } from 'react';

export default function CountPage() {
  const [counter, setCounter] = useState(1);

  function handleClick() {
    console.log( counter );
    setCounter( counter+1 );
  }

  return (
    <div>
        <h2> Counter = {counter} </h2>
        <button onClick={handleClick}>Count Up</button>
    </div>
  );
} 
