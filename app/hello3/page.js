'use client';

export default function Hello3Page() {
  function greeting( name ){
    return <h4> Hello {name}! How are you?</h4>;
  }
  return (
    <div>
        { greeting( "Mr. Tanaka" ) }
        { greeting( "Ms. Sato" ) }
    </div>
  );
}
