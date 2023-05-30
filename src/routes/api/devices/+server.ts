import type { RequestHandler } from './$types';

export const GET = (
  () =>{
    const message = "Hey Joe!"

    return new Response(String(message))
  }
) satisfies RequestHandler