
import React from 'react';
import classes from './index.module.scss';
import { Layout } from 'antd';
import { db }  from '../../firebase';
import { uid } from 'uid';
import Map from  '../Map'
import CreateAdModal from '../CreateAdModal'
const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <Layout className={classes.root}>
      <Header><CreateAdModal/></Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content><Map /></Content>
      </Layout>
      <Footer>
        </Footer>
    </Layout>
  );
}

export default App;
