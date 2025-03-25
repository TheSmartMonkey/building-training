export function CreateTodoComponent() {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // Handle form submission here
        }}
      >
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" placeholder="Enter todo title" />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" placeholder="Enter todo description" />
        </div>

        <button type="submit">Create Todo</button>
      </form>
    </div>
  );
}
