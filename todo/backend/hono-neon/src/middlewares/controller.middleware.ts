import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { JSONValue } from 'hono/utils/types';

/**
 * @description Controller
 * @param callback - Callback function
 * @param config - Controller config
 * @returns Controller
 */
export function controller<T extends JSONValue>(
  callback: ({ body, params, queryParams }: { body: any; params: any; queryParams: any }) => Promise<T>,
): (c: Context) => Promise<Response> {
  return async (c: Context): Promise<Response> => {
    try {
      const body = await parseBody(c);
      const params = c.req.param();
      const queryParams = c.req.query();

      const output: T = await callback({ body, params, queryParams });

      return c.json(output);
    } catch (error) {
      console.error(error);

      // Handle specific database errors
      if (error && typeof error === 'object' && 'code' in error) {
        const dbError = error as { code: string; message?: string };

        if (dbError.code === 'SQLITE_CONSTRAINT_UNIQUE') {
          // Handle unique constraint violations
          if (dbError.message?.includes('todoTable.title')) {
            throw new HTTPException(409, {
              message: 'A todo with this title already exists. Please choose a different title.',
            });
          }
          throw new HTTPException(409, {
            message: 'This item already exists. Please try with different data.',
          });
        }

        if (dbError.code === 'SQLITE_CONSTRAINT_NOTNULL') {
          throw new HTTPException(400, {
            message: 'Required fields cannot be empty.',
          });
        }
      }

      if (error instanceof HTTPException) {
        throw error;
      }

      if (error instanceof Error) {
        throw new HTTPException(500, { message: error?.message, cause: error });
      }

      throw new HTTPException(500, { message: 'An unexpected error occurred', cause: error });
    }
  };
}

function parseBody(c: Context): Promise<any> {
  const method = c.req.method;
  if (method === 'GET' || method === 'HEAD') {
    return Promise.resolve({});
  }

  const contentType = c.req.header('content-type');
  if (contentType?.includes('application/json')) {
    return c.req.json();
  }
  return Promise.resolve({});
}
