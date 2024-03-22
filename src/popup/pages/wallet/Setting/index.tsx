import { Button, Col, Row } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EllipsisMiddle from "../../../../api/EllipsisMiddle";
import { useCurrentAccount } from "../../../hook/currentAccount";
import copy from "copy-to-clipboard";
import { Notice } from "../../../../api/Notice";

export default function Setting() {
	const currentAccount = useCurrentAccount();
	const navigate = useNavigate();
	const [time, setTime] = useState(5);
	return (
		<div className="main">
			<div style={{ borderBottom: "1px solid #ccc" }}>
				<Row className="account" align="middle" gutter={[10, 8]}>
					<Col>
						<img style={{ width: 25, height: 25 }} src="images/filcoin.svg" alt="" />
					</Col>
					<Col style={{ fontSize: "18px" }}>{EllipsisMiddle({ suffixCount: 8, children: currentAccount.address })}</Col>
					<Col>
						<i
							onClick={() => {
								copy(currentAccount.address);
								Notice("success", "复制成功", "");
							}}
							className="iconfont icon-copy-template"
							style={{ fontSize: "", cursor: "pointer" }}></i>
					</Col>
				</Row>
				<Row className="account" align="middle" gutter={[32, 0]} style={{ display: "flex", justifyContent: "center" }}>
					<Col>
						<Button type="primary" onClick={() => navigate("/wallet/viewKey")}>
							Export
						</Button>
					</Col>
					<Col>
						<Button type="primary">remove</Button>
					</Col>
				</Row>
			</div>
			<div onClick={() => navigate("/wallet/accounts")} style={{ borderBottom: "1px solid #ccc", padding: "18px 0" }}>
				<Row>
					<Col span={2}>
						<i className="iconfont icon-wode"></i>
					</Col>
					<Col span={20}>
						<h3>Account</h3>
					</Col>
					<Col span={2}>
						<i className="iconfont icon-xiayibu"></i>
					</Col>
				</Row>
			</div>
			<div style={{ borderBottom: "1px solid #ccc", padding: "18px 0" }}>
				<Row>
					<Col span={2}>
						<i className="iconfont icon-wode"></i>
					</Col>
					<Col span={18}>
						<h3>auto-lock</h3>
					</Col>
					<Col span={4}>
						{time}min
						<i className="iconfont icon-xiayibu"></i>
					</Col>
				</Row>
			</div>
		</div>
	);
}
