import React from "react";
import Router from "next/router";
import MarkDown from "react-markdown";
import { Heading, Box, Badge } from "@chakra-ui/react";

export type TicketProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  status: string;
  response: string;
};

export const determineBadgeColor = (status: string) => {
  let color = "";
  if (status == "new") {
    color = "purple";
  } else if (status == "resolved") {
    color = "green";
  } else {
    color = "yellow";
  }
  return color;
};

const Ticket: React.FC<{ ticket: TicketProps }> = ({ ticket }) => {
  const authorName = ticket.author
    ? ticket.author.name
    : "Unknown author";
  const color = determineBadgeColor(ticket.status);
  return (
    <Box
      p={5}
      border="1px solid"
      borderColor="gray.500"
      borderRadius="md"
      onClick={() => Router.push("/t/[id]", `/t/${ticket.id}`)}
    >
      <Badge colorScheme={color}>{ticket.status}</Badge>
      <Heading size="md">Title: {ticket.title}</Heading>
      <MarkDown>{ticket.content}</MarkDown>
      {ticket?.response && (
        <Heading size="md">Response: {ticket.response}</Heading>
      )}
      <Heading size="sm">By: {authorName}</Heading>
    </Box>
  );
};

export default Ticket;
