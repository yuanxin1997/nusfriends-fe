import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Input, Form, Select, Spin } from "antd";
import FroalaEditorComponent from "react-froala-wysiwyg";
import axios from "axios";
import { Url } from "../constants/global";

function EditModal({
  modalVisible,
  closeEditModal,
  type,
  titlePlaceholder,
  descriptionPlaceholder,
  id,
  tags,
}) {
  const { Option } = Select;
  const history = useHistory();
  const { TextArea } = Input;
  const [title, setTitle] = useState(titlePlaceholder);
  const [description, setDescription] = useState(descriptionPlaceholder);
  var toAdd = [];
  const [dbTags, setDbTags] = useState([]);
  const [loading, setLoading] = useState(true);

  const editCircle = async () => {
    await axios.put(`${Url}/`);
    closeEditModal();
    history.go(0);
  };

  const editPost = async () => {
    const post = {
      user: { userId: parseInt(localStorage.userId) },
      post: {
        title: title,
        content: description,
        tags: toAdd.length === 0 ? tags : toAdd,
      },
    };

    await axios.put(`${Url}/posts/${id}`, post);
    closeEditModal();
    history.go(0);
  };

  const editComment = async () => {
    const comment = {
      user: { userId: localStorage.userId },
      comment: { content: title },
    };
    await axios.put(`${Url}/comments/${id}`, comment);
    closeEditModal();
    history.go(0);
  };

  const fetchDbTags = async () => {
    try {
      await axios.get(`${Url}/tags`).then((res) => {
        const tags = res.data;
        const children = [];
        tags.forEach((tag) => {
          children.push(<Option key={tag.name}>{tag.name}</Option>);
        });
        setDbTags(children);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDbTags();
  }, []);

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <Modal
          title={
            type === "circle"
              ? "Edit circle"
              : type === "post"
              ? "Edit Post"
              : "Edit Comment"
          }
          visible={modalVisible}
          onCancel={() => closeEditModal()}
          cancelButtonProps={{ displayed: "none", style: { display: "none" } }}
          okText={
            type === "circle"
              ? "Edit circle"
              : type === "post"
              ? "Edit Post"
              : "Edit Comment"
          }
          onOk={
            type === "circle"
              ? editCircle
              : type === "post"
              ? editPost
              : editComment
          }
          width={850}
        >
          <Form
            name="create"
            layout={"vertical"}
            s
            initialValues={{
              layout: "vertical",
            }}
          >
            <Form.Item
              label={
                type === "circle"
                  ? "Circle Title"
                  : type === "post"
                  ? "Post Title"
                  : "Comment Description"
              }
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please fill in this field.",
                },
              ]}
              onChange={(e) => setTitle(e.target.value)}
            >
              <TextArea
                placeholder="Type something..."
                defaultValue={titlePlaceholder}
              />
            </Form.Item>

            {type === "circle" || type === "post" ? (
              <Form.Item
                label={
                  type === "circle" ? "Circle Description" : "Post Content"
                }
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please fill in this field.",
                  },
                ]}
                onChange={(e) => setDescription(e.target.value)}
              >
                <FroalaEditorComponent
                  model={descriptionPlaceholder}
                  config={{
                    placeholderText: "Edit Your Content Here!",
                  }}
                  onModelChange={(value) => {
                    setDescription(value);
                  }}
                  tag="textarea"
                />
              </Form.Item>
            ) : null}

            <Form.Item label="Tags">
              {tags && (
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  placeholder="Search for your interests and add them here!"
                  defaultValue={tags}
                  onChange={(e) => {
                    toAdd = e;
                  }}
                >
                  {dbTags}
                </Select>
              )}
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default EditModal;
