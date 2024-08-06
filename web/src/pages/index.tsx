import * as React from 'react';
import { Grid, Typography, Box, ThemeProvider, Toolbar, AppBar, IconButton, CssBaseline, Switch, useTheme, createTheme } from '@mui/material';
import TaskCard from '../components/TaskCard';
import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";
import { useEffect, useState } from 'react';
import { Brightness4, Brightness7 } from '@mui/icons-material';

let tasks: Task[] = [...initialTasks];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const theme = useTheme();

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
        <Grid item xs={12} key={task.id}>
          <TaskCard task={task} onDone={handleDone} />
        </Grid>
      ));
  };

return (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Task Board
        </Typography>
        <IconButton sx={{ ml: 1 }} onClick={handleToggleDarkMode} color="inherit">
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <Switch checked={darkMode} onChange={handleToggleDarkMode} />
      </Toolbar>
    </AppBar>
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="h5" gutterBottom>
            To-Do
          </Typography>
          <Grid container spacing={2}>
            {renderTasks('To-Do')}
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="h5" gutterBottom>
            In Progress
          </Typography>
          <Grid container spacing={2}>
            {renderTasks('In Progress')}
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="h5" gutterBottom>
            Completed
          </Typography>
          <Grid container spacing={2}>
            {renderTasks('Completed')}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </ThemeProvider>
);
}