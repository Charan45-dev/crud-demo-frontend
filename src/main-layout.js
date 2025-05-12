import { Layout, Menu } from "antd";
import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { HomeOutlined, UserOutlined } from "@ant-design/icons"; // You can add icons from Ant Design for better UX

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        className="site-layout-background"
        style={{ padding: 0, background: "#fff" }}
      >
        <div
          style={{ padding: "0 24px", display: "flex", alignItems: "center" }}
        >
          <h2 style={{ marginLeft: 850 }}>Students Data</h2>
        </div>
      </Header>

      {/* Sidebar */}
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu mode="inline" theme="dark" defaultSelectedKeys={["1"]}>
            <Menu.Item
              key="1"
              icon={<HomeOutlined />}
              onClick={() => navigate("/")}
            >
              Home
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<UserOutlined />}
              onClick={() => navigate("/users/user-view")}
            >
              Users
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
