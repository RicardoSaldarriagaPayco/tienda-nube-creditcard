import React from "react";
import { Box, Icon, Link } from "@nimbus-ds/components";
import Languages from "../Languages";
import Logo from './logo.svg?react'



const Header: React.FC = () => {

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="neutral-background"
      height="60px"
      py="4"
      px="10"
      minHeight="85px"
    >
      <Link as="a" href="https://epayco.com/" style={{paddingTop:"10px"}}>
        <Icon
          color="neutral-textHigh"
          source={<Logo />}
        />
      </Link>
      <Box display="flex" gap="2-5" alignItems="center">
        <Languages />
      </Box>
    </Box>
  );
};

export default Header;
