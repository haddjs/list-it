"use client";

import useLocalStorage from "@/hooks/useLocalStorage";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Card, CardHeader, CardContent } from "./ui/card";
import {
	Dialog,
	DialogTrigger,
	DialogHeader,
	DialogTitle,
	DialogContent,
	DialogClose,
} from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Trash2, ShredderIcon } from "lucide-react";

const ToDoList = () => {
	const [groupTitle, setGroupTitle] = useState("");
	const [groups, setGroups] = useLocalStorage("list-it-todos", []);
	const [groupInput, setGroupInput] = useState({});
	const [date, setDate] = useState(null);
	const [idGroup, setIdGroup] = useState(1);
	const [idTodos, setIdTodos] = useState(1);

	useEffect(() => {
		setDate(Date.now());
	}, []);

	const handleNewGroup = (e) => {
		e.preventDefault();
		if (groupTitle.trim() === "") return;

		const newGroup = {
			id: idGroup,
			dateGroup: date,
			title: groupTitle,
			todos: [],
			newTask: "",
		};

		setGroups([newGroup, ...groups]);
		setGroupTitle("");

		setIdGroup((prev) => prev + 1);
	};

	const addToGroup = (groupId) => {
		const taskContent = groupInput[groupId] || "";

		if (taskContent.trim() === "") return;

		const newTask = {
			id: idTodos,
			task: taskContent,
			isComplete: false,
		};

		setGroups((prevGroups) => {
			return prevGroups.map((group) => {
				if (group.id !== groupId) return group;
				return { ...group, todos: [...group.todos, newTask] };
			});
		});

		setGroupInput((prev) => ({
			...prev,
			[groupId]: "",
		}));
		setIdTodos((prev) => prev + 1);
	};

	const handleChangeGroup = (inputGroup) => {
		setGroupTitle(inputGroup);
	};

	const handleGroupInput = (inputValue, groupId) => {
		setGroupInput((prev) => ({
			...prev,
			[groupId]: inputValue,
		}));
		console.log("handling id:", groupId);
	};

	const handleDeleteTodo = (groupId, deleteListId) => {
		setGroups((prevGroups) =>
			prevGroups.map((group) => {
				if (group.id !== groupId) return group;

				return {
					...group,
					todos: group.todos.filter((todo) => todo.id !== deleteListId),
				};
			})
		);
	};

	const handleDeleteGroup = (groupId) => {
		setGroups((prevGroups) =>
			prevGroups.filter((group) => group.id !== groupId)
		);
	};

	const handleUpdateComplete = (groupId, updatedListId) => {
		setGroups((prevGroups) =>
			prevGroups.map((group) => {
				if (group.id !== groupId) return group;

				return {
					...group,
					todos: group.todos.map((todo) => {
						if (todo.id !== updatedListId) return todo;

						return {
							...todo,
							isComplete: !todo.isComplete,
						};
					}),
				};
			})
		);
	};

	return (
		<>
			<div className="flex">
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="default" className="cursor-pointer p-7 text-lg">
							Add New Group
						</Button>
					</DialogTrigger>
					<DialogContent>
						<form onSubmit={handleNewGroup} className="flex flex-col gap-2">
							<DialogHeader>
								<DialogTitle>New Task</DialogTitle>
							</DialogHeader>
							<Input
								type="text"
								value={groupTitle}
								onChange={(e) => handleChangeGroup(e.target.value)}
								placeholder="Make New Group"
								className="border-2 rounded-lg my-2"
								required
							/>
							<DialogClose asChild>
								<Button type="submit" className="cursor-pointer">
									Add Group
								</Button>
							</DialogClose>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			{groups.length === 0 ? (
				<div className="flex justify-center py-20 text-xl text-black/40">
					<p>Groups Empty</p>
				</div>
			) : (
				<div className="flex flex-wrap justify-center py-5 gap-7">
					{groups.map((item) => (
						<Card key={item.id}>
							<CardHeader className="flex justify-between items-center pb-3">
								{item.title}
								<Button
									className="cursor-pointer"
									variant="destructive"
									onClick={() => handleDeleteGroup(item.id)}>
									<Trash2 />
								</Button>
							</CardHeader>
							<CardContent>
								<form
									onSubmit={(e) => {
										e.preventDefault();
										addToGroup(item.id);
									}}
									className="flex gap-2">
									<Input
										type="text"
										value={groupInput[item.id] || ""}
										onChange={(e) => handleGroupInput(e.target.value, item.id)}
										placeholder={`Add a task to ${item.title}`}
										required
									/>
									<Button type="submit" className="cursor-pointer">
										Add
									</Button>
								</form>

								{item.todos.length === 0 ? (
									<p className="pt-8 text-lg whitespace-normal text-center">
										List Empty
									</p>
								) : (
									item.todos?.map((todo) => (
										<div key={todo.id} className="pt-4">
											<p className="pt-5 rounded-xl text-lg break-words whitespace-normal flex justify-between items-center">
												<Checkbox
													checked={todo.isComplete}
													onCheckedChange={() =>
														handleUpdateComplete(item.id, todo.id)
													}
													className="cursor-pointer"
												/>
												<p className={todo.isComplete ? "line-through" : ""}>
													{todo.task}
												</p>
												<Button
													onClick={() => handleDeleteTodo(item.id, todo.id)}
													className="cursor-pointer"
													variant="destructive">
													<ShredderIcon />
												</Button>
											</p>
											<Separator orientation="horizontal" className="my-4" />
										</div>
									))
								)}
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</>
	);
};

export default ToDoList;
