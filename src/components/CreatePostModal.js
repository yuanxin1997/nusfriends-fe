import React, { useState, useEffect } from "react";
import { Modal, Input, Form, Radio, Row, Col, Select } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import { useSetState } from "react-use";

import axios from "axios";
import { Url } from "../constants/global";

function CreatePostModal({ modalVisible, closeCreateModal, circleId }) {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;
  const [type, setType] = useState("discussion");
  const [tags, setTags] = useState([]);
  const [children, setChildren] = useState([]);
  const [numPollOption, setNumPollOptions] = useState(2);
  const [option1, setOption1] = useState();
  const [option2, setOption2] = useState();
  const [option3, setOption3] = useState();
  const [option4, setOption4] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

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

  const handleCreatePost = async () => {
    const post = {
      user: {
        userId: localStorage.userId,
      },
      post: {
        title: title,
        content: description,
        circleId: circleId,
      },
    };
    console.log(post);
  };

  const handleCreatePoll = async () => {
    const poll = {
      user: {
        userId: localStorage.userId,
      },
      post: {
        title: title,
        content: description,
        circleId: circleId,
        options: [
          { optionContent: option1 },
          { optionContent: option2 },
          { optionContent: option3 ? option3 : null },
          { optionContent: option4 ? option4 : null },
        ],
      },
    };
    console.log(poll);
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
      onOk={type === "discussion" ? handleCreatePost : handleCreatePoll}
    >
      <Form
        layout={"vertical"}
        form={form}
        initialValues={{
          layout: "vertical",
        }}
      >
        <Form.Item label="Post Type" name="layout">
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

        <Form.Item
          label={type === "discussion" ? "Discussion Title" : "Poll Title"}
        >
          <Input
            placeholder="Type something..."
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Form.Item>

        {type === "discussion" ? (
          <Form.Item label="Discussion Body">
            <TextArea
              placeholder="Type something..."
              autoSize={{ minRows: 4, maxRows: 8 }}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Form.Item>
        ) : (
          <div>
            <Form.Item label="Number of Poll Options">
              <Select
                defaultValue="2"
                onChange={(value) => {
                  setNumPollOptions(value);
                }}
              >
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Poll Options">
              <Input
                style={{ marginBottom: 5 }}
                placeholder="Option 1"
                onChange={(e) => {
                  setOption1(e.target.value);
                }}
              />
              <Input
                style={{ marginBottom: 5 }}
                placeholder="Option 2"
                onChange={(e) => {
                  setOption2(e.target.value);
                }}
              />
              {numPollOption === "3" || numPollOption === "4" ? (
                <Input
                  style={{ marginBottom: 5 }}
                  placeholder="Option 3"
                  onChange={(e) => {
                    setOption3(e.target.value);
                  }}
                />
              ) : null}
              {numPollOption === "4" ? (
                <Input
                  style={{ marginBottom: 5 }}
                  placeholder="Option 4"
                  onChange={(e) => {
                    setOption4(e.target.value);
                  }}
                />
              ) : null}
            </Form.Item>
          </div>
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
