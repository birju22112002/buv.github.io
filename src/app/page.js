/** @format */

"use client";

import { useRouter } from "next/navigation";

import { Button } from "antd";

export default function Home() {
  const router = useRouter();
  const buttonStyle = {
    backgroundColor: "#3B82F6",
    color: "white",
  };
  return (
    <div>
      <h1>Home</h1>

      <Button
        type='primary'
        style={buttonStyle}
        onClick={() => router.push("/pages")}>
        Admin
      </Button>
      <br />
    </div>
  );
}
