import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, To } from "react-router-dom";
import { Button, Input } from "antd";
import { useAccount } from "../../../hook/account";
import { verifyMnemonic, verifyPrivate } from "../../../../api/verify";
import { AccountData, Type } from "../../../../model";
import { ToolTip } from "../../../../components/ToolTips";
import "./recovery.less";
import { getType } from "../../../../servers/api";

interface Props {
	placeholder: string;
	type: number;
}
export default function Recovery(props: Props) {
	const { placeholder, type } = props;
	const navigate = useNavigate();
	const { state } = useLocation();
	const [value, setValue] = useState("");
	const account = useAccount();

	// 根据type验证获取账户
	const verify = async () => {
		let newAccount = {} as any;
		if (type === 1) {
			const res = await verifyMnemonic(value);
			console.log("助记词导入:recoverAccount", res);
			newAccount = res;
		} else if (type === 2) {
			const res = await verifyPrivate(value);
			newAccount = res;
			console.log("私钥导入:recoverAccount", res);
		} else if (type === 3) {
			newAccount = { address: value };
		}
		if (newAccount.address.toString()) {
      // state为ture表示 在钱包中添加账户 不需要重新设置密码
			if (state) {
				setStorage(newAccount, "/wallet");
			} else {
        console.log("导入新的账户");
				setStorage(newAccount, "/create");
			}
		} else {
			ToolTip.error("导入钱包失败,请输入正确的值！");
		}
	};
	const setStorage = async (newAccount: any, route: To) => {
		chrome.storage.local.get("account", function (data) {
			// let account = data.account || [];
			let account = state ? data.account : [];
			try {
				account.push(newAccount);
				chrome.storage.local.set({ account: account });
				chrome.storage.local.set({ current: newAccount }, function () {
					navigate(route);
				});
			} catch (e) {
        console.log(e);
      }
		});
	};

	return (
		<div className="recovery-container">
			<div className="card">
				<Input.TextArea
					onChange={e => setValue(e.target.value)}
					className="rcy"
					placeholder={placeholder}></Input.TextArea>
			</div>
			<div>
				<Button className="btn" type="primary" onClick={verify}>
					下一步
				</Button>
			</div>
		</div>
	);
}
