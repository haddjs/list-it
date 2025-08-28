import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		const stored = localStorage.getItem(key);
		if (stored) {
			setValue(JSON.parse(stored));
		}
	}, [key]);

	const setStoredValue = (newValue) => {
		setValue(newValue);
		localStorage.setItem(key, JSON.stringify(newValue));
	};

	return [value, setStoredValue];
};

export default useLocalStorage;
