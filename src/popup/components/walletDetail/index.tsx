import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import EllipsisMiddle from "../../../api/EllipsisMiddle";
import copy from "copy-to-clipboard";
import { Notice } from "../../../api/Notice";
import { useCurrentAccount } from "../../hook/currentAccount";
import { getBalance } from "../../../servers/api";
import "./walletDetail.less";
import { Address, Network, RPC, Token } from "@zondax/izari-filecoin";


export default function WalletDetail() {
	const navigate = useNavigate();
	const [address, setAddress] = useState("");
	const [fil, setfil] = useState("");
  const rpc = new RPC(Network.Hyperspace,{url:'https://api.hyperspace.node.glif.io/rpc/v1',token:""})

	useEffect(() => {
		chrome.storage.local.get("current", res => {
			if (res.current) {
				console.log(res.current);
				setAddress(res.current.address);
				getWalletBalance(res.current.address);
			} else {
				Notice("warning", "没有账户", "");
			}
		});
		// if(currentAccount){
		//   setAddress(currentAccount.address);
		// }
	}, []);

	// 查询钱包余额
	const getWalletBalance = async (prop: string) => {
		// const res = await getBalance({ walletAddr: prop });
    const res = await rpc.walletBalance(Address.fromString(prop)) as any;
		setfil(Token.fromAtto(res.result).toWhole());
	};

	return (
		<div className="walletDetail">
			<div className="main">
				<Row style={{ display: "flex", justifyContent: "center", margin: "10px 0" }}>
					<Col
						style={{
              textAlign:"center",
							fontSize: "14px",
							fontWeight: 700,
							color: "#566873",
							marginRight: "5px",
						}}>
						{EllipsisMiddle({ suffixCount: 14, children: address })}
						{/* {address} */}
					</Col>
					<Col>
						<i
							onClick={() => {
								copy(address);
								Notice("success", "复制成功", "");
							}}
							style={{ verticalAlign: "middle", cursor: "pointer" }}
							className="iconfont icon-copy-template"></i>
					</Col>
				</Row>
				<Row gutter={[4, 8]} align="middle" style={{ display: "flex", justifyContent: "center", margin: "10px 0" }}>
					<Col>
						<span style={{ fontSize: "18px", color: "#333", fontWeight: "700" }}>{fil}</span>
					</Col>
				</Row>
				<Card
					bordered={false}
					style={{ boxShadow: "none" }}
					headStyle={{ textAlign: "center", boxShadow: "none" }}
					bodyStyle={{ background: "rgb(44 133 175/.65)", borderRadius: "10px" }}>
					<img src="./images/filecoin.png" alt="" />
				</Card>
				<div style={{ marginTop: "10px", color: "#0284AD", position: "relative" }}>
					<i className="iconfont icon-zhuanzhang"></i>
					<Button
						onClick={() => navigate("/wallet/transferPage")}
						style={{ background: "rgb(2 132 173/.1)", color: "#0284AD", fontWeight: 600, width: "100%" }}
						type="primary">
						转账
					</Button>
				</div>
			</div>
		</div>
	);
}
