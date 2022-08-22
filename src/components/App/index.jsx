
import React from 'react';
import './index.scss';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;



function App() {
  return (
    <div className="App">
<Layout>
      <Sider>Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
    </div>
  );
}

export default App;
