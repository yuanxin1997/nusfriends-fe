import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Input, Form } from "antd";

import axios from "axios";
import { Url } from "../constants/global";

function EditModal({
  modalVisible,
  closeEditModal,
  type,
  titlePlaceholder,
  descriptionPlaceholder,
  id,
}) {
  const history = useHistory();
  const { TextArea } = Input;
  const [title, setTitle] = useState(titlePlaceholder);
  const [description, setDescription] = useState(descriptionPlaceholder);

  const editCircle = async () => {
    await axios.put(`${Url}/`);
    closeEditModal();
    history.go(0);
  };

  const editPost = async () => {
    const post = {
      user: { userId: localStorage.userId },
      post: { title: title, content: description },
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

  return (
    <Modal
      title={
        type === "circle"
          ? "Edit circle"
          : type === "post"
          ? "Edit Thread"
          : "Edit Comment"
      }
      visible={modalVisible}
      onCancel={() => closeEditModal()}
      cancelButtonProps={{ displayed: "none", style: { display: "none" } }}
      okText={
        type === "circle"
          ? "Edit circle"
          : type === "post"
          ? "Edit Thread"
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
            label={type === "circle" ? "Circle Description" : "Post Content"}
            name="description"
            rules={[
              {
                required: true,
                message: "Please fill in this field.",
              },
            ]}
            onChange={(e) => setDescription(e.target.value)}
          >
            <TextArea
              placeholder="Type something..."
              defaultValue={descriptionPlaceholder}
            />
          </Form.Item>
        ) : null}
      </Form>
    </Modal>
  );
}

export default EditModal;
