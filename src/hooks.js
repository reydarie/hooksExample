import { useState, useEffect } from "react";

export const useFetch = (url, initialValue) => {
  const [result, setResult] = useState(initialValue);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((response) => setResult(response));
  }, []);

  return result;
};

export const useDinamicTransition = ({ delay, increment, length }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((storedIndex) => {
        return (storedIndex + increment) % length;
      });
    }, delay);

    return () => clearInterval(interval);
  }, [delay, increment, length]);

  return index;
};
