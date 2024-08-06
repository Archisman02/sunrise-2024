import { NextApiRequest, NextApiResponse } from 'next';
import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";

let tasks: Task[] = [...initialTasks];

export default function initializeTasks(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const tasks = initialTasks.map(task => {
          if (task.group === 1) {
            return { ...task, active: true };
          }
          return task;
        });
        res.status(200).json(tasks);
      } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }
}