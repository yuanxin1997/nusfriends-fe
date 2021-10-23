import React, { useState } from "react";
import { Modal, Input, Form, Radio, Row, Col } from "antd";

function CreatePostModal({ modalVisible, closeCreateModal }) {
  const [form] = Form.useForm();

  const { TextArea } = Input;

  return (
    <Modal
      title="Create New Post"
      visible={modalVisible}
      onCancel={() => closeCreateModal()}
      cancelButtonProps={{ displayed: "none", style: { display: "none" } }}
      okText="Create Post"
      width={850}
    >
      <Form
        layout={"vertical"}
        form={form}
        initialValues={{
          layout: "vertical",
        }}
      >
        <Form.Item label="Topic Title">
          <Input placeholder="Type something..." />
        </Form.Item>
        <Form.Item label="Topic Type" name="layout">
          <Radio.Group value={"vertical"}>
            <Radio.Button value="discussion">Discussion</Radio.Button>
            <Radio.Button value="questions">Questions</Radio.Button>
            <Radio.Button value="poll">Poll</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Topic Body">
          <TextArea
            placeholder="Type something..."
            autoSize={{ minRows: 4, maxRows: 8 }}
          />
        </Form.Item>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="Circles/Category">
              <Input placeholder="Search Circles..." />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item label="Tags">
              <Input placeholder="Search Tags..." />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default CreatePostModal;
