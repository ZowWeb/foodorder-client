import { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { Divider, Form, Input, Button, Typography, notification } from 'antd'

import { GlobalContext } from '../context/GlobalState'
const { Title } = Typography

const Login = ({ history }) => {
  const { loginUser, error } = useContext(GlobalContext)

  const onFinish = async values => {
    const { email, password } = values
    await loginUser(email, password)
    if(!error) history.push('/foods')
  }
  const onFinishFailed = errorInfo => {
    console.log('Failed', errorInfo)
  }

  return (
    <>
      <Divider><Title level={2}>Login</Title></Divider>
      <Form
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
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

export default withRouter(Login)
