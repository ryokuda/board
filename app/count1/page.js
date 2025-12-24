'use client';

let counter=1;

export default function CountPage() {

  function handleClick() {
    console.log( counter );
    counter = counter + 1;
  }

  return (
    <div>
        <h2> Counter = {counter} </h2>
        <button onClick={handleClick}>Count Up</button>
    </div>
  );
} 
