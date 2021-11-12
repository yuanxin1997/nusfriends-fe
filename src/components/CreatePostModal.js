import React, { useState, useEffect } from "react";
import {
  Modal,
  Input,
  Form,
  Radio,
  Row,
  Col,
  Select,
  Spin,
  Button,
} from "antd";

import { useHistory } from "react-router-dom";
import FroalaEditorComponent from "react-froala-wysiwyg";
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

  const handleCreatePoll2 = async ({ option1, option2 }) => {
    const poll = {
      user: {
        userId: localStorage.userId,
      },
      poll: {
        title: title,
        circleId: circleId,
        options: [{ optionContent: option1 }, { optionContent: option2 }],
        tags: toAdd,
      },
    };
    closeCreateModal();
    await axios.post(`${Url}/polls`, poll);
    history.go(0);
    form.resetFields();
  };
  const handleCreatePoll3 = async ({ option1, option2, option3 }) => {
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
        tags: toAdd,
      },
    };
    closeCreateModal();
    await axios.post(`${Url}/polls`, poll);
    history.go(0);
    form.resetFields();
  };
  const handleCreatePoll4 = async ({ option1, option2, option3, option4 }) => {
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
        tags: toAdd,
      },
    };
    closeCreateModal();
    await axios.post(`${Url}/polls`, poll);
    history.go(0);
    form.resetFields();
  };

  useEffect(() => {
    fetchDbTags();
    console.log("tags" + JSON.stringify(tags));
  }, []);

  const onFinish = (values) => {
    const { option1, option2, option3, option4 } = values;
    if (type === "discussion") {
      if (!description) {
        form.setFields([
          {
            name: ["body"],
            value: "",
            errors: [`Body cannot be empty!`],
          },
        ]);
      } else {
      }
      handleCreatePost();
    } else {
      if (option4) {
        alert("4");
        handleCreatePoll4({ option1, option2, option3, option4 });
      } else if (option3) {
        alert("3");
        handleCreatePoll3({ option1, option2, option3 });
      } else {
        alert("2");
        handleCreatePoll2({ option1, option2 });
      }
    }
  };
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
          width={850}
          footer={null}
        >
          <Form
            layout={"vertical"}
            form={form}
            initialValues={{
              layout: "vertical",
            }}
            onFinish={onFinish}
            requiredMark={false}
          >
            <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
              Post Type
            </div>
            <Radio.Group value={type}>
              <Radio.Button
                value="discussion"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 105,
                  textAlign: "center",
                  marginBottom: "1.5rem",
                }}
                onClick={() => setType("discussion")}
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
              <Form.Item label="Discussion Body" name="body">
                <FroalaEditorComponent
                  config={{
                    placeholderText: "Edit Your Content Here!",
                  }}
                  onModelChange={(value) => {
                    setDescription(value);
                  }}
                  tag="textarea"
                />
              </Form.Item>
            ) : (
              <div>
                <Form.Item label="Number of Poll Options" name="numoptions">
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
                <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                  Poll Options
                </div>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please enter your inputs!",
                    },
                  ]}
                  name="option1"
                >
                  <Input
                    placeholder="Option 1"
                    onChange={(e) => setOption1(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please enter your inputs!",
                    },
                  ]}
                  name="option2"
                >
                  <Input
                    style={{ top: "-1rem" }}
                    placeholder="Option 2"
                    onChange={(e) => setOption2(e.target.value)}
                  />
                </Form.Item>

                {(numPollOption === "3" || numPollOption === "4") && (
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please enter your inputs!",
                      },
                    ]}
                    name="option3"
                  >
                    <Input
                      style={{ top: "-2rem" }}
                      placeholder="Option 3"
                      onChange={(e) => setOption3(e.target.value)}
                    />
                  </Form.Item>
                )}
                {numPollOption === "4" && (
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please enter your inputs!",
                      },
                    ]}
                    name="option4"
                  >
                    <Input
                      style={{ top: "-3rem" }}
                      placeholder="Option 4"
                      onChange={(e) => setOption4(e.target.value)}
                    />
                  </Form.Item>
                )}
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
                </Form.Item>

                {/* <Input placeholder="Search Tags..." /> */}
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Done
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default CreatePostModal;
