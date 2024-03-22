import React, { useEffect, useState } from "react";
import Return from "../../../../components/Return";
import { Button, Divider } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import EllipsisMiddle from "../../../../api/EllipsisMiddle";
import { useCurrentAccount } from "../../../hook/currentAccount";
import { Transaction, Wallet, RPC, Network } from "@zondax/izari-filecoin";

const TransactionDetails = () => {
	const { state } = useLocation();
	const current = useCurrentAccount();
	const [base64, setBase64] = useState("");
  const [loading,setLoading] = useState(false);
	const navigate = useNavigate();
	// 创建rpc实例
	const rpc = new RPC(Network.Hyperspace, { url: "https://api.hyperspace.node.glif.io/rpc/v1", token: "" });

	useEffect(() => {
		chrome.storage.local.get("current", res => {
			if (res.current) {
				setBase64(res.current.privateKey);
			}
		});
	}, []);
	// 对消息进行签名
	const getMessageSign = async () => {
		// 构建一个transaction交易
		try {
      setLoading(true);
			const partiaAccount = { privateKey: Buffer.from(base64, "base64"), type: 1 };
			const transaction = Transaction.fromJSON(state);
			const tx = await transaction.prepareToSend(rpc);
			// 消息签名
			const signature = await Wallet.signTransaction(partiaAccount, tx);
			const mpoolResponse = (await rpc.broadcastTransaction(transaction, signature)) as any;
			// 等待交易上传
			const res = await rpc.waitMsgState(mpoolResponse.result, 1, -1);
			if (res) {
        setLoading(false);
				navigate("/wallet/activityList");
			}
		} catch (e) {
			console.log("报错了", e);
		}
	};
	return (
		<>
			<Return MiddleText={"交易详情"} />
			<div style={{ padding: "1rem" }}>
				<br></br>
				<p className="arrangement">
					<span>From</span>
					<span>{EllipsisMiddle({ suffixCount: 12, children: state.From })}</span>
				</p>
				<Divider />

				<p className="arrangement">
					<span>To</span>
					<span>{EllipsisMiddle({ suffixCount: 12, children: state.To })}</span>
				</p>
				<Divider />

				<p className="arrangement">
					<span>Account</span>
					<p>
						<span style={{ fontSize: "22px" }}>{state.Value / 10 ** 18}</span>
						<i>FIL</i>
					</p>
				</p>
				<Divider />
				{state.param ? (
					<>
						<p className="arrangement">
							<span>Param</span>
							<span></span>
						</p>
						<Divider />
					</>
				) : (
					""
				)}
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<div style={{ textAlign: "center", fontSize: "12px", color: "#ccc", marginBottom: "10px" }}>
					Gas:{state.GasFeeCap}
				</div>
				<div style={{ display: "flex", justifyContent: "center" }}>
					<Button loading={loading} style={{ width: "200px" }} type="primary" htmlType="submit" onClick={getMessageSign}>
						下一步
					</Button>
				</div>
			</div>
		</>
	);
};

export default TransactionDetails;
function waitMsgState() {
	throw new Error("Function not implemented.");
}
