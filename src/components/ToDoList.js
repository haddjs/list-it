"use client";

import useLocalStorage from "@/hooks/useLocalStorage";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";

const ToDoList = () => {
	const [todos, setTodos] = useLocalStorage("list-it-todos", []);
	const [newTodo, setNewTodo] = useState("");

	const handleNewTodo = (e) => {
		e.preventDefault();

		if (newTodo.trim() === "") return;

		const newTask = {
			id: Date.now(),
			task: newTodo,
			isComplete: false,
		};

		setTodos([newTask, ...todos]);
		setNewTodo("");
	};

	const handleChangeTodo = (inputTask) => {
		setNewTodo(inputTask);
	};

	const handleDeleteTodo = (deleteId) => {
		const deletedList = todos.filter((todo) => todo.id !== deleteId);
		setTodos(deletedList);
	};

	const handleUpdateTodo = (updateId) => {
		const updateTodo = todos.map((todo) => {
			if (todo.id !== updateId) return todo;

			return { ...todo, isComplete: !todo.isComplete };
		});

		setTodos(updateTodo);
		console.log(updateTodo);
	};

	return (
		<div>
			<div className="flex">
				<form onSubmit={handleNewTodo} className="flex gap-2">
					<Input
						type="text"
						value={newTodo}
						onChange={(e) => handleChangeTodo(e.target.value)}
						placeholder="What's new Today?"
						className="border-2 rounded-lg"
						required
					/>
					<Button type="submit" className="cursor-pointer">
						Add
					</Button>
				</form>
			</div>

			<div className="py-4">
				{todos.map((item) => (
					<div key={item.id} className="flex items-center gap-2 py-2">
						<span className={item.isComplete ? "line-through" : ""}>
							{item.task}
						</span>
						<Button
							onClick={() => handleDeleteTodo(item.id)}
							variant="secondary"
							size="icon"
							className="cursor-pointer">
							❌
						</Button>
						<Checkbox
							checked={item.isComplete}
							onCheckedChange={() => handleUpdateTodo(item.id)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default ToDoList;
