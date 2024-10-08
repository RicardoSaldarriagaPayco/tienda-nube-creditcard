import React from "react";
import { Link } from "react-router-dom";
import { Box, Title, Text, Button } from "@nimbus-ds/components";
import { CogIcon } from "@nimbus-ds/icons";
import { useAuthentication } from "../../hooks";
import IMG from "./empty-manager-tablet.png";

const Tutorial: React.FC = () => {
  useAuthentication();
  return (
    <Box
      width="100%"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      backgroundColor="neutral-background"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginX={{ xs: "5", lg: "none" }}
      >
        <Box display={{ xs: "none", lg: "flex" }} maxWidth="60%">
          <img src={IMG} alt="" />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          gap="2"
          maxWidth={{ md: "100%", lg: "35%" }}
        >
          <Title textAlign="left">
          Bienvenido al proceso de configuración de la aplicación.
          </Title>
          <Text textAlign="left" fontSize="highlight" lineHeight="highlight">
          Necesitamos completar algunos datos para iniciar el
          desarrollo, no te preocupes, te guiaremos a través de los pasos.
          </Text>
          <Button as={Link} to="/configuration" appearance="neutral">
            <CogIcon />
            Configurar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Tutorial;
