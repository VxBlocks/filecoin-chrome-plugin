import React from "react";
import { Navigate, RouteObject } from "react-router-dom";
import ReLogin from '../popup/pages/relogin';
import Options from '../popup/pages/options';
import CreateMnemonic from "../popup/pages/create/CreateMnemonic";
import Create from '../popup/pages/create';
import Wallet from '../popup/pages/wallet';
import WalletDetail from '../popup/components/walletDetail';
import Transfer from '../popup/components/Transfer';
import Restore from '../popup/components/Restore';
import Import from '../popup/pages/import';
import Accounts from '../popup/pages/accounts';
import TransferPage from '../popup/pages/transferPage';
import TransactionDetails from '../popup/pages/transferPage/TransactionDetails';
import ViewKey from '../popup/pages/wallet/viewKey';
import ActivityList from '../popup/components/ActivityList';
import ActivityDetails from '../popup/components/ActivityList/ActivityDetails';
import Preson from '../popup/components/Preson';
import Setting from "../popup/pages/wallet/Setting";
import ItemsPage from "../popup/pages/accounts";
const routes: RouteObject[] = [
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/createMnemonic",
    element: <CreateMnemonic />
  },
  {
    path: "/import",
    element: <Import />,
  },
  {
    path: "/relogin",
    element: <ReLogin />,
  },
  {
    path: "/options",
    element: <Options />,
  },
  {
    path: "/itemsPage",
    element: <ItemsPage />
  },
  {
    path: "/wallet",
    element: <Wallet />,
    children: [
      {
        index: true,
        element: <WalletDetail />
      },
      // 转账
      {
        path: "transfer",
        element: <Transfer />
      },
      {
        path: "transferPage",
        element: <TransferPage />
      },
      // 账户列表
      {
        path: "accounts",
        element: <Accounts />
      },
      {
        path: "viewKey",
        element: <ViewKey />
      },
      {
        path: "transactionDetails",
        element: <TransactionDetails />
      },
      {
        path: "activityList",
        element: <ActivityList />
      },
      {
        path: "activityDetails",
        element: <ActivityDetails />
      },
      {
        path: 'setting',
        element: <Setting />
      }

    ]
  },
  {
    path: "*",
    element: <Navigate to="/options" />
  },


]
export default routes;
