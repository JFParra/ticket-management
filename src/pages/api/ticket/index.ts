import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { getToken } from "next-auth/jwt";

// POST /api/ticket
// Required fields in body: title
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { title, content, status } = req.body;

  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (session) {
    const result = await prisma.ticket.create({
      data: {
        title: title,
        content: content,
        author: { connect: { email: session?.email } },
        status: status,
        published: true,
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
