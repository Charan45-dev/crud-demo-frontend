import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Table, message, Popconfirm } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UsersView = () => {
  const [usersData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users/getAllUsers");
      if (res) {
        setUserData(res.data);
      }
    } catch (err) {
      message.error("Failed to fetch users.");
    }
  };

  const handleEdit = (record) => {
    navigate("/users/user-form", { state: { user: record } });
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/users/${userId}`);
      message.success(response.data.message);
      // Re-fetch updated list of users
      const updatedUsers = await axios.get("http://localhost:5000/users/getAllUsers");
      setUserData(updatedUsers.data); // Update the UI with the fresh data
    } catch (err) {
      console.error("Error deleting user:", err.message);
      message.error("Unable to delete user!");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "Age",
      dataIndex: "age",
      align: "center",
    },
    {
      title: "Actions",
      align: "center",
      render: (text, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            type="link"
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => deleteUser(record.id)} // Fixed function reference
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} type="link" danger />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Card
      title="User View"
      extra={
        <Button type="primary" onClick={() => navigate("/users/user-form")}>
          Create
        </Button>
      }
    >
      <Table
        columns={columns}
        size="small"
        bordered
        dataSource={usersData}
        pagination={false}
        rowKey={(record) => record.id}
      />
    </Card>
  );
};

export default UsersView;
