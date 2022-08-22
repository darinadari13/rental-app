
import React from 'react';
import classes from './index.module.scss';
import { Layout } from 'antd';
import Map from  '../Map'

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <Layout className={classes.root}>
      <Header>Header</Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content><Map /></Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
