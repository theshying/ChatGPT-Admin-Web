import { useUserStore } from "@/app/store/user";
import errorHandler from "./error-handler";

export default function fetcher(url: string, init?: RequestInit) {
  const sessionToken = useUserStore.getState().sessionToken ?? "";

  return fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: sessionToken,
    },
  })
    .then((res) => {
      if (res.status !== 200) {
        errorHandler(new Error("网络请求失败, 请稍后重试"));
        return;
      }
      return res.json();
    })
    .catch((e) => {
      errorHandler(e);
    });
}
