import React, { useState } from "react";
import { Modal, Input, Form, Radio, Row, Col } from "antd";
import { CommentOutlined } from "@ant-design/icons";

function CreateCircleModal({ modalVisible, closeCreateModal }) {
  const [form] = Form.useForm();

  const { TextArea } = Input;

  const [name, setName] = useState();
  const [description, setDescription] = useState();

  return (
    <Modal
      title="Create New Circle"
      visible={modalVisible}
      onCancel={() => closeCreateModal()}
      cancelButtonProps={{ displayed: "none", style: { display: "none" } }}
      okText="Create Circle"
      width={850}
      onOk={() => console.log("description" + description)}
    >
      <Form
        layout={"vertical"}
        form={form}
        initialValues={{
          layout: "vertical",
        }}
      >
        <Form.Item label="Circle Title">
          <Input
            placeholder="Type something..."
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Circle Description">
          <TextArea
            placeholder="Type something..."
            autoSize={{ minRows: 4, maxRows: 8 }}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateCircleModal;
