/** @format */

"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthContext } from "./context/auth";

export default function Home() {
  const router = useRouter();
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <div>
      <ThemeProvider>
        <h1>Home</h1>
        <br />
        <pre>{JSON.stringify(auth, null, 4)}</pre>
      </ThemeProvider>
    </div>
  );
}
