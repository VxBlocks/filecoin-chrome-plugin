import React, { useEffect, useState } from 'react'
import Return from '../../../components/Return'
import { AppstoreAddOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { Tabs, TabsProps } from 'antd'
import Whole from './itemsPage/Whole'
import Signatures from './itemsPage/Signatures'
import Provider from './itemsPage/Provider'
import Ordinary from './itemsPage/Ordinary'
import { useLocation, useNavigate } from 'react-router-dom'
import { Notice } from "../../../api/Notice";
import { getBalance, getType, getWalletList } from '../../../servers/api'

const ACCOUNTS = 'Accounts'
const ItemsPage = () => {

    const navigate = useNavigate()
    const { state } = useLocation()
    const onChange = (key: string) => {
        console.log(key);
    };
    const [addressIndex, setAddressIndext] = useState(0); // 当前登录账户再listAccounts的下标
    const [listAccounts, setListAccounts] = useState<Array<{ type: any, address: any, balance: any, private_base64: string, public_base64: string }>>([]);

    useEffect(() => {

        chrome.storage.local.get("account", async (res) => {
            console.log(res, 'res');

            const addressesAndTypes = res.account.map((item: any) => ({
                address: item.address,
                type: item.type,
                privateKey: item.privateKey,
                publicKey: item.publicKey
            }));
            console.log(addressesAndTypes, 'addressesAndTypes');

            const balance = await getWalletList({
                walletAddrList: addressesAndTypes.map((item: any) => item.address)
            });
            const resultList = balance.walletList.map((item: any) => ({
                ...addressesAndTypes.find((i: any) => i.address === item.address),
                balance: item.balance
            }));
            console.log(resultList, 'resultList');

            chrome.storage.local.get("current", async (res) => {
                if (res.current) {
                    const index = findIndexByAddress(resultList, res.current.address);
                    setAddressIndext(index);
                    setListAccounts(resultList);
                }
            });
        });
    }, []);

    console.log(listAccounts, "+ 账户列表", addressIndex, "+ 下标", listAccounts[addressIndex]);


    const findIndexByAddress = (arr: any[], address: string): number => {
        return arr.findIndex((obj) => obj.address === address);
    };
    // 抽时间可封装成公共组件
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `全部`,
            children: <Whole listAccounts={listAccounts} addressIndex={addressIndex} state={state} />
        },
        {
            key: '2',
            label: `普通`,
            children: <Ordinary listAccounts={listAccounts} addressIndex={addressIndex} state={state} />,
        },
        {
            key: '3',
            label: `多签`,
            children: <Signatures listAccounts={listAccounts} addressIndex={addressIndex} state={state} />,
        },
        {
            key: '4',
            label: `存储提供者`,
            children: <Provider listAccounts={listAccounts} addressIndex={addressIndex} state={state} />,
        },
    ];

    return (
        <div>
            <Return MiddleText={ACCOUNTS} Children={<PlusSquareOutlined onClick={() => navigate('/options', { state: true })} style={{ fontSize: "18px" }} />} />
            <div style={{ padding: "1rem" }}>
                <Tabs centered={true} style={{ width: "100%" }} defaultActiveKey="1" items={items} onChange={onChange} />
            </div>
        </div>
    )
}

export default ItemsPage