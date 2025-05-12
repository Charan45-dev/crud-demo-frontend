import React, { useState, useEffect } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../services/userService";
import { Form, Input, Button, List, Space, message } from "antd";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      message.error("Failed to load users!");
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingId) {
        await updateUser(editingId, values);
        message.success("User updated successfully!");
      } else {
        await createUser(values);
        message.success("User created successfully!");
      }
      form.resetFields();
      setEditingId(null);
      loadUsers();
    } catch (error) {
      message.error("Failed to save user!");
    }
  };

  const handleEdit = (user) => {
    form.setFieldsValue(user);
    setEditingId(user.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      message.success("User deleted successfully!");
      loadUsers();
    } catch (error) {
      message.error("Failed to delete user!");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h1 style={{ textAlign: "center" }}>User Management</h1>

      {/* Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{
          padding: "20px",
          border: "1px solid #f0f0f0",
          borderRadius: "8px",
          marginBottom: "20px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Enter a valid email!" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          name="age"
          label="Age"
          rules={[
            { required: true, message: "Please enter your age!" },
            { type: "number", message: "Enter a valid number!", transform: (value) => Number(value) },
          ]}
        >
          <Input placeholder="Enter age" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {editingId ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>

      {/* User List */}
      <List
        bordered
        dataSource={users}
        renderItem={(user) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => handleEdit(user)}>
                Edit
              </Button>,
              <Button type="link" danger onClick={() => handleDelete(user.id)}>
                Delete
              </Button>,
            ]}
          >
            <Space>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
              <span>{user.age}</span>
            </Space>
          </List.Item>
        )}
      />
    </div>
  );
}

export default UserManagement;
