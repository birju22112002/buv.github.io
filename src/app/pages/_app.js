/** @format */

// src/app/pages/_app.js

import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/auth";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [auth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    // Check if the user is authenticated
    if (!auth.token) {
      // If not authenticated, redirect to the login page
      router.push("/pages/signin");
    }
  }, [auth, router]);

  return <Component {...pageProps} />;
}

export default MyApp;
