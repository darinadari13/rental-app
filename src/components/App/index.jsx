
import React, { useState } from 'react';
import classes from './index.module.scss';
import { Layout } from 'antd';
import Map from  '../Map'
import CreateAdModal from '../CreateAdModal'
import { getAdList } from '../../api'
import AdSidebar from '../AdSidebar';
import { debounce } from '../../utils'
import { HomeOutlined } from '@ant-design/icons';
const { Header, Sider, Content } = Layout;

function App() {
  const [adList, setAdList] = useState([]);
  const [selectedAdId, setSelectedAdId] = useState();

  const selectedAd = adList.find(ad => ad.id === selectedAdId)

  const markers = adList.map(ad => ({ id: ad.id, title: ad.title,  position: ad.location }))

  const fetchAdList = debounce(({ northEast, southWest }) => {
    getAdList({ northEast, southWest }).then(setAdList)
  }, 200)

  const onAdCreate = (ad) => {
    setAdList([...adList, ad])
  }

  const onAdRemove = (id) => {
    setAdList(adList.filter(ad => ad.id !== id))
  }


  const onMarkerSelect = (id) => {
    setSelectedAdId(id)
  }
  return (
    <Layout className={classes.root}>
      <Header> <HomeOutlined className={classes.logo}/><CreateAdModal onCreate={onAdCreate} /></Header>
      <Layout>
        <Content><Map markers={markers} fetchAdList={fetchAdList} onMarkerSelect={onMarkerSelect} /></Content>
        <Sider className={classes.sider}><AdSidebar adList={selectedAd ? [selectedAd] : adList} onAdRemove={onAdRemove} /></Sider>
      </Layout>
    </Layout>
  );
}

export default App;
