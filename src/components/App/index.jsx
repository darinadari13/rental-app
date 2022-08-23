
import React, { useState, useEffect } from 'react';
import classes from './index.module.scss';
import { Layout } from 'antd';
import Map from  '../Map'
import CreateAdModal from '../CreateAdModal'
import { getAdList } from '../../api'
import AdSidebar from '../AdSidebar';

const { Header, Sider, Content } = Layout;

function App() {
  const [adList, setAdList] = useState([]);

  const markers = adList.map(ad => ({ id: ad.id, position: ad.location }))

  const onAdCreate = () => {
    getAdList().then(setAdList)
  }

  useEffect(() => {
    getAdList().then(setAdList)
  }, [])
  return (
    <Layout className={classes.root}>
      <Header><CreateAdModal onCreate={onAdCreate} /></Header>
      <Layout>
        <Content><Map markers={markers} /></Content>
        <Sider className={classes.sider}><AdSidebar adList={adList} /></Sider>
      </Layout>
    </Layout>
  );
}

export default App;
