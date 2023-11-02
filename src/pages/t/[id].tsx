import React, { useState } from "react";
import { GetServerSideProps } from "next";
import MarkDown from "react-markdown";
import Layout from "../../components/Layout";
import Router from "next/router";
import { TicketProps } from "../../components/Ticket";
import prisma from "../../../lib/prisma";
import {
  Heading,
  Select,
  Button,
  Stack,
  Flex,
} from "@chakra-ui/react";

export const getServerSideProps: GetServerSideProps = async ({
  params,
}) => {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: ticket,
  };
};

async function deleteTicket(id: number): Promise<void> {
  await fetch(`/api/ticket/${id}`, {
    method: "DELETE",
  });
  await Router.push("/");
}

const Ticket: React.FC<TicketProps> = (props) => {
  const title = props.title;
  const content = props.content;
  const authorName = props.author
    ? props.author.name
    : "Unknown author";
  const status = props.status;
  const isResolved = status == "resolved";
  const responseInit = props.response == null ? "" : props.response;

  const [response, setResponse] = useState(responseInit);
  const [updatedStatus, setStatus] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = {
        status: updatedStatus,
        response: response,
      };
      await fetch(`/api/ticket/${props.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Flex>
        <form onSubmit={submitData}>
          <Heading size="md">Title: {title}</Heading>
          <MarkDown>{content}</MarkDown>
          <Heading size="sm">By: {authorName}</Heading>
          {isResolved && (
            <Heading size="md">Response: {response}</Heading>
          )}
          {!isResolved && (
            <Select
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Select option"
              value={updatedStatus}
            >
              <option value="new">New</option>
              <option value="inprogress">In Progress</option>
              <option value="resolved">Resolved</option>
            </Select>
          )}
          {!isResolved && (
            <textarea
              cols={50}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Typical response"
              rows={8}
              value={response}
            />
          )}
          <Stack>
            {!isResolved && (
              <Button
                disabled={!updatedStatus || !response}
                type="submit"
              >
                Respond
              </Button>
            )}
            <Button onClick={() => Router.push("/")}>Cancel</Button>
            {isResolved && (
              <Button onClick={() => deleteTicket(props.id)}>
                Delete
              </Button>
            )}
          </Stack>
        </form>
      </Flex>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Ticket;
