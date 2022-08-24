
import React, { useEffect, useState } from 'react';
import classes from './index.module.scss';
import { List, Button, message,  Popconfirm  } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';
import { getFileDowloadUrl } from '../../api'

function AdSidebarItem({ item }) {
  const [imageUrl, setImageUrl] = useState() 
  useEffect(() => {
    getFileDowloadUrl(item.imagePath).then(setImageUrl)
  }, [])
  const confirm = () => {
  message.info('You deleted your ad');
};
  return (
    <List.Item className={classes.item}>
     <Popconfirm placement="left" title={'Are you sure you want to delete ad?'} onConfirm={confirm} okText="Yes" cancelText="No">
        <Button><DeleteOutlined /></Button>
      </Popconfirm>
      {imageUrl && <img src={imageUrl} alt=''/>}
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
