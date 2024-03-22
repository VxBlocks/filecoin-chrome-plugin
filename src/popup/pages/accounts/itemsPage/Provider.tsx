import { AccountBookOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import BarCode from '../../../../components/BarCode'
import { Badge, Card, Space } from 'antd'
import EllipsisMiddle from '../../../../api/EllipsisMiddle'
import { useNavigate } from 'react-router-dom'
import { Notice } from '../../../../api/Notice'



interface Props {
    listAccounts: any
    addressIndex: number
    state: boolean
}

const Provider = (props: Props) => {
    const { listAccounts, addressIndex,state } = props
    const [selected, setSelected] = useState(addressIndex);
    const navigate = useNavigate()

    const handleCardClick = (index: any) => {

        setSelected(index);
        const newAccount = listAccounts[index]
        if (newAccount) {// 重新存储进去
            chrome.storage.local.set({ current: newAccount });
        }
        if (state) {
            navigate(-1)
          }
          Notice("success", "切换成功", "");
    };
    return (
        <div>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                {listAccounts && listAccounts.map((item: any, index: number) => {
                    if (item.type === 4) {
                        return (
                            <Badge.Ribbon
                                key={index}
                                text="Hippies"
                                color="cyan"
                                style={{ visibility: selected === index ? "visible" : "hidden" }}
                            >
                                <Card
                                    title={'存储提供者钱包'}
                                    size="small"
                                    onClick={() => handleCardClick(index)}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span>{EllipsisMiddle({ suffixCount: 8, children: item.address })}</span>
                                        <span>{item.balance} FIL</span>
                                    </div>
                                </Card>
                            </Badge.Ribbon>
                        )
                    } else {
                        return <div>暂无钱包</div>
                    }
                })}
            </Space>
        </div >
    )
}


export default Provider