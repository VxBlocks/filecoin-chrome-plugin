import React from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import { Input, Button, Form,message } from 'antd';
import './relogin.less';
export default function ReLogin() {
  const {state} = useLocation();
  const navigate = useNavigate();
  const onFinish = (value:any) => {
    if(value.password !== state){
      error()
    }else{
      navigate('/wallet');
    }
  }
  // 密码错误提示
  const error = ()=>{
    message.error('密码错误');
  }
  return (
    <div className='relogin-container'>
      <div className="main">
        <div className="header">
          <img src="/images/logo.svg" alt="" />
        </div>
        <h3>你好</h3>
        <h1>欢迎回来</h1>
        <Form
          layout='vertical'
          onFinish={onFinish}
          style={{
            display:'flex',
            flexFlow:'column nowrap',
            justifyContent:'space-between'
          }}
        >
          <Form.Item
            label="输入密码"
            name='password'
            rules={[
              { required: true, message: '请输入密码' }
            ]}
            style={{
              marginBottom:'150px'
            }}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
           style={{
            textAlign:'center'
          }}
          >
            <Button type='primary' htmlType='submit' style={{ width: '100%',margin:'10px auto' }}>解锁钱包</Button>
            <a className="forget" onClick={()=>{navigate('/import')}} >忘记密码？</a>
          </Form.Item>
        </Form>

      </div>
    </div>
  )
}
