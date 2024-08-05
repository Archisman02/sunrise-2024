
import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";

let tasks: Task[] = [...initialTasks];

export function initializeTasks() {
    tasks = initialTasks.map(task => {
        if (task.group === 1) {
          return { ...task, active: true };
        }
        return task;
    });
}

export function getActiveTasks(): Task[] {
    // Update tasks
//   tasks = tasks.map(task => {
//     // Complete and deactivate tasks in group 1
//     if (task.group === 1 && task.active) {
//       return { ...task, completed: true, active: false };
//     }

//     // Find the next group to activate
//     if (task.group === 2) {
//       // Activate tasks in the next group if group 1 tasks are completed
//       return { ...task, active: true };
//     }

//     return task;
//   });
    console.log(tasks);
    return tasks.filter(task => task.active);
}

export function getCompletedTasks(): Task[] {
    return tasks.filter(task => task.completed);
}

export function getAllTasks(): Task[] {
    return tasks;
}

export function completeTask(taskTitle: string): void {
    const task = tasks.find(task => task.title === taskTitle);
    if (task) {
        task.active = false;
        task.completed = true;
        const groupTasks = tasks.filter(t => t.group === task.group);
        const allTasksCompleted = groupTasks.every(t => t.completed);

        if (allTasksCompleted) {
            const nextGroupTasks = tasks.filter(t => t.group === task.group + 1);
            nextGroupTasks.forEach(t => t.active = true);
        }
    }
    // console.log(tasks);
}

export function createTask(title: string, description: string, persona: string, group: number): void {
    const newId = tasks.length + 1;
    const newTask = new Task(newId, title, description, persona, group);
    newTask.active = true;
    tasks.push(newTask);
}

export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
  
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    } else {
        console.error(`Task with ID ${taskId} not found.`);
    }
}

export function deleteTask(taskId: number): void {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
    } else {
        console.error(`Task with ID ${taskId} not found.`);
    }
}
