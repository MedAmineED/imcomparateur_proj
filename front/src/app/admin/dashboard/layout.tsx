"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import styles from './Dashboard.module.css';

const { Header, Sider, Content } = Layout;
const rootRoute = '/admin/dashboard';

const items = [
  {
    key: rootRoute,
    icon: <UserOutlined />,
    label: 'Clients',
  },
  {
    key: rootRoute + "/guides",
    icon: <VideoCameraOutlined />,
    label: 'Guides',
  },
  {
    key: rootRoute + "/actualities",
    icon: <VideoCameraOutlined />,
    label: 'Actualité',
  },
  {
    key: rootRoute + "/users",
    icon: <UploadOutlined />,
    label: 'Utilisateurs',
  },
];

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider className={`${styles.sidebarCst}`} trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[rootRoute]}
          items={items.map((item) => ({
            key: item.key,
            icon: item.icon,  // Include the icon here
            label: <Link href={item.key}>{item.label}</Link>,
          }))}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
