import React from "react";
import { useRouter } from "next/router";
import { LoginForm, usePageProvider } from "../components";

export default () => {
  const { state: { user } } = usePageProvider();
  const router = useRouter();
  if (user) {
    router.push(`/users/${user.username}`);
  }

  return (
    <LoginForm />
  );
}