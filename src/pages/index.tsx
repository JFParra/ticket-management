import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Ticket, { TicketProps } from "../components/Ticket";
import prisma from "../../lib/prisma";
import {
  Box,
  Button,
  Heading,
  Link,
  SimpleGrid,
  Spacer,
  VStack,
} from "@chakra-ui/react";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.ticket.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return {
    props: { feed },
    revalidate: 1,
  };
};

type Props = {
  feed: TicketProps[];
};

const TicketFeed: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Link href="/">
        <Button colorScheme="purple">Refresh</Button>
      </Link>
      <Box className="page" pt={5}>
        <Heading>Ticket Feed</Heading>
        <SimpleGrid
          spacing={10}
          templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        >
          {props.feed.map((ticket) => (
            <Ticket key={ticket.id} ticket={ticket} />
          ))}
        </SimpleGrid>
      </Box>
    </Layout>
  );
};

export default TicketFeed;
