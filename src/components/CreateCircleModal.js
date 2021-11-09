import React, { useState } from "react";
import { Modal, Input, Form, Radio, Row, Col } from "antd";
import { CommentOutlined } from "@ant-design/icons";

import { useHistory } from "react-router-dom";
import axios from "axios";
import { Url } from "../constants/global";

function CreateCircleModal({ modalVisible, closeCreateModal }) {
  const [form] = Form.useForm();

  const { TextArea } = Input;

  const [name, setName] = useState();
  const [description, setDescription] = useState();

  const history = useHistory();

  const onCreate = async () => {
    const circle = {
      name: name,
      description: description,
      status: "Open",
      userId: parseInt(localStorage.userId),
    };

    try {
      await axios.post(`${Url}/circles/`, { circle }).then((res) => {});
    } catch (error) {
      console.log(error);
    }
    // console.log("id");
    console.log(circle);
    closeCreateModal();
    history.go(0);
  };

  return (
    <Modal
      title="Create New Circle"
      visible={modalVisible}
      onCancel={() => closeCreateModal()}
      cancelButtonProps={{ displayed: "none", style: { display: "none" } }}
      okText="Create Circle"
      width={850}
      onOk={() => onCreate()}
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
