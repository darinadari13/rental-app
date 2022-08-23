
import React, { useEffect, useState } from 'react';
import classes from './index.module.scss';
import { List } from 'antd'
import { getFileDowloadUrl } from '../../api'

function AdSidebarItem({ item }) {
  const [imageUrl, setImageUrl] = useState() 

  useEffect(() => {
    getFileDowloadUrl(item.imagePath).then(setImageUrl)
  }, [])
  return (
    <List.Item className={classes.item}>
      {imageUrl && <img src={imageUrl} />}
      <span>{item.title}</span>
      <span>{item.price} UAH</span>
    </List.Item>
  );
}

function AdSidebar({ adList }) {
  return (
    <div className={classes.root}>
      <List
        size="large"
        bordered
        dataSource={adList}
        renderItem={item => <AdSidebarItem key={item.id} item={item} />}
      />
    </div>
  );
}

export default AdSidebar;
