import React, { useState } from 'react';
import { Button, Modal, InputNumber, Form, Input, Upload } from 'antd';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { createAd, uploadFile } from '../../api'
import { UploadOutlined } from '@ant-design/icons';
import classes from './index.module.scss';
import { getStatusClassNames } from 'antd/lib/_util/statusUtils';

const CreateAdModal = ({ onCreate }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit()
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSuccessCreate = (doc) => {
    onCreate(doc)
    form.resetFields()
    setIsModalVisible(false)
  }

  const onFinish = (values) => {
    createAd(values)
      .then(onSuccessCreate)
      .catch(error => console.log('Failed:', error))
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onLocationChange = (value) => {
    geocodeByAddress(value.label)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) =>
        form.setFieldValue('location', { lat, lng })
      );
  }

  const onUploadChange = ({ file, event }) => {
    const { originFileObj } = file

    if (event) {
      uploadFile(originFileObj).then(filePath => form.setFieldValue('imagePath', filePath))
    }
  }

  return (
    <>
      <Button className={classes.root} type="primary" onClick={showModal}>
        Здати в оренду
      </Button>
      <Modal title="Додати оголошення" visible={isModalVisible} cancelText='Відмінити' okText='Додати' onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="ad"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Назва"
            name='title'
            rules={[
              {
                required: true,
                message: 'Будь ласка упишіть назву!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ціна"
            name="price"
            rules={[
              {
                required: true,
                message: 'Будь ласка упишіть ціну!',
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label='Адреса'
            name="location"
            rules={[
              {
                required: true,
                message: 'Будь ласка упишіть адресу!',
              },
            ]}
          >
            <GooglePlacesAutocomplete
              selectProps={{ onChange: onLocationChange }}
              apiOptions={{ language: 'ua', region: 'ua' }}
              autocompletionRequest={{
                componentRestrictions: {
                  country: ['ua'],
                }
              }}
            />
          </Form.Item>
          
           <Form.Item 
            label="Зображення"
            name="imagePath"
            rules={[
              {
                required: true,
                message: 'Будь ласка додайте зображення!',
              },
            ]}
          >
            <Upload onChange={onUploadChange}>
              <Button icon={<UploadOutlined />}>Завантажити</Button>
            </Upload>
          </Form.Item>
          
        </Form>
      </Modal>
    </>
  );
};

export default CreateAdModal;