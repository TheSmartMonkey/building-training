import { useMemo, useState } from 'react';
import HttpCommon from '../../common/http.common';
import { AlertComponent } from '../../components/alert.component';
import { ButtonComponent } from '../../components/button.component';
import { CheckboxComponent } from '../../components/checkbox.component';
import { InputComponent } from '../../components/input.component';
import { TextareaComponent } from '../../components/textarea.component';
import { TodoService } from '../../services/todo.service';

export function CreateTodoComponent() {
  const httpClient = useMemo(() => new HttpCommon(), []);
  const todoService = useMemo(() => new TodoService(httpClient), [httpClient]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const completed = formData.get('completed') === 'on';
    const todo = { title, description, completed };

    try {
      await todoService.createTodo(todo);
      setSuccess('Todo created successfully!');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <InputComponent label="Title" name="title" placeholder="Enter todo title" value="" onChange={() => {}} />
        <TextareaComponent label="Description" name="description" placeholder="Enter todo description" value="" onChange={() => {}} />
        <CheckboxComponent label="Completed" name="completed" checked={false} onChange={() => {}} />

        <div className="flex items-center justify-end">
          <ButtonComponent type="submit">Create Todo</ButtonComponent>
        </div>
      </form>

      {error && <AlertComponent type="error" message={error} />}
      {success && <AlertComponent type="success" message={success} />}
    </div>
  );
}
