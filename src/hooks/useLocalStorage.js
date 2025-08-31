import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const stored = localStorage.getItem(key);

		if (stored) {
			setValue(JSON.parse(stored));
		}
	}, [key]);

	useEffect(() => {
		if (typeof window === "undefined") return;
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
};

export default useLocalStorage;
