import * as React from "react";

function parseValue<T>(initialValue: T, value?: any) {
  if (typeof initialValue === "object") {
    return value ? JSON.parse(value) : initialValue;
  }
  return value || initialValue;
}
function stringifyValue<T>(initialValue: T, value?: any) {
  if (typeof initialValue === "object") {
    return JSON.stringify(value || initialValue);
  }
  return value || initialValue;
}

export function useLocalStorage<T extends string | number | object>(
  key: string,
  initialValue: T
): [T, React.Dispatch<T>] {
  const [value, setValue] = React.useState(
    parseValue(initialValue, window.localStorage.getItem(key))
  );

  const setItem = (newValue: string) => {
    setValue(newValue);
    window.localStorage.setItem(key, stringifyValue(initialValue, newValue));
  };

  React.useEffect(() => {
    const newValue = window.localStorage.getItem(key);
    if (value !== newValue) {
      setValue(parseValue(initialValue, newValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStorage = React.useCallback(
    (event: StorageEvent) => {
      if (event.key === key && event.newValue !== value) {
        setValue(parseValue(initialValue, event.newValue));
      }
    },
    [initialValue, key, value]
  );

  React.useEffect(() => {
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [handleStorage]);

  return [value, setItem as any];
}
