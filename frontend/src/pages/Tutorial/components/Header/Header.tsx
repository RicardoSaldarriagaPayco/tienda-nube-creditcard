import React, { useEffect, useState } from "react";
import { Box, Icon, IconButton, Link } from "@nimbus-ds/components";
import { CodeIcon, MoonIcon, SunIcon } from "@nimbus-ds/icons";
import { useDarkMode } from "@/hooks";
import { Languages } from "@/components";
import Logo from './logo.svg?react'

const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const currentTheme = darkMode ? "dark" : "base";
  const currentThemeIcon = darkMode ? <SunIcon /> : <MoonIcon />;

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
        {/*<Link
          textDecoration="none"
          as="a"
          href="https://github.com/TiendaNube/app-templates-hub"
        >
          <CodeIcon />
          Github
        </Link>*/}
        <Languages />
        {/*<IconButton
          source={currentThemeIcon}
          onClick={toggleDarkMode}
          size="2rem"
        />*/}
      </Box>
    </Box>
  );
};

export default Header;
