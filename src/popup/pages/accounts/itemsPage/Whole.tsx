import { AccountBookOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import BarCode from "../../../../components/BarCode";
import { Badge, Card, Space } from "antd";
import EllipsisMiddle from "../../../../api/EllipsisMiddle";
import { useNavigate } from "react-router-dom";
import { Notice } from "../../../../api/Notice";
import { log } from "console";

interface Props {
	listAccounts: any;
	addressIndex: number;
	state: boolean;
}

const Whole = (props: Props) => {
	const { listAccounts, addressIndex, state } = props;

	const [selected, setSelected] = useState(0);

  useEffect(()=>{
    setSelected(addressIndex);
  },[addressIndex])

	const navigate = useNavigate();

	const handleCardClick = (index: any) => {
    console.log('点击后设置当前选中下标',index);
		setSelected(index);
		const newAccount = listAccounts[index];
		console.log(newAccount);
		if (newAccount) {
			// 重新存储进去
			console.log("====================================");
			console.log(newAccount, "newAccount");
			console.log("====================================");
			chrome.storage.local.set({ current: newAccount });
		}
		if (state) {
			navigate(-1);
		}
		Notice("success", "切换成功", "");
	};

	console.log(selected, "wohole");

	const accountType = (num: number) => {
		if (num === 1) {
			return "普通钱包";
		} else if (num === 2) {
			return "存储提供者钱包";
		} else if (num === 3) {
			return "多签钱包";
		}
	};

	return (
		<div>
			<Space direction="vertical" size="middle" style={{ width: "100%" }}>
				{listAccounts &&
					listAccounts.map((item: any, index: number) => {
            console.log(selected,index);
						return (
							<Badge.Ribbon
								key={index}
								text="Hippies"
								color="cyan"
								style={{ visibility: selected === index ? "visible" : "hidden" }}>
								<Card title={accountType(item.type)} size="small" onClick={() => handleCardClick(index)}>
									<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
										<span>{EllipsisMiddle({ suffixCount: 8, children: item.address })}</span>
										<span>{item.balance} FIL</span>
									</div>
								</Card>
							</Badge.Ribbon>
						);
					})}
			</Space>
		</div>
	);
};

export default Whole;
