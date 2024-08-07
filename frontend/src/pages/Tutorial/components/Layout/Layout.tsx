import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Box, Title, Text } from "@nimbus-ds/components";
import { Header, ListSteps } from "..";
import { useTranslation, Trans } from "react-i18next";
import { Responsive } from "@/components";

const Layout: React.FC = () => {
  const { t } = useTranslation("translations");
  return (
    <>
      <Header />
      <Responsive
       mobileContent={
        <Box pb="16"
        backgroundColor="neutral-surface"
        >
          <Box
          mx="auto"
          display="flex"
          flexDirection="column"
          gap="8"
          width="100%"
          my="1"        
          >
          <Box>
          </Box>
          <Box mx="auto"  gap="6" width="90%">
            <Box width="100%">
            <Text fontSize="highlight" lineHeight="highlight">
              <Trans
                i18nKey={t("tutorial.sixth")}
              />
            </Text>
            </Box>
            <Box width="100%">
            <Title fontSize="4" textAlign="left">
            <Trans
                i18nKey={t("tutorial.firstTitle")}
              />
            </Title>
            <ul style={{marginLeft:"30px"}}>
              <li>
              <Trans
                  i18nKey={t("tutorial.secondTitle")}
                  components={[
                    <Text as="span" children="" />,
                    <Link
                      to={`https://registro.epayco.com/#985728`}
                      as="a"
                      target="blank"
                      appearance="primary"
                      children=""
                      style={{color:"rgb(252, 88, 6)"}}
                    />
                  ]}
                />
              </li>
            </ul>
            <Title fontSize="4" textAlign="left">
            ¿Ya tienes una cuenta?
            </Title>
            <ul style={{marginLeft:"30px"}}>
              <li>
              <Trans
                  i18nKey={t("tutorial.thirdTitle")}
                  components={[
                    <Text as="span" children="" />,
                    <Link
                      to={`https://registro.epayco.com/#985728`}
                      as="a"
                      target="blank"
                      appearance="primary"
                      children=""
                      style={{color:"rgb(252, 88, 6)"}}
                    />
                  ]}
                />
              </li>
              <li>
              <Trans
                  i18nKey={t("tutorial.fourthTitle")}
                  components={[
                    <Text as="span" children="" />
                  ]}
                />
              </li>
            </ul>
            
            </Box>
          </Box>
          <Box mx="auto"  width="90%" >
            <Box textAlign="center" justifyContent="center">
              <Outlet  />
            </Box>
            {/*<Box width="30%">
              <ListSteps />
            </Box>*/}
          </Box>
        </Box>
        </Box>  
      }
      desktopContent={
        <Box
          width="100%"
          minHeight="calc(100vh - 60px)"
          display="flex"
          alignItems="center"
          flexDirection="column"
          gap="8"
          backgroundColor="neutral-surface"
        >
          <Box
            mx="auto"
            display="flex"
            flexDirection="column"
            gap="8"
            width="100%"
            maxWidth="1200px"
            my="1"        
          >
            <Box>
            </Box>
            <Box mx="auto"  gap="6" width="70%">
              <Box width="100%">
              <Text fontSize="highlight" lineHeight="highlight">
                <Trans
                  i18nKey={t("tutorial.sixth")}
                />
              </Text>
              </Box>
              <Box width="100%">
              <Title fontSize="4" textAlign="left">
              <Trans
                  i18nKey={t("tutorial.firstTitle")}
                />
              </Title>
              <ul style={{marginLeft:"30px"}}>
                <li>
                <Trans
                    i18nKey={t("tutorial.secondTitle")}
                    components={[
                      <Text as="span" children="" />,
                      <Link
                        to={`https://registro.epayco.com/#985728`}
                        as="a"
                        target="blank"
                        appearance="primary"
                        children=""
                        style={{color:"rgb(252, 88, 6)"}}
                      />
                    ]}
                  />
                </li>
              </ul>
              <Title fontSize="4" textAlign="left">
              ¿Ya tienes una cuenta?
              </Title>
              <ul style={{marginLeft:"30px"}}>
                <li>
                <Trans
                    i18nKey={t("tutorial.thirdTitle")}
                    components={[
                      <Text as="span" children="" />,
                      <Link
                        to={`https://registro.epayco.com/#985728`}
                        as="a"
                        target="blank"
                        appearance="primary"
                        children=""
                        style={{color:"rgb(252, 88, 6)"}}
                      />
                    ]}
                  />
                </li>
                <li>
                <Trans
                    i18nKey={t("tutorial.fourthTitle")}
                    components={[
                      <Text as="span" children="" />
                    ]}
                  />
                </li>
              </ul>
              
              </Box>
            </Box>
            <Box mx="auto"  width="70%" >
              <Box textAlign="center" justifyContent="center">
                <Outlet  />
              </Box>
              {/*<Box width="30%">
                <ListSteps />
              </Box>*/}
            </Box>
          </Box>
        </Box>
      }
      >
      
      </Responsive>
    </>
  )
  
};

export default Layout;
