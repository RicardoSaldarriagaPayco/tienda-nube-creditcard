import React, { useEffect, useState } from "react";
import { Box, Icon, Link } from "@nimbus-ds/components";
import { useDarkMode } from "../../../../hooks";
import { Languages} from "../../../../components";
import { ReactComponent as Logo } from "./logo.svg";

const Header: React.FC = () => {
  const { darkMode } = useDarkMode();
  const currentTheme = darkMode ? "dark" : "base";


  const [active, setActive] = useState(currentTheme === "dark");

  useEffect(() => {
    document.body.className = currentTheme;
    setActive(currentTheme === "dark");
  }, [currentTheme, active]);

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
