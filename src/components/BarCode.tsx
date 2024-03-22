import { AccountBookOutlined } from '@ant-design/icons'
import React, { CSSProperties } from 'react'

interface Props {
    style: CSSProperties
}

const BarCode = (props: Props) => {
    const { style } = props
    return (
        <div style={{ margin:"10px 0",borderRadius: "0.4rem", height: "5rem", display: "flex", justifyContent: "space-around", alignItems: "center", ...style, }}>
            <AccountBookOutlined style={{ color: "#0284ae", fontSize: "1.8rem" }} />

            <div>
                <p style={{ color: "#333333",fontWeight:"600" }}>FIL</p>
                <p style={{ color: "#0284ad" }}>0xsdsdsdasd....asdasaweq</p>
            </div>

            <span style={{ color: "#096288",fontWeight:"600" }}>
                1FIL
            </span>

        </div>
    )
}

export default BarCode