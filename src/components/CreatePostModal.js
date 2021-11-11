import React, { useState, useEffect } from "react";
import { Modal, Input, Form, Radio, Row, Col, Select, Spin } from "antd";

import { useHistory } from "react-router-dom";

import axios from "axios";
import { Url } from "../constants/global";

function CreatePostModal({ modalVisible, closeCreateModal, circleId }) {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;
  const [type, setType] = useState("discussion");
  const [tags, setTags] = useState([]);
  const [children, setChildren] = useState([]);
  const [numPollOption, setNumPollOptions] = useState("2");
  const [option1, setOption1] = useState();
  const [option2, setOption2] = useState();
  const [option3, setOption3] = useState();
  const [option4, setOption4] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [loading, setLoading] = useState(true);
  var toAdd = [];

  const history = useHistory();
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const onCancel = () => {
    form.resetFields();
    closeCreateModal();
    setTitle();
    setDescription();
    console.log("cancel");
  };

  const fetchDbTags = async () => {
    try {
      await axios.get(`${Url}/tags`).then((res) => {
        const tags = res.data;
        const children = [];
        tags.forEach((tag) => {
          children.push(<Option key={tag.name}>{tag.name}</Option>);
        });
        setTags(children);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
        tags: toAdd,
      },
    };
    await axios.post(`${Url}/posts`, post);
    closeCreateModal();
    history.go(0);
    form.resetFields();
  };

  const handleCreatePoll2 = async () => {
    const poll = {
      user: {
        userId: localStorage.userId,
      },
      poll: {
        title: title,
        circleId: circleId,
        options: [{ optionContent: option1 }, { optionContent: option2 }],
      },
    };

    await axios.post(`${Url}/polls`, poll);
    closeCreateModal();
    history.go(0);
    form.resetFields();
  };
  const handleCreatePoll3 = async () => {
    const poll = {
      user: {
        userId: localStorage.userId,
      },
      poll: {
        title: title,
        circleId: circleId,
        options: [
          { optionContent: option1 },
          { optionContent: option2 },
          { optionContent: option3 },
        ],
      },
    };

    await axios.post(`${Url}/polls`, poll);
    closeCreateModal();
    history.go(0);
    form.resetFields();
  };
  const handleCreatePoll4 = async () => {
    const poll = {
      user: {
        userId: localStorage.userId,
      },
      poll: {
        title: title,
        circleId: circleId,
        options: [
          { optionContent: option1 },
          { optionContent: option2 },
          { optionContent: option3 },
          { optionContent: option4 },
        ],
      },
    };

    await axios.post(`${Url}/polls`, poll);
    closeCreateModal();
    history.go(0);
    form.resetFields();
  };

  useEffect(() => {
    fetchDbTags();
    console.log("tags" + JSON.stringify(tags));
  }, []);

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <Modal
          title="Create New Post"
          visible={modalVisible}
          onCancel={onCancel}
          destroyOnClose={true}
          cancelButtonProps={{ displayed: "none", style: { display: "none" } }}
          okText="Create Post"
          width={850}
          onOk={
            type === "discussion"
              ? handleCreatePost
              : numPollOption === "2"
              ? handleCreatePoll2
              : numPollOption === "3"
              ? handleCreatePoll3
              : handleCreatePoll4
          }
        >
          <Form
            layout={"vertical"}
            form={form}
            initialValues={{
              layout: "vertical",
            }}
          >
            <Form.Item label="Post Type" name="layout">
              <Radio.Group value={"discussion"}>
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
                  style={{
                    marginRight: "20px",
                    width: 105,
                    textAlign: "center",
                  }}
                  onClick={() => setType("poll")}
                >
                  <p style={{ color: "#fffffff" }}>Poll</p>
                </Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label={type === "discussion" ? "Discussion Title" : "Poll Title"}
              rules={[
                {
                  required: true,
                  message: "Please input title of post!",
                },
              ]}
              name="title"
            >
              <Input
                placeholder="Type something..."
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                defaultValue={title}
              />
            </Form.Item>

            {type === "discussion" ? (
              <Form.Item
                label="Discussion Body"
                rules={[
                  {
                    required: true,
                    message: "Please input body of discussion!",
                  },
                ]}
                name="body"
              >
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
                <Form.Item
                  label="Number of Poll Options"
                  name="numoptions"
                  rules={[
                    {
                      required: true,
                      message: "Please select number of poll options",
                    },
                  ]}
                >
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
                <Form.Item
                  label="Poll Options"
                  rules={[
                    {
                      required: true,
                      message: "Please all selected input poll options!",
                    },
                  ]}
                  name="polloption"
                >
                  <Input
                    style={{ marginBottom: 5 }}
                    placeholder="Option 1"
                    onChange={(e) => {
                      setOption1(e.target.value);
                    }}
                    name="option1"
                    rules={[
                      {
                        required: true,
                        message: "Please all selected input poll options!",
                      },
                    ]}
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
                    style={{ width: "100%" }}
                    placeholder="Search Tags..."
                    onChange={(e) => {
                      toAdd = e;
                    }}
                  >
                    {tags}
                  </Select>

                  {/* <Select
                    mode="tags"
                    style={{ width: "100%", borderRadius: "var(--br-lg)" }}
                    placeholder="Tags Mode"
                    onChange={handleChange}
                  >
                    {children}
                  </Select> */}
                </Form.Item>

                {/* <Input placeholder="Search Tags..." /> */}
              </Col>
            </Row>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default CreatePostModal;
