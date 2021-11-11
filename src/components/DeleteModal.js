import React from "react";
import { useHistory } from "react-router";
import { Modal, notification, message } from "antd";
import axios from "axios";
import { Url } from "../constants/global";

import { WarningOutlined } from "@ant-design/icons";

function DeleteModal({ modalVisible, closeDeleteModal, type, id, data }) {
  const history = useHistory();

  async function handleConfirmDelete() {
    const user = {
      user: {
        userId: localStorage.userId,
      },
    };
    if (type === "circle") {
      if (data.length > 0) {
        notification["warning"]({
          message: "Unable to delete",
          description: "You cannot delete a circle with existing posts",
        });
      } else {
        await axios.delete(`${Url}/circles/${id}`);
        history.push("/my-circles");
        message.success("Sucessfully deleted a circle");
      }
      closeDeleteModal();
    } else if (type === "post") {
      if (data.length > 0) {
        notification["warning"]({
          message: "Unable to delete",
          description: "You cannot delete a post with existing comments",
        });
      } else {
        await axios.delete(`${Url}/posts/${id}`);
        history.push("/");
        message.success("Sucessfully deleted a post");
      }
      closeDeleteModal();
    } else if (type === "poll") {
      if (data.length > 0) {
        notification["warning"]({
          message: "Unable to delete",
          description: "You cannot delete a post with existing comments",
        });
      } else {
        await axios.delete(`${Url}/polls/${id}`);
        history.push("/");
        message.success("Sucessfully deleted a post");
      }
      closeDeleteModal();
    } else {
      await axios
        .delete(`${Url}/comments/${id}`, { data: user })
        .then((res) => {
          history.go(0);
          message.success("Sucessfully deleted a comment");
        });
    }
  }

  return (
    <Modal
      title={
        type === "circle"
          ? "Delete Circle"
          : type === "post"
          ? "Delete Post"
          : type === "poll"
          ? "Delete Poll"
          : "Delete Comment"
      }
      visible={modalVisible}
      onOk={() => handleConfirmDelete()}
      onCancel={() => closeDeleteModal()}
      okText="Confirm"
    >
      <p>Are you sure you want to delete the {type}?</p>
    </Modal>
  );
}

export default DeleteModal;
