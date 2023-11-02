import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Ticket, { TicketProps } from "../components/Ticket";
import prisma from "../../lib/prisma";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { logger } from "@lib/logger";

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

  console.error('PROPS', props)

  return (
    <Layout>
      <Box className="page" pt={5}>
        <Heading>Ticket Feed</Heading>
        <VStack mt={5} spacing={5}>
          {props.feed.map((ticket) => (
            <Box
              key={ticket.id}
              w="full"
              shadow="lg"
              _active={{ shadow: "unset" }}
            >
              <Ticket ticket={ticket} />
            </Box>
          ))}
        </VStack>
      </Box>
    </Layout>
  );
};

export default TicketFeed;
