import { useState } from "react";

const useToggle = (initialState: boolean = false): [boolean, () => void] => {
  const [show, setShow] = useState(initialState);

  const toggle = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  return [show, toggle];
};

export default useToggle;
