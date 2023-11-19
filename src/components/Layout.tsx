import { Box, Grid, GridItem } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <Grid
    templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
    gridTemplateColumns={"0"}
    color="blackAlpha.700"
    fontWeight="bold"
  >
    <GridItem bg="purple.200" area={"header"}>
      <Header />
    </GridItem>
    <GridItem bg="purple.50" area={"main"}>
      <Box p={10} minH="100vh">
        {props.children}
      </Box>
    </GridItem>
  </Grid>
);

export default Layout;
