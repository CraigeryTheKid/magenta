
// Silly randomized button to change the text on mainpage
// Used in main index.astro

import { useState } from 'preact/hooks';

export default function Greeting({messages}) {

  const randomMessage = () => messages[(Math.floor(Math.random() * messages.length))];

  const [greeting, setGreeting] = useState(messages[0]);

  return (
    <div>
      <h3>{greeting}! Is one of my children!!</h3>
      <button onClick={() => setGreeting(randomMessage())}>New Child</button>
    </div>
  );
}