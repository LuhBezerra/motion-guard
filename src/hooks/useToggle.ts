import { useState } from 'react';

function useToggle(initialValue: boolean = false): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const onToggle = () => {
    setValue((prevValue) => !prevValue);
  };

  return [value, onToggle];
}

export default useToggle;
