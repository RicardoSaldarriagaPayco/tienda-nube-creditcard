import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, useToast, Spinner } from "@nimbus-ds/components";
import { FormField } from "@nimbus-ds/patterns";

import { IConfig } from "@/hooks/useConfig";
import { useAuth, useConfig, useFetch } from "@/hooks";
import { IAuth } from "@/hooks/useAuth/useAuth.types"; 

import { useTranslation, Trans } from "react-i18next";

const apiURL = process.env.apiURL??"http://localhost:8000";
const initialConfig = {
  clientId: "7882",
  appName: "ePayco",
  apiURL: apiURL
}

const Configuration: React.FC = () => {
  const { config, setConfig } = useConfig();
  const query = new URLSearchParams(window.location.search);
  const code = query.get("code");
  const { request } = useFetch();
  const { auth, setAuth } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation("translations");
  const [isLoading, setLoaging] = useState(true);

  const [form, setForm] = useState<IConfig>(config ?? (initialConfig as IConfig));

  useEffect(() => onAuthentication(), []);

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState: IConfig) => ({
      ...prevState,
      [evt.target.name]: evt.target.value.trim(),
    }));
  };

  const onAuthentication = () => {
    if (code) {
      request<IAuth>({
        url: `${apiURL}/auth/install?code=${code}` ,
        method: "GET",
        data: {}
      })
        .then((response) => {
          if (response.content) {
            const { access_token, user_id } = response.content
            setAuth(response.content);
            setForm((prevState: IConfig) => ({
              ...prevState,
              access_token,
              user_id
            }));
            setLoaging(false)
          }
        })
        .catch((error) => {
          addToast({
            type: "danger",
            text: error?.message?.description,
            duration: 4000,
            id: "error-authentication",
          });
        });
    }else{
      setLoaging(false)
    }
  };

  const onSetUp = () => {
    if (config) {
      request<IAuth>({
        url: `${apiURL}/auth/login`,
        method: "POST",
        data: {config}
      })
        .then((response) => {
          if (response.content) {
            //setAuth(response.content);
            navigate("/success");
          }
        })
        .catch((error) => {
          addToast({
            type: "danger",
            text: error?.message?.description,
            duration: 4000,
            id: "error-configuration",
          });
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
        {/*<Card.Header title="Configurar Variables" />*/}
        <Box
          as="form"
          onSubmit={(evt) => {
            evt.preventDefault();
            setConfig(form as IConfig);
            onSetUp();
            //alert("ss")
            //navigate("/success");
          }}
          display="flex"
          flexDirection="column"
          gap="4"
        >
          <FormField.Input
            name="pCustId"
            label="P_CUST_ID_CLIENT"
            onChange={onChange}
            value={form?.pCustId ?? ""}
            required
          />
          <FormField.Input
            name="publicKey"
            label="PUBLIC_KEY"
            onChange={onChange}
            value={form?.publicKey ?? ""}
            required
          />
          <FormField.Input
            name="privateKey"
            label="PRIVATE_KEY"
            onChange={onChange}
            value={form?.privateKey ?? ""}
            required
          />
          <FormField.Input
            name="pKey"
            label="P_KEY"
            onChange={onChange}
            value={form?.pKey ?? ""}
            required
          />
          <Button type="submit" appearance="neutral">
          <Trans
            i18nKey={t("tutorial.save")}
          />
          </Button>
        </Box>
      </Card>
  );
};

export default Configuration;
