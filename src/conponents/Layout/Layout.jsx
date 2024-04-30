/* eslint-disable react/prop-types */
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Button } from 'antd/es/radio';
// import fetch from 'node-fetch';
import { useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Projects', '1',<PieChartOutlined />,[
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    // getItem('Alex', '5'),
 getItem( <Button>Add Projects</Button>)
  ]),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];


export async function getServerSideProps() {
    try {
      // Fetch data from external API
      const res = await fetch('http://localhost:5000/api/v1/projects');
      
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
      }
  
      const data = await res.json();
  
      // Pass data to the page via props
      return { props: { data } };
    } catch (error) {
      console.error('Error fetching data:', error.message);
      return { props: { data: null } }; // Handle the error gracefully
    }
  }

const LayoutCompontens =async ({data}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  console.log(data)
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutCompontens;


// export async function getServerSideProps() {
//     // Fetch data from external API
//     const res = await fetch(`http://localhost:5000/api/v1/projects`)
//     const data = await res.json()
   
//     // Pass data to the page via props
//     return { props: { data } }
//   }
