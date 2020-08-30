import React, { useState } from "react";
import PICTURES from "./data/pictures";
import { useDynamicTransition } from "./hooks";

const SECONDS = 1000;
const minimumDelay = 1 ;
const minimumIncrement = 1;

function Gallery() {
  const [delay, setDelay] = useState(3);
  const [increment, setIncrement] = useState(1);

  const index = useDynamicTransition({
    delay: delay * SECONDS,
    increment,
    length: PICTURES.length,
  });

  const updateDelay = (event) => {
    const delay = Number(event.target.value);
    setDelay(delay < minimumDelay ? minimumDelay : delay);
  };
  const updateIncrement = (event) => {
    const increment = Number(event.target.value);
    setIncrement(increment < minimumIncrement ? minimumIncrement : increment);
  };

console.log('delay',delay, 'increment', increment);

  return (
    <div>
      <img src={PICTURES[index].image} width="80%" alt="gallery" />
      <div className="multiform">
        <div>
          Gallery transition delay (seconds):
          <input type="number" onChange={updateDelay} value={delay}/>
        </div>
        <div>
          Gallery increment:
          <input type="number" onChange={updateIncrement} value={increment}  />
        </div>
      </div>
    </div>
  );
}

export default Gallery;
