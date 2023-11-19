import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { logger } from "@lib/logger";
import { Avatar, Button, HStack, Spacer, Stack } from "@chakra-ui/react";

const Header: React.FC = () => {
  const router = useRouter();

  const { data: session, status } = useSession();
  let left = <Button onClick={() => router.push("/")}>Home</Button>;

  let right = null;

  if (status == "loading") {
    right = (
      <div>
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    right = (
      <HStack>
        <Button onClick={() => signIn()}>Log in</Button>
      </HStack>
    );
  }

  if (session) {
    const user = `${session.user.email}`;
    right = (
      <HStack flex="1">
        <Button onClick={() => router.push("/create")}>New Ticket</Button>
        <Spacer />

        <Button
          onClick={() => {
            logger.debug("callbackUrl: ", router.basePath);
            signOut();
          }}
        >
          Log out
        </Button>
      </HStack>
    );

    left = (
      <HStack flex="1">
        <Avatar iconLabel={user} name={user} />
        <Spacer />
        <Button onClick={() => router.push("/")}>Home</Button>
      </HStack>
    );
  }

  return (
    <nav>
      <HStack
        wrap={"wrap"}
        p={5}
        justify="space-between"
        borderBottom="1px solid"
        shadow="md"
      >
        {left}
        {right}
      </HStack>
    </nav>
  );
};

export default Header;
