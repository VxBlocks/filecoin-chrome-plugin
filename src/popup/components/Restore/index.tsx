import React from 'react';
import { NavBar, TextArea, Input, Button } from 'antd-mobile';
import { useLocation,useNavigate } from 'react-router-dom';

import './restore.less'
/**
 * 
 * @param {object} 路由传参 state
 *  title:标题
 * placeholder：提示词
 * flag：是否需要填写钱包数量
 * @returns 
 */
export default function Restore() {
  const { state: { title, placeholder, flag } } = useLocation();
  const navigate = useNavigate();
  return (
    <div className='restore-container'>
      {/* 头部 */}
      <header>
        <NavBar
          style={{
            '--height': '36px',
            '--border-bottom': '1px #eee solid',
          }}
          onBack={() => navigate(-1)}
        >
          恢复钱包
        </NavBar>
      </header>
      <div className="main">
        <div>
          <p className='title'>{title}</p>
          <TextArea placeholder={placeholder} rows={5} />
        </div>

        {
          flag ? (<div className='count'>
            <div style={{ marginBottom: '10px' }}>
              <span>钱包数:</span>
              <Input defaultValue='1' />
            </div>
            <span style={{ fontSize: '12px', color: '#ccc' }}>*通过同一助记词导出的钱包个数默认为1,限制最大10个</span>
          </div>) : null
        }
        <Button color='primary' style={{ width: '100%', margin: 'auto 0 5px 0' }}>下一步</Button>
      </div>

    </div>
  )
}
