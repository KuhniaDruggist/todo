import * as tasks from '../../ac/tasks';
import * as todoList from '../../ac/todoList';

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

type ActionsTasksType = ReturnType<InferValueTypes<typeof tasks>>;
type ActionsTodoListType = ReturnType<InferValueTypes<typeof todoList>>;

export type ActionTypes = ActionsTasksType | ActionsTodoListType;


