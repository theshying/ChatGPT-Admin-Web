import UniSMS, { SendParams } from "unisms";

const accessKeyId = process.env.SMS_UNI_KEY_ID!;
const signature = process.env.SMS_UNI_SIGNATURE!;
const client = new UniSMS({
  accessKeyId,
  // accessKeySecret: "your access key secret", // 若使用简易验签模式请删除此行
});

export async function sendPhone(number: string, code: string | number) {
  const params: SendParams = {
    to: number,
    signature: "UniSMS",
    templateId: "pub_verif_ttl3",
    templateData: {
      code,
    },
  };
  return client.send(params);
}
