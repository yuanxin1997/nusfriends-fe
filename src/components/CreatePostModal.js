import React, { useState, useEffect } from "react";
import { Modal, Input, Form, Radio, Row, Col, Select } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import { useSetState } from "react-use";

import axios from "axios";
import { Url } from "../constants/global";

function CreatePostModal({ modalVisible, closeCreateModal }) {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;
  const [type, setType] = useState("discussion");
  const [tags, setTags] = useState([]);
  const [children, setChildren] = useState([]);

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const fetchTags = async () => {
    await axios.get(`${Url}/tags`).then((res) => {
      setTags(res.data);
      tags.map((tag) => {
        children.push(<Option key={tag.tagid}>{tag.name}</Option>);
        console.log("tag: " + tag.name);
      });
    });
  };

  useEffect(() => {
    fetchTags();
    console.log("tags" + JSON.stringify(tags));
  }, []);
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
            <Radio.Button
              value="discussion"
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 105,
                textAlign: "center",
              }}
              onClick={() => setType("discussion")}
              checked={true}
            >
              <p>Discussion</p>
            </Radio.Button>
            <Radio.Button
              value="poll"
              style={{ marginRight: "20px", width: 105, textAlign: "center" }}
              onClick={() => setType("poll")}
            >
              <p style={{ color: "#fffffff" }}>Poll</p>
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        {type === "discussion" ? (
          <Form.Item label="Topic Body">
            <TextArea
              placeholder="Type something..."
              autoSize={{ minRows: 4, maxRows: 8 }}
            />
          </Form.Item>
        ) : (
          <Form.Item label="Topic Body">poll</Form.Item>
        )}

        <Row gutter={24}>
          <Col span={24}>
            <Form.Item label="Tags">
              <Select
                mode="tags"
                style={{ width: "100%", borderRadius: "var(--br-lg)" }}
                placeholder="Tags Mode"
                onChange={handleChange}
              >
                {children}
              </Select>
            </Form.Item>

            {/* <Input placeholder="Search Tags..." /> */}
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default CreatePostModal;
