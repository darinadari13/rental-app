import React, { useState } from 'react';
import classes from  './index.module.scss';
import { Button, Modal, InputNumber, Form, Input } from 'antd';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';


const CreateAdModal = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit()
    // setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
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

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
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

          
        </Form>
      </Modal>
    </>
  );
};

export default CreateAdModal;