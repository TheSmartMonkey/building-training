import dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';
import { SchemaDefinition } from 'dynamoose/dist/Schema';

// Define a utility type to map Dynamoose schema types to TypeScript types
type DynamooseTypeToTS<T> = T extends { type: StringConstructor }
  ? string
  : T extends { type: BooleanConstructor }
  ? boolean
  : T extends { type: NumberConstructor }
  ? number
  : any;

// Define a utility function to infer TypeScript types from a Dynamoose schema
type InferDynamooseType<S> = {
  [K in keyof S]: S[K] extends { type: StringConstructor }
    ? string
    : S[K] extends StringConstructor
    ? string
    : S[K] extends { type: BooleanConstructor }
    ? boolean
    : S[K] extends BooleanConstructor
    ? boolean
    : S[K] extends { type: NumberConstructor }
    ? number
    : S[K] extends NumberConstructor
    ? number
    : S[K] extends { type: ArrayConstructor }
    ? Array<InferDynamooseType<S[K]['type']>>
    : S[K] extends ArrayConstructor
    ? any[]
    : S[K] extends { type: ObjectConstructor }
    ? { [key: string]: InferDynamooseType<S[K]['type']> }
    : S[K] extends ObjectConstructor
    ? object
    : any;
};

// Example Dynamoose schema
const todoSchemaDefinition: SchemaDefinition = {
  id: {
    type: String,
    hashKey: true, // Partition key
    required: true,
  },
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean },
};

const todoSchema = new dynamoose.Schema(todoSchemaDefinition, {
  timestamps: {
    createdAt: {
      created_at: {
        type: {
          value: Date,
          settings: {
            storage: 'iso',
          },
        },
      },
    },
    updatedAt: {
      updated: {
        type: {
          value: Date,
          settings: {
            storage: 'seconds',
          },
        },
      },
    },
  },
});

// Infer the TypeScript type from the Dynamoose schema definition
type TodoType = InferDynamooseType<typeof todoSchemaDefinition>;

// Example usage
const exampleTodo: TodoType = {
  id: '123',
  title: 'Example Todo',
  description: 'This is an example',
  completed: false,
};

console.log(exampleTodo.description);

// Create a model for the todos table
const Todo = dynamoose.model<TodoType & Item>('todos', todoSchema);

export async function getAllTodos() {
  // Fetch all todos from the DynamoDB table
  const todos = await Todo.scan().exec();
  return todos[0].title;
}
