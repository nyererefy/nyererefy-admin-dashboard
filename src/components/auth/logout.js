import React from "react";
import { Mutation } from "react-apollo";
import { LOGOUT } from "../../utils/mutations";
import { M_DATA } from "../../utils/consts";
import ErrorMessage from "../../layout/errorMessage";
import { ProgressBar } from "../../layout/progressBar";
import { Redirect } from "react-router-dom";

function Logout() {
  return (
    <Mutation mutation={LOGOUT}>
      {(mutate, { loading, error, data }) => {
        if (error) return <ErrorMessage message={error.message} />;
        if (loading) return <ProgressBar />;

        if (data) {
          localStorage.removeItem(M_DATA);
          return <Redirect to="/login" />;
        } else {
          mutate();
        }
        return null;
      }}
    </Mutation>
  );
}

export default Logout;
