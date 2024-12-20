import dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';
import { Schema } from 'dynamoose/dist/Schema';
import { z, ZodTypeAny } from 'zod';

function zodToDynamooseSchema(zodSchema: z.ZodObject<any>): Schema {
  const schemaDefinition: Record<string, any> = {};

  for (const [key, value] of Object.entries(zodSchema.shape)) {
    if (value instanceof z.ZodString) {
      schemaDefinition[key] = { type: String };
    } else if (value instanceof z.ZodBoolean) {
      schemaDefinition[key] = { type: Boolean };
    } else if (value instanceof z.ZodOptional) {
      const innerType = (value as z.ZodOptional<ZodTypeAny>).unwrap();
      if (innerType instanceof z.ZodString) {
        schemaDefinition[key] = { type: String };
      } else if (innerType instanceof z.ZodBoolean) {
        schemaDefinition[key] = { type: Boolean };
      }
    }
    // Add more type mappings as needed
  }

  return new dynamoose.Schema(schemaDefinition);
}

// Define the Zod schema for TodoType
const TodoZodSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

// Automatically create a Dynamoose schema from the Zod schema
const todoSchema = zodToDynamooseSchema(TodoZodSchema);

type Todo = z.infer<typeof TodoZodSchema> & Item;

// Create a model for the todos table
const TodoModel = dynamoose.model<Todo>('todos', todoSchema);

export async function getAllTodos() {
  // Fetch all todos from the DynamoDB table
  const todos = await TodoModel.scan().exec();
  return todos[0].title;
}
