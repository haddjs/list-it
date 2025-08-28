export const saveTodosToStorage = (todos) => {
	localStorage.setItem("list-it-todos", JSON.stringify(todos));
};

export const loadTodosFromStorage = () => {
	if (typeof window !== "undefined") {
		return localStorage;
	}

	return null;
};
