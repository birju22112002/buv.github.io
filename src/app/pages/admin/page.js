/** @format */

"use client";

import { useRouter } from "next/navigation";
import { Button } from "antd";

export default function Admin() {
  const router = useRouter();
  const buttonStyle = {
    backgroundColor: "#3B82F6",
    color: "white",
  };

  return (
    <div>
      <h1>Admin</h1>
      <Button
        style={buttonStyle}
        type='primary'
        onClick={() => router.push("/")}>
        Home
      </Button>
    </div>
  );
}
