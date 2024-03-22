import { Button, Col, Row, Space, Typography } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import fileCoinSigner from "../../../api/fil-signer";
import { NetworkPrefix, SignatureType, Wallet } from "@zondax/izari-filecoin";
import { useAccount } from "../../hook/account";

export default function () {
	const navigate = useNavigate();
	const { state } = useLocation();
	const [phrase, setPhrase] = useState("");
	const account = useAccount();

	useEffect(() => {
		getPhrase();
	}, []);

	const getPhrase = async () => {
		const phrase = Wallet.generateMnemonic();
		setPhrase(phrase);
		chrome.storage.local.set({ phrase: phrase });
	};

	const createAccount = async () => {
		// const keys = (await fileCoinSigner()).keyDerive(phrase, path, "");
		const res = Wallet.deriveAccount(phrase, SignatureType.SECP256K1, "44'/461'/1'/0/0",NetworkPrefix.Testnet);
		const newAccount = {
			address: res.address.toString(),
			privateKey: Buffer.from(res.privateKey).toString("base64"),
			publicKey: Buffer.from(res.publicKey).toString("base64"),
			path: res.path,
			type: res.type,
			phrase,
		};
		// 存储账户 判断是否是当前用户添加账户
		if (state) {
			// 添加账户
			chrome.storage.local.set({ account: [...account, newAccount] });
			chrome.storage.local.set({ current: newAccount });
			navigate("/wallet");
		} else {
			// 创建新账户
			chrome.storage.local.set({ account: [newAccount] });
			chrome.storage.local.set({ current: newAccount });
			navigate("/create");
		}
	};

	return (
		<div className="create-container">
			<div className="header">
				<Row align="top">
					<Col span={2} style={{ height: "28px", lineHeight: "28px" }}>
						<a onClick={() => navigate(-1)}>
							<i className="iconfont icon-fanhui"></i>
						</a>
					</Col>
					<Col span={20}>
						<h1>备份新的助记词</h1>
					</Col>
				</Row>
			</div>
			<div className="main">
				<Typography style={{ padding: "10px 0" }}>
					如果您曾经切换过浏览器或设备，您就需要此助记词来访问您的账户。
				</Typography>
				<div className="card">
					<p className="rcy">{phrase}</p>
				</div>
				<p>请妥善保存此短语并将其存储在安全位置</p>
				<p>切勿分享此助记词给任何人！它关系到您的钱包账户</p>
				<Space
					direction={"horizontal"}
					style={{
						display: "flex",
						alignContent: "center",
						justifyContent: "center",
						marginTop: "16px",
						cursor: "pointer",
					}}
					onClick={getPhrase}>
					<img src={"images/refresh.svg"} style={{ height: "16px" }} />
					<Typography style={{ fontSize: "14px" }}>{"Change Seed Phrase"}</Typography>
				</Space>
				<Button onClick={createAccount} className="btn" type="primary">
					下一步
				</Button>
			</div>
		</div>
	);
}
