import { createServer } from "http";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { apiResolver } from "next/dist/next-server/server/api-utils";
import request from "supertest";

/**
 * Mocks request in a way similar way to how Next Api route works
 * @param handler - handler for endpoint
 * @param query - query in endpoint route
 */
async function nextRequest(
    handler: NextApiHandler,
    query = {}
  ) {
  return request(
    createServer(
      async (req: NextApiRequest, res: NextApiResponse) => {
        return apiResolver(
          req, res, query,
          handler, {} as any, undefined
        );
      },
    ),
  );
}

export default nextRequest;
