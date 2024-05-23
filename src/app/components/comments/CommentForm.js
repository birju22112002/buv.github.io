/** @format */

import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../context/auth";
import { Input, Button } from "antd";

const { TextArea } = Input;

const StyledButton = styled(Button)`
  background-color: ${(props) => (props.dark ? "#1890ff" : "")};
  border-color: ${(props) => (props.dark ? "#1890ff" : "")};
  color: ${(props) => (props.dark ? "#fff" : "")};

  &:hover {
    background-color: ${(props) => (props.dark ? "#40a9ff" : "")};
    border-color: ${(props) => (props.dark ? "#40a9ff" : "")};
    color: ${(props) => (props.dark ? "#fff" : "")};
  }
`;

const CommentForm = ({
  comment,
  setComment,
  handleSubmit,
  loading,
  darkTheme,
}) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <>
      <br />
      <TextArea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder='Write a comment...'
        rows='4'
        disabled={auth?.user === null && auth?.token === ""}
        maxLength={200}
      />
      <StyledButton
        dark={darkTheme}
        onClick={handleSubmit}
        loading={loading}
        disabled={comment === ""}
        style={{ marginTop: 4 }}
        type='primary'>
        Post
      </StyledButton>
    </>
  );
};

export default CommentForm;
