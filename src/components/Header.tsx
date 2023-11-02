import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { logger } from "@lib/logger";
import { Button, HStack } from "@chakra-ui/react";

const Header: React.FC = () => {
  const router = useRouter();

  const { data: session, status } = useSession();
  let left = (
    <Link href="/" passHref>
      <Button>Home</Button>
    </Link>
  );

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
    right = (
      <HStack>
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <Link href="/create" passHref>
          <Button>New Ticket</Button>
        </Link>
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
  }

  return (
    <nav>
      <HStack
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
