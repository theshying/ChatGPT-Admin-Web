import { showToast } from "../components/ui-lib/ui-lib";

const errorHandler = (e: Error) => {
  showToast(e.message || "网络请求失败, 请稍后重试");
};

export default errorHandler;
