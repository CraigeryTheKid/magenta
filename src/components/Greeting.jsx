
// Silly randomized button to change the text on mainpage
// Used in main index.astro

import { useState } from 'preact/hooks';


export default function Greeting({messages}) {

  const randomMessage = () => messages[(Math.floor(Math.random() * messages.length))];

  const [greeting, setGreeting] = useState(messages[0]);
 
  //CREATED MY OWN DYNAMIC IMAGE VARIABLE!!!!
  let kidpic = greeting.concat(".jpg");
 

return (
   
    <div>
      <img src={kidpic} height="300"/>
      <h3>{greeting} is one of my children!!</h3>
      <button class="kidbutt" onClick={() => setGreeting(randomMessage())}>New Child</button>
    </div>
  );
}