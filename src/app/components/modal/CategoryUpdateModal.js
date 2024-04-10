/** @format */

"use client";
import { Modal, Form, Input, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

const CategoryUpdateModal = ({
  visible,
  setVisible,
  handleUpdate,
  updatingCategory,
  theme, // Theme prop
}) => {
  // Button style based on theme
  const buttonStyle = {
    backgroundColor: theme === "dark" ? "#333" : "#f0f0f0",
    color: theme === "dark" ? "#fff" : "#000",
    border: "none",
  };

  return (
    <Modal
      title='Update category'
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}>
      <Form
        onFinish={handleUpdate}
        fields={[{ name: ["name"], value: updatingCategory.name }]}>
        <Form.Item name='name'>
          <Input
            prefix={<EditOutlined className='site-form-item-icon' />}
            placeholder='Give it a name'
          />
        </Form.Item>
        <Button type='primary' htmlType='submit' style={buttonStyle}>
          Submit
        </Button>
      </Form>
    </Modal>
  );
};

export default CategoryUpdateModal;
