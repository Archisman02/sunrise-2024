import * as React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import TaskCard from '../components/TaskCard';
import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";
import { useEffect, useState } from 'react';

let tasks: Task[] = [...initialTasks];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/tasks');
        if (response.ok) {
          const data: Task[] = await response.json();
          setTasks(data);
        } else {
          console.error('Failed to fetch tasks');
        }
      } catch (error) {
        console.error('An error occurred while fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleDone = (id: number) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.id === id ? { ...task, completed: true, active: false } : task
      );

      const allInProgressCompleted = updatedTasks
        .filter(task => task.active && !task.completed)
        .length === 0;

      if (allInProgressCompleted) {
        const nextGroup = Math.min(
          ...updatedTasks
            .filter(task => !task.completed && !task.active)
            .map(task => task.group)
        );

        return updatedTasks.map(task =>
          task.group === nextGroup ? { ...task, active: true } : task
        );
      }

      return updatedTasks;
    });
  };

  const renderTasks = (status: 'To-Do' | 'In Progress' | 'Completed') => {
    return tasks
      .filter(task => {
        if (status === 'To-Do') return !task.active && !task.completed;
        if (status === 'In Progress') return task.active && !task.completed;
        if (status === 'Completed') return task.completed;
        return false;
      })
      .map(task => (
        <Grid item xs={6} key={task.id}>
          <TaskCard task={task} onDone={handleDone} />
        </Grid>
      ));
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        To-Do
      </Typography>
      <Grid container spacing={2}>{renderTasks('To-Do')}</Grid>

      <Typography variant="h4" gutterBottom>
        In Progress
      </Typography>
      <Grid container spacing={2}>{renderTasks('In Progress')}</Grid>

      <Typography variant="h4" gutterBottom>
        Completed
      </Typography>
      <Grid container spacing={2}>{renderTasks('Completed')}</Grid>
    </Box>
  );
}