import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const ticketId = req.query.id;

  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (session) {
    if (req.method === "POST") {
      handlePOST(ticketId, res, req);
    } else if (req.method === "DELETE") {
      handleDELETE(ticketId, res);
    } else {
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`,
      );
    }
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}

// GET /api/ticket/:id
async function handlePOST(ticketId, res, req) {
  const ticket = await prisma.ticket.update({
    where: { id: Number(ticketId) },
    data: {
      response: req.body.response,
      status: req.body.status,
    },
  });
  res.json(ticket);
}

// DELETE /api/ticket/:id
async function handleDELETE(ticketId, res) {
  const ticket = await prisma.ticket.delete({
    where: { id: Number(ticketId) },
  });
  res.json(ticket);
}
