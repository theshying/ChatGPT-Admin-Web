import { showToast } from "../components/ui-lib/ui-lib";

const errorHandler = (e: Error) => {
  console.error(e);
  showToast("网络请求失败, 请稍后重试");
};

export default errorHandler;
