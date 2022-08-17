import {useState} from "react";

export const useLocalStorage = (keyName, defaultValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName);

            if (value) {
                return value;
            } else {
                if (defaultValue !== null) {
                    window.localStorage.setItem(keyName, defaultValue);
                }
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    });
    const setValue = (newValue) => {
        try {
            if (newValue === null) {
                window.localStorage.removeItem(keyName);
                return
            }
            window.localStorage.setItem(keyName, newValue);
            setStoredValue(newValue);
        } catch (err) {
            throw new Error(err)
        }
    };
    return [storedValue, setValue];
}