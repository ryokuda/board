'use client';

export default function MapPage() {
  const topics = [
    { id: "1", topic: "新人歓迎会について" },
    { id: "2", topic: "給湯室のコーヒー" },
  ];

  return (
    <div>
        {
          topics.map( function( t ) {
                return <div key={t.id}> id={t.id}, topic={t.topic} </div>;
            }
          )
        }
    </div>
  );
}
