import React, { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from '../router';
import './popup.less';
export default function Popup() {
  const element = useRoutes(routes);
  const [flag, setFlag] = useState(false);
  // const navigate = useNavigate();
  // 点击插件按钮，如何显示
  const showPopup = () => { }

  useEffect(() => {
    showPopup();
  }, [flag])
  return (
    <div className='app' style={{ overflowY: "hidden" }}>
      {element}
    </div>
  )
}

