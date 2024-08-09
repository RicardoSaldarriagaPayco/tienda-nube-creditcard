import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@nimbus-ds/components";

import {useAuth, useConfig, useFetch } from "../";
import { IAuth } from "../useAuth/useAuth.types";

const useAuthentication = () => {
  const query = new URLSearchParams(window.location.search);
  const code = query.get("code");
  const navigate = useNavigate();
  const { request } = useFetch();
  const { setAuth } = useAuth();
  const { addToast } = useToast();
  const { config } = useConfig();

  useEffect(() => onAuthentication(), []);
  const apiURL = import.meta.env.VITE_API_URL;
  const onAuthentication = () => {
    if (config?.apiURL) {
      request<IAuth>({
        url: code ? apiURL+`/auth/install?code=${code}` : apiURL+"/auth/login",
        method: code ? "GET" : "POST",
        data: config
      })
        .then((response) => {
          if (response.content) {
            navigate("/configuration");
            setAuth(response.content);
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
    }
  };
};

export default useAuthentication;
