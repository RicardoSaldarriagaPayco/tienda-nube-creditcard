import React from "react";
import { useTranslation } from "react-i18next";
import { Icon, Popover, Box, Text, Link } from "@nimbus-ds/components";
import { GlobeIcon, ChevronDownIcon } from "@nimbus-ds/icons";

import { languages } from "./languages.definitions";

const Languages: React.FC = () => {
  const { t, i18n } = useTranslation("footer");

  return (
    <Popover
      zIndex="200"
      position="bottom"
      width="8rem"
      content={
        <Box display="flex" flexDirection="column" gap="2">
          <Link
            as="button"
            onClick={() => i18n.changeLanguage("es")}
            fontSize="highlight"
            lineHeight="highlight"
            textDecoration="none"
          >
            Español
          </Link>
          <Link
            as="button"
            onClick={() => i18n.changeLanguage("en")}
            fontSize="highlight"
            lineHeight="highlight"
            textDecoration="none"
          >
            English
          </Link>
        </Box>
      }
    >
      <Box
        as="button"
        display="flex"
        alignItems="center"
        gap="1"
        cursor="pointer"
        backgroundColor="transparent"
        borderWidth="none"
      >
        <Icon color="neutral-textLow" source={<GlobeIcon />} />
        <Text color="neutral-textLow" fontWeight="bold">
          {languages[i18n.language || "es"]}
        </Text>
        <Icon color="neutral-textLow" source={<ChevronDownIcon size={10} />} />
      </Box>
    </Popover>
  );
};

export default Languages;
