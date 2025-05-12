import React, { useEffect } from "react";
import { Button, Card, Col, Form, message, Row } from "antd";
import Input from "antd/es/input/Input";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const UserForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const saveData = async (req) => {
    console.log('Submitting:', req); // Log the form data
    try {
      await axios.post("http://localhost:5000/users/createUsers", req);
      message.success("Created Successfully");
      navigate("/users/user-view");
    } catch (err) {
      console.error('Submission Error:', err.message);
      message.error("Unable to save user!");
    }
  };
  

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Card
      title="Users Form"
      extra={<Button onClick={() => navigate("/users/user-view")}>View</Button>}
    >
      <Form form={form} layout="vertical" onFinish={saveData}>
        <Row gutter={[24, 4]}>
          <Col span={5}>
            <Form.Item label="Name" name="name">
              <Input placeholder="Enter Name" />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="Email" name="email">
              <Input placeholder="Enter Email" />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="Age" name="age">
              <Input placeholder="Enter Age" />
            </Form.Item>
          </Col>
        </Row>
        <Col>
          <Button htmlType="submit" type="primary" style={{ marginTop: "28px" }}>
            Submit
          </Button>
          <Button
            style={{ marginTop: "28px", marginLeft: "10px" }}
            type="dashed"
            danger
            onClick={onReset}
          >
            Reset
          </Button>
        </Col>
      </Form>
    </Card>
  );
};

export default UserForm;
