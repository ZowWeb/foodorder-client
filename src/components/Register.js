import { useContext } from 'react'
import { Typography, Form, Input, Button, Divider, notification } from 'antd'

import { GlobalContext } from '../context/GlobalState'
const { Title } = Typography

const Register = () => {
  const { registerUser, error } = useContext(GlobalContext)

  const onFinish = values => {
    const { name, email, password } = values
    registerUser(name, email, password)
  }
 
  return (
    <>
      <Divider><Title level={2}>Register</Title></Divider>
      <Form
        name="register"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        {error && (
          Object.keys(error).map(e => notification.error({
            message: error[e]
          }))
        )}
      </Form>
    </>
  )
}

export default Register
