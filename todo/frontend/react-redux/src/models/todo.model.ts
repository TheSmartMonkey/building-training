export type CreateTodoInput = {
  title: string;
  description: string;
  completed: boolean;
};

export type Todo = {
  todoId: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};
