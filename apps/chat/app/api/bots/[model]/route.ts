import { NextRequest, NextResponse } from "next/server";
import { OpenAIBot, BingBot } from "@caw/bots";
import { parseUserId } from "@caw/dal";
import { rateLimit } from "@caw/ratelimit";
import { BotType, ServerError, serverStatus } from "@caw/types";

import { textSecurity } from "@/app/lib/content";
import { getRuntime } from "@/app/utils/get-runtime";
import { serverErrorCatcher } from "@/app/api/catcher";

const OPENAI_API_KEY = "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";
const BING_COOKIE = process.env.BING_COOKIE!;

export const runtime = getRuntime();

export const POST = serverErrorCatcher(
  async (req: NextRequest, { params }: { params: { model: string } }) => {
    console.log("1111111");
    let userId = Number(req.headers.get("userId")!);
    if (!userId) userId = await parseUserId(req.headers.get("Authorization")!);

    const parseResult = await BotType.postPayload.parseAsync(
      await new NextResponse(
        req.body,
      ).json() /* A workaround to make stream work*/,
    );

    const { messages, model } = parseResult;

    let bot;

    switch (params.model) {
      case "openai":
        const validatedModel = BotType.gptModel.parse(model);
        bot = new OpenAIBot(OPENAI_API_KEY, validatedModel);
        break;
      case "new-bing":
        bot = new BingBot(BING_COOKIE);
        break;
      default:
        return NextResponse.json(
          { msg: "unable to find model" },
          { status: 404 },
        );
    }

    // if (await rateLimit(userId.toString(), model, 10, 10000))
    //   throw new ServerError(
    //     serverStatus.tooMany,
    //     "too many request in fixed time",
    //   );
    //
    // if (!(await textSecurity(messages)))
    //   throw new ServerError(
    //     serverStatus.contentNotSafe,
    //     "contains sensitive keywords.",
    //   );

    return new NextResponse(
      bot.answerStream({ conversation: messages, signal: req.signal }),
    );
  },
);
