
import React, { useState, useEffect } from 'react';
import classes from './index.module.scss';
import { Layout } from 'antd';
import Map from  '../Map'
import CreateAdModal from '../CreateAdModal'
import { getAdList, deleteAd } from '../../api'

const { Header, Sider, Content } = Layout;

function App() {
  const [adList, setAdList] = useState([]);

  const markers = adList.map(ad => ({ id: ad.id, position: ad.location }))

  useEffect(() => {
    getAdList().then(setAdList)
  }, [])
  return (
    <Layout className={classes.root}>
      <Header><CreateAdModal/></Header>
      <Layout>
        <Content><Map markers={markers} /></Content>
         <Sider>Sider</Sider>
      </Layout>
    </Layout>
  );
}

export default App;
