import React from "react";
import Router from "next/router";
import MarkDown from "react-markdown";
import {
  Heading,
  Box,
  Badge,
  Card,
  CardHeader,
  CardBody,
  Text,
  CardFooter,
  Button,
  Stack,
  StackDivider,
  HStack,
  Spacer,
} from "@chakra-ui/react";

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
  const authorName = ticket.author ? ticket.author.name : "Unknown author";
  const color = determineBadgeColor(ticket.status);
  return (
    <>
      <Card
        p={5}
        border="1px solid"
        borderColor="gray.500"
        borderRadius="md"
        onClick={() => Router.push("/t/[id]", `/t/${ticket.id}`)}
      >
        <CardHeader>
          <HStack>
            <Badge colorScheme={color}>{ticket.status}</Badge>
            <Spacer />

            <Heading size="xs" textTransform="uppercase">
              ID: {ticket.id}
            </Heading>
          </HStack>

          <Heading size="md">Title: {ticket.title}</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Description
              </Heading>
              <MarkDown>{ticket.content}</MarkDown>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Response
              </Heading>
              {ticket?.response && <Text size="md">{ticket.response}</Text>}
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Author
              </Heading>
              <Text size="md">{authorName}</Text>
            </Box>
          </Stack>
        </CardBody>
        <CardFooter>
          <Button colorScheme="purple">Edit</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Ticket;
