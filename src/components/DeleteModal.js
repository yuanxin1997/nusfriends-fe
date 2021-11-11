import React from "react";
import { useHistory } from "react-router";
import { Modal, notification } from "antd";
import axios from "axios";
import { Url } from "../constants/global";

import { WarningOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

function DeleteModal({ modalVisible, closeDeleteModal, type, id }) {
  const history = useHistory();

  async function handleConfirmDelete() {
    const user = {
      user: {
        userId: localStorage.userId,
      },
    };
    if (type === "circle") {
      await axios.delete(`${Url}/posts/${id}`);
      history.go(0);
      closeDeleteModal();
    } else if (type === "post") {
      await axios
        .delete(`${Url}/posts/${id}`, { data: user })
        .then((res) => {
          history.push("/");
          closeDeleteModal();
        })
        .catch((error) => {
          notification.open({
            message: "Error deleting Post.",
            description: "Posts with existing comments cannot be deleted.",
            icon: <WarningOutlined />,
            onClick: () => {
              console.log("Notification Clicked!");
            },
          });
        });
    } else if (type === "poll") {
      await axios
        .delete(`${Url}/polls/${id}`)
        .then((res) => {
          history.push("/");
          closeDeleteModal();
        })
        .catch((error) => {
          notification.open({
            message: "Error deleting Post.",
            description: "Posts with existing comments cannot be deleted.",
            icon: <WarningOutlined />,
            onClick: () => {
              console.log("Notification Clicked!");
            },
          });
        });
    } else {
      await axios
        .delete(`${Url}/comments/${id}`, { data: user })
        .then((res) => {
          history.go(0);
          closeDeleteModal();
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
