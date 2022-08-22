import React, { useState } from 'react';
import classes from  './index.module.scss';
import { Button, Modal, InputNumber, Form, Input } from 'antd';


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
        </Form>
      </Modal>
    </>
  );
};

export default CreateAdModal;