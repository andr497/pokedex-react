import React from "react";

const useLocalStorage = (keyName, initialItem) => {
  const [storedValue, setStoredValue] = React.useState(() => {
    if (typeof window === "undefined") {
      return initialItem;
    }
    try {
      const item = window.localStorage.getItem(keyName);

      return item ? JSON.parse(item) : initialItem;
    } catch (err) {
      console.error(err);
      return initialItem;
    }
  });

  const setValue = (newItem) => {
    try {
      const itemToStore =
        newItem instanceof Function ? newItem(storedValue) : newItem;

      setStoredValue(itemToStore);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(keyName, JSON.stringify(itemToStore));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
