
import React, { useEffect, useState } from 'react';
import classes from './index.module.scss';
import { List, Button, message,  Popconfirm  } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';
import { getFileDowloadUrl, deleteAd } from '../../api'

function AdSidebarItem({ item, onAdRemove }) {
  const [imageUrl, setImageUrl] = useState() 
  useEffect(() => {
    getFileDowloadUrl(item.imagePath).then(setImageUrl)
  }, [])

  const confirm = () => {
    deleteAd(item.id)
      .then(() => {
          onAdRemove(item.id)
          message.info('Ви видалили ваше оголошення');
      })
  };
  return (
    <List.Item className={classes.item}>
     <Popconfirm placement="left" title={'Ви впевнені, що хочете видалити оголошення?'} onConfirm={confirm} okText="Так" cancelText='Ні'>
        <Button><DeleteOutlined /></Button>
      </Popconfirm>
      {imageUrl && <img src={imageUrl} alt=''/>}
      <span>{item.title}</span>
      <span>{item.price} UAH</span>
    </List.Item>
  );
}

function AdSidebar({ adList, onAdRemove }) {
  return (
    <div className={classes.root}>

      <List
        size="large"
        bordered
        dataSource={adList}
        renderItem={item => <AdSidebarItem key={item.id} item={item} onAdRemove={onAdRemove} />}
      />
    </div>
  );
}

export default AdSidebar;
