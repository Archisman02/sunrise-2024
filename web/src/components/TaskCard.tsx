// components/TaskCard.tsx
import * as React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import Task from '../model/Task'
import CheckIcon from '@mui/icons-material/Check';

interface TaskCardProps {
    task: Task;
    onDone: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDone }) => {
  return (
    <Card sx={{ marginBottom: 2, minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {task.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {task.description}
        </Typography>
        {task.active && !task.completed && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<CheckIcon />}
            onClick={() => onDone(task.id)}
          >
            Done
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskCard;
