import React, { useState } from "react";
import Joke from "./Joke";
import Stories from "./Stories";
import Task from "./Task";
import Gallery from "./Gallery";
import Matrix from './Matrix';

function App() {
  const [userQuery, setUserQuery] = useState("");
  const [showGallery, setShowGallery] = useState(true);

  const handleChange = (event) => {
    setUserQuery(event.target.value);
   
  };

  const seachQuery = () => {
    window.open(`https://www.google.com/search?q=${userQuery}`, "_blanck");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      seachQuery();
    }
  };

  const toggleShowGallery = () => {
    setShowGallery(!showGallery);
  };

  return (
    <div className="App">
      <h1>Hello Dario</h1>
      <div>
        <input onChange={handleChange} onKeyPress={handleKeyPress} />
        <button onClick={seachQuery}>Search on google</button>
      </div>
      {userQuery}
      <hr />
      <Joke />
      <hr />
      <Task />
      <hr />
      {showGallery ? <Gallery /> : null}
      <button onClick={toggleShowGallery}>
        {showGallery ? "Hide" : "Show"} Gallery
      </button>
      <hr />
      <Stories />
      <hr />
      <Matrix />
    </div>
  );
}

export default App;
