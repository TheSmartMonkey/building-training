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

      return c.json({ success: true, data: output });
    } catch (error) {
      if (error instanceof Error) {
        throw new HTTPException(500, { message: error?.message, cause: error });
      }
      throw new HTTPException(500, { message: 'UNKNOWN_ERROR', cause: error });
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
