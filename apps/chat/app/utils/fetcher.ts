import { useUserStore } from "@/app/store/user";
import errorHandler from "./error-handler";
import { serverStatus } from "@caw/types";
const errorMap: Record<serverStatus, string> = {
  [serverStatus.success]: "成功",
  [serverStatus.authFailed]: "登录失败",
  [serverStatus.invalidCode]: "验证码错误",
  [serverStatus.wrongPassword]: "密码错误",
  [serverStatus.invalidToken]: "登录已过期",
  [serverStatus.invalidTicket]: "二维码已过期",
  [serverStatus.unScannedTicket]: "二维码未扫描",
  [serverStatus.tooFast]: "操作过于频繁",
  [serverStatus.tooMany]: "操作过于频繁",
  [serverStatus.notEnoughChances]: "使用次数达到上限",
  [serverStatus.contentBlock]: "内容包含敏感词",
  [serverStatus.contentNotSafe]: "内容包含敏感词",
  [serverStatus.notExist]: "不存在",
  [serverStatus.userNotExist]: "用户不存在",
  [serverStatus.alreadyExisted]: "已存在",
  [serverStatus.userAlreadyExisted]: "用户已存在",
  [serverStatus.sendMsmFailed]: "发送短信失败",
  [serverStatus.failed]: "操作失败",
  [serverStatus.unknownError]: "未知错误",
};
export default function fetcher(url: string, init?: RequestInit) {
  const sessionToken = useUserStore.getState().sessionToken ?? "";

  return fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: sessionToken,
    },
  })
    .then(async (res) => {
      if (res.status !== 200) {
        errorHandler(new Error("网络请求失败, 请稍后重试"));
        return;
      }

      const data = await res.json();
      if (data.status !== serverStatus.success) {
        errorHandler(new Error(errorMap[data.status as serverStatus]));
      }

      return data;
    })
    .catch((e) => {
      errorHandler(e);
    });
}
