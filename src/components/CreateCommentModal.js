import React, { useState } from "react";
import { Modal, Input, Form, Radio, Row, Col } from "antd";
import { CommentOutlined } from "@ant-design/icons";

function CreateCommentModal({ modalVisible, closeCreateModal }) {
  const [form] = Form.useForm();

  const { TextArea } = Input;

  return (
    <Modal
      title="Create Comment"
      visible={modalVisible}
      onCancel={() => closeCreateModal()}
      cancelButtonProps={{ displayed: "none", style: { display: "none" } }}
      okText="Comment"
      width={850}
    >
      <Form
        layout={"vertical"}
        form={form}
        initialValues={{
          layout: "vertical",
        }}
      >
        <Form.Item label="Comment">
          <TextArea
            placeholder="What are your thoughts?"
            autoSize={{ minRows: 4, maxRows: 8 }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateCommentModal;
