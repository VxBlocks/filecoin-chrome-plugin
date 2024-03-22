import React from 'react'
import { Col, Row } from 'antd'

interface Props {
    MiddleText: string // 中间文字
    Children?: React.ReactNode
}

const Return = (props: Props) => {
    const { MiddleText, Children } = props
    return (
        <Row style={{ padding: ".5rem 0", alignItems: "center", display: "flex", justifyContent: "space-between" }} gutter={[18, 18]}>
            <Col  onClick={() => window.history.back()} style={{ paddingRight: "0", paddingLeft: "0", textAlign: "center" }} span={6} className='element'><i className='iconfont icon-fanhui'></i><span>返回</span></Col>
            <Col style={{ textAlign: "center" }} span={6} ><h2>{MiddleText}</h2></Col>
            {Children ? <Col style={{ textAlign: "center" }} span={6}>{Children}</Col> : <Col style={{ textAlign: "center" }} span={6}>{""}</Col>}
        </Row >
    )
}

export default Return