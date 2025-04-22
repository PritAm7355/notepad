import { useState, useEffect } from "react";
import { Card } from "../../components/ui/card"; 
import { Button } from "../../components/ui/button"; 
import { Input } from "../../components/ui/input"; 
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../../components/ui/select";

interface Task {
  id: number;
  task: string;
  description: string;
  assignee: string;
  status: string;
}

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    task: "",
    description: "",
    assignee: "",
    status: "backlog"
  });

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3001/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const addTask = async () => {
    if (!newTask.task || !newTask.description || !newTask.assignee) return;

    const taskToAdd = {
      ...newTask,
      id: Date.now()
    };

    try {
      await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskToAdd)
      });
      setNewTask({ task: "", description: "", assignee: "", status: "backlog" });
      fetchTasks();
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Simple Task Board</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h2 className="font-semibold mb-2">Add New Task</h2>
          <Input
            placeholder="Task Title"
            value={newTask.task}
            onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
            className="mb-2"
          />
          <Input
            placeholder="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="mb-2"
          />
          <Select onValueChange={(value: any) => setNewTask({ ...newTask, assignee: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Assignee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="User">User</SelectItem>
              <SelectItem value="Guest">Guest</SelectItem>
            </SelectContent>
          </Select>
          <Button className="mt-4 w-full" onClick={addTask}>
            Add Task
          </Button>
        </Card>
        <Card className="p-4 col-span-2">
          <h2 className="font-semibold mb-2">All Tasks</h2>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {tasks.map((task) => (
              <div key={task.id} className="p-3 bg-white rounded shadow">
                <p className="font-medium">{task.task}</p>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-xs text-gray-400">Assignee: {task.assignee}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
