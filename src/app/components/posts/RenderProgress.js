/** @format */

import React from "react";
import { Progress } from "antd";
import CountUp from "react-countup";
import Link from "next/link";

const RenderProgress = ({ number, name, link = "#" }) => (
  <Link href={link}>
    <Progress
      type='circle'
      strokeColor={{
        "0%": "#666",
        "50%": "#fff",
        "100%": "#111",
      }}
      percent={100}
      format={() => <CountUp end={number} duration={number / 10} />}
    />
    <p style={{ marginTop: 18, color: "#666" }}>{name.toUpperCase()}</p>
  </Link>
);

export default RenderProgress;
