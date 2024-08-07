import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Title,
  Text,
  Card,
  Button,
  Box,
  useToast,
  Spinner
} from "@nimbus-ds/components";
import { IPayment } from "@/hooks/usePayment/payment.types";
import { useAuth, useConfig, useFetch, useAuthentication } from "@/hooks";
import { Trans, useTranslation } from "react-i18next";


const apiURL = process.env.apiURL??"http://localhost:8000";

const Success: React.FC = () => {
  const { auth } = useAuth();
  const { config } = useConfig();
  const { request } = useFetch();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setLoaging] = useState(true);
  const { t } = useTranslation("translations");
  //useAuthentication();
  useEffect(() => {
    if (auth) {
      onSetUp()
    }
  }, []);


  const onSetUp = () => {
    if (auth) {
      request<IPayment[]>({
        url: `/${auth?.user_id}/payment_providers`,
        method: "GET",
        data:auth
      })
        .then((response) => {
          if (response.content && response.content.length>=1) {
            setLoaging(false)
            setTimeout(() => {
              if (auth) {
                window.location.href = auth.shop+"/admin/payments";
              }
            }, 2000);
          }else{
            request<IPayment[]>({
              url: `/${auth?.user_id}/payment_providers`,
              method: "POST",
              data:auth
            })
              .then((response) => {
                if (response.content) {
                  setLoaging(false)
                  setTimeout(() => {
                    if (auth) {
                      window.location.href = auth.shop+"/admin/payments";
                    }
                  }, 2000);
                }else{
                  addToast({
                    type: "danger",
                    text: "Please try later",
                    duration: 4000,
                    id: "error-config-payment",
                  });
                }
              })
              .catch((error) => {
                addToast({
                  type: "danger",
                  text: "Please try later",
                  duration: 4000,
                  id: "error-config-payment",
                });
              });
          }
        })
        .catch((error) => {
          addToast({
            type: "danger",
            text: "Please fill in your app settings",
            duration: 4000,
            id: "error-config-success",
          });
        });
    }else{
      addToast({
        type: "danger",
        text: "Please fill in your app settings",
        duration: 4000,
        id: "error-config-success",
      });
    }
  };

  return (
    isLoading?
      <Card>
        <Box display="flex"
        alignItems="center"
        flexDirection="column">
          <Spinner size="large" />
        </Box>
      </Card>:
      <Card>
        <Card.Header>
          <Box display="flex" textAlign="center" justifyContent="center" alignItems="center">
            <Title as="h3">
            {t("success.ready")}</Title>
          </Box>
        </Card.Header>
        <Card.Body>
          <Text textAlign="center">{t("success.configured")}</Text>
        </Card.Body>
        <Card.Footer>
          <Box display="flex"
            alignItems="center"
            flexDirection="column" >
          </Box>
        </Card.Footer>
      </Card>
  );
};

export default Success;
