/** @format */

"use client";
import { useState, useContext } from "react";
import AdminLayout from "../../../components/layouts/AdminLayout";
import { Row, Col, Button, Input, Checkbox, Select } from "antd";
import { ThemeContext } from "../../../context/ThemeContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import generator from "generate-password";

const UpdateUser = () => {
  // state
  const { theme } = useContext(ThemeContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState(generator.generate({ length: 6 }));
  const [role, setRole] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  // function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //
    } catch (err) {
      console.log(err);
      toast.error("user update. Try again.");
      setLoading(false);
    }
  };

  // show form
  return (
    <AdminLayout>
      <Row>
        <Col span={12} offset={6}>
          <h4
            style={{
              marginBottom: "-10px",
              color: theme === "dark" ? "#fff" : "#000",
            }}>
            Add new user
          </h4>
          <Input
            style={{ margin: "20px 0px 10px 0px" }}
            size='large'
            placeholder='Full name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            style={{ margin: "10px 0px 10px 0px" }}
            size='large'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            style={{ margin: "10px 0px 10px 0px" }}
            size='large'
            placeholder='Website'
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <div style={{ display: "flex" }}>
            <Button
              onClick={() => setPassword(generator.generate({ length: 6 }))}
              type='default'
              size='large'
              style={{
                margin: "10px 0px 10px 0px",
                color: theme === "dark" ? "#fff" : "#000",
                backgroundColor: theme === "dark" ? "#333" : "#f0f0f0",
              }}>
              Generate password
            </Button>
            <Input.Password
              style={{ margin: "10px 0px 10px 0px" }}
              size='large'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Select
            defaultValue='Subscriber'
            style={{ margin: "10px 0px 10px 0px", width: "100%" }}
            onChange={(e) => setRole(e)}>
            <Select.Option value='Subscriber'>Subscriber</Select.Option>
            <Select.Option value='Author'>Author</Select.Option>
            <Select.Option value='Admin'>Admin</Select.Option>
          </Select>

          <Checkbox
            style={{ color: theme === "dark" ? "#fff" : "#000" }}
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}>
            Send the new user an email about their account.
          </Checkbox>

          <Button
            onClick={handleSubmit}
            type='default'
            style={{
              margin: "10px 0px 10px 0px",
              color: theme === "dark" ? "#fff" : "#000",
              backgroundColor: theme === "dark" ? "#333" : "#f0f0f0",
            }}
            loading={loading}
            block>
            Submit
          </Button>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default UpdateUser;
