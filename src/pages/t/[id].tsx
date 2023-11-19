import React, { useState } from "react";
import { GetServerSideProps } from "next";
import MarkDown from "react-markdown";
import Layout from "../../components/Layout";
import Router from "next/router";
import { TicketProps, determineBadgeColor } from "../../components/Ticket";
import prisma from "../../../lib/prisma";
import {
  Heading,
  Select,
  Button,
  Stack,
  Flex,
  Badge,
  Text,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Spacer,
  StackDivider,
  FormControl,
  VStack,
  Textarea,
  FormLabel,
} from "@chakra-ui/react";
import ticket from "../api/ticket";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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
  const authorName = props.author ? props.author.name : "Unknown author";
  const status = props.status;
  const isResolved = status == "resolved";
  const responseInit = props.response == null ? "" : props.response;
  const color = determineBadgeColor(status);
  const id = props.id;

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
      <Card p={5} border="1px solid" borderColor="gray.500" borderRadius="md">
        <CardHeader>
          <HStack>
            <Badge colorScheme={color}>{status}</Badge>
            <Spacer />

            <Heading size="xs" textTransform="uppercase">
              ID: {id}
            </Heading>
          </HStack>

          <Heading size="md">Title: {title}</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Description
              </Heading>
              <MarkDown>{content}</MarkDown>
            </Box>
            {isResolved && (
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Response
                </Heading>
                {response && <Text size="md">{response}</Text>}
              </Box>
            )}
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Author
              </Heading>
              <Text size="md">{authorName}</Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
      <form onSubmit={submitData}>
        <FormControl isRequired>
          {!isResolved && (
            <>
              <FormLabel>Status</FormLabel>

              <Select
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Select option"
                value={updatedStatus}
                required
              >
                <option value="new">New</option>
                <option value="inprogress">In Progress</option>
                <option value="resolved">Resolved</option>
              </Select>
            </>
          )}
          {!isResolved && (
            <>
              <FormLabel>Response</FormLabel>
              <Textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Typical response"
                size="sm"
              />
            </>
          )}
        </FormControl>
        <HStack>
          {!isResolved && (
            <Button
              color="blue"
              disabled={!updatedStatus || !response}
              type="submit"
            >
              Respond
            </Button>
          )}
          {isResolved && (
            <Button onClick={() => deleteTicket(props.id)}>Delete</Button>
          )}
          <Spacer />
          <Button onClick={() => Router.push("/")}>Cancel</Button>
        </HStack>
      </form>
    </Layout>
  );
};

export default Ticket;
