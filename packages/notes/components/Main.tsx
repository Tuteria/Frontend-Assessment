import React, { ReactChild } from "react";
import { Box } from "@chakra-ui/core";

type Props = {
  children: ReactChild
};

const Main: React.FC<Props> = ({ children }: Props) => (
  <Box
    as="main"
    minHeight="calc(100vh - (80px + 41px))"
    backgroundColor="white"
  >
    {children}
  </Box>
);

export default Main;