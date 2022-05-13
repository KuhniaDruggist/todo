import { TaskType } from '../components/Todolist/Task/types';
import { FilterValuesType } from '../components/Todolist/types';

export const getTasksForRendering = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
    switch (filter) {
    case 'active':
        return tasks.filter(t => !t.isDone);
    case 'completed':
        return tasks.filter(t => t.isDone);
    default:
        return tasks;
    }
};
