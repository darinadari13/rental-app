import React, { useState } from 'react';
import { Button, Modal, InputNumber, Form, Input, Upload } from 'antd';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { createAd, uploadFile } from '../../api'
import { UploadOutlined } from '@ant-design/icons';

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
      <Button type="primary" onClick={showModal}>
        Здати в оренду
      </Button>
      <Modal title="Create Ad" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="ad"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input title!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: 'Please input price!',
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[
              {
                required: true,
                message: 'Please input address!',
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
            label="Image"
            name="imagePath"
            rules={[
              {
                required: true,
                message: 'Please add image!',
              },
            ]}
          >
            <Upload onChange={onUploadChange}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          
        </Form>
      </Modal>
    </>
  );
};

export default CreateAdModal;