import {useState} from "react";
import useUser from "../auth/identity";
import Loading from "./Loading";
import {AuthUserContext} from "../contexts/AuthUserContext";

export const RequireAuthUser = ({loading, children}) => {
  const user = useUser();
  if (user === null) {
    return loading || <Loading/>;
  }

  return <AuthUserContext.Provider value={user}>
    {children}
  </AuthUserContext.Provider>
}
