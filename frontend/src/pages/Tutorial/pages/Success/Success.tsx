import React, {useEffect, useState} from "react";

import {
    Title,
    Text,
    Card,
    Box,
    useToast,
    Spinner
  } from "@nimbus-ds/components";
import { useTranslation } from "react-i18next";
import { useFetch, useAuth } from "../../../../hook";
import { IPayment } from "../../../../hook/usePayment/usePayment.types";

const apiURL = process.env.apiURL??"http://localhost:8000";

const Success: React.FC = () => {
    const { auth } = useAuth();
    const { request } = useFetch();
    const { addToast } = useToast();
    const [isLoading, setLoading] = useState(true);
    const { t } = useTranslation("translations");

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
                setLoading(false)
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
                      setLoading(false)
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
                      id: "error-config-payment-load",
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