import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Input, Form, Radio, Row, Col } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import FroalaEditorComponent from "react-froala-wysiwyg";
import axios from "axios";
import { Url } from "../constants/global";

function CreateCommentModal({ modalVisible, closeCreateModal, postId }) {
  const [form] = Form.useForm();

  const { TextArea } = Input;

  const [content, setContent] = useState();

  const history = useHistory();

  const handleCreate = async () => {
    const comment = {
      user: { userId: parseInt(localStorage.userId) },
      comment: { content: content },
    };
    console.log(comment);

    try {
      await axios.post(`${Url}/comments/post/${postId}`, comment);
    } catch (error) {
      console.log(error);
    }
    closeCreateModal();
    history.go(0);
  };

  const onCancel = () => {
    form.resetFields();
    closeCreateModal();
    setContent();
  };

  return (
    <Modal
      title="Create Comment"
      visible={modalVisible}
      onCancel={onCancel}
      cancelButtonProps={{ displayed: "none", style: { display: "none" } }}
      okText="Comment"
      width={850}
      onOk={() => handleCreate()}
    >
      <Form
        layout={"vertical"}
        form={form}
        initialValues={{
          layout: "vertical",
        }}
      >
        <Form.Item label="Comment">
          <FroalaEditorComponent
            config={{
              placeholderText: "Type something...",
            }}
            onModelChange={(value) => {
              setContent(value);
            }}
            tag="textarea"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateCommentModal;
