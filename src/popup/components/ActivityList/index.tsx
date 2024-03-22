import React, { useEffect, useState } from "react";
import { Divider, Skeleton, Avatar, List } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./walletList.less";
import axios from "axios";

const containerStyle = { padding: "0 1rem" };
const arrangementStyle = { alignItems: "center" };
const elementStyle = { display: "flex", width: "15rem", overflow: "hidden", justifyContent: "space-between" };
const textLeftStyle = { color: "#888888", marginBottom: "0.2rem" };
const linkStyle = { width: "1.25rem" };

interface List {
	__typename: string;
	params: string;
	method: number;
	nonce: number;
	cid: string;
	to: Addr;
	from: Addr;
	value: string;
	height: number;
}
interface Addr {
	id: string;
	robust: string;
	_typename: string;
}

export default function WalletList() {
	const navigate = useNavigate();
	const [address, setAddress] = useState("");
	const [list, setList] = useState<List[]>([]);
	const [loading, setLoading] = useState(true);
	const startTime = 1673848800000;
	useEffect(() => {
		chrome.storage.local.get("current", res => {
			if (res.current) {
				getTransition(res.current.address);
				setAddress(res.current.address);
			}
		});
		console.log("交易列表", list);
	}, []);

	// 请求当前地址的交易数据
	const getTransition = async (prop: string) => {
		try {
			const res = await fetch("https://graph-wallaby.glif.link/query", {
				credentials: "omit",
				headers: {
					"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/112.0",
					Accept: "*/*",
					"Accept-Language": "en-US,en;q=0.5",
					"content-type": "application/json",
					"Sec-Fetch-Dest": "empty",
					"Sec-Fetch-Mode": "cors",
					"Sec-Fetch-Site": "cross-site",
					Pragma: "no-cache",
					"Cache-Control": "no-cache",
				},
				referrer: "https://explorer.glif.io/",
				body: `{"operationName":"Messages","variables":{"address":"${prop}","limit":10,"offset":0},"query":"query Messages($address: String!, $limit: Int!, $offset: Int!) {\\n  messages(address: $address, limit: $limit, offset: $offset) {\\n    cid\\n    to {\\n      id\\n      robust\\n      __typename\\n    }\\n    from {\\n      id\\n      robust\\n      __typename\\n    }\\n    nonce\\n    height\\n    method\\n    params\\n    value\\n    __typename\\n  }\\n}"}`,
				method: "POST",
				mode: "cors",
			});
			const { data } = await res.json();
			if (data) {
				console.log("请求的数据", data.messages);
				setList(data.messages);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="walletList">
			<div className="header">
				<p>交易记录</p>
			</div>
			<div style={{overflowY:"scroll"}}>
				<Skeleton active loading={loading}>
					<List
						itemLayout="horizontal"
						dataSource={list}
						renderItem={(item, index) => (
							<List.Item>
								<List.Item.Meta
									avatar={<Avatar src="/images/zhuangzhang.png" />}
									title={
										<div className="element" onClick={() => navigate("/wallet/activityDetails",{state:item.cid})} style={elementStyle}>
											<div>
												<p style={textLeftStyle}>{item.from.robust}</p>
											</div>
											<div style={{ padding: "0 0.4rem" }}>
												<img src="/images/you.svg" alt="" />
											</div>
											<div>
												<p style={textLeftStyle}>{item.to.robust}</p>
											</div>
										</div>
									}
									description={
										<div>
											<p style={{ display: "flex", justifyContent: "space-between" }}>
												<span>{new Date(startTime + item.height * 30 * 1000).toLocaleString()}</span>
												<p style={{ textAlign: "right", fontWeight: "600" }}>{Number(item.value) / 10 ** 18}FIL</p>
											</p>
										</div>
									}
								/>
							</List.Item>
						)}
					/>
				</Skeleton>
			</div>
		</div>
	);
}
