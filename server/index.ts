import dotenv from "dotenv";
dotenv.config();

import { initTRPC } from "@trpc/server";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { z } from "zod";
import sendMail, { mailMeta } from "./sendMail";
import express, { Request, Response } from "express";
import { DiscordChannel, DiscordChannelInfo } from "./discordResponseType";

const t = initTRPC.create();

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  sendmail: publicProcedure
    .input(
      z.object({
        to: z.string().email().nonempty(),
        subject: z.string().nonempty(),
        text: z.string().nullish(),
        html: z.string().nullish(),
      })
    )
    .mutation(async ({ input }) => {
      const mailmeta: mailMeta = {
        to: input.to,
        subject: input.subject,
        text: input.text ?? "",
        html: input.text ?? "",
      };

      const messageid = await sendMail(mailmeta);

      return {
        messageid,
      };
    }),

  auth: publicProcedure
    .input(
      z.object({
        email: z.string().email().nonempty(),
        password: z.string().nonempty(),
      })
    )
    .mutation(({ input }) => {
      let auth = false;

      if (
        input.email === process.env.ADMIN_USER &&
        input.password === process.env.ADMIN_PASS
      ) {
        auth = true;
      }

      return {
        auth,
      };
    }),

  getAllChannels: publicProcedure.query(async () => {
    const botToken = process.env.BOT_TOKEN;
    const guildId = process.env.GUILD_ID;

    const res = await fetch(
      `https://discord.com/api/v10/guilds/${guildId}/channels`,
      {
        method: "GET",
        headers: {
          Authorization: "Bot " + botToken,
        },
      }
    );

    const data: DiscordChannel[] = await res.json();

    const response: DiscordChannelInfo[] = [];

    for (const channel of data) {
      const text = 0;
      const announcement = 5;
      const announcementThread = 10;
      const publicThreads = 11;
      const privateThreads = 13;

      if (
        !(
          channel.type === text ||
          channel.type === announcement ||
          channel.type === announcementThread ||
          channel.type === publicThreads ||
          channel.type === privateThreads
        )
      ) {
        continue;
      }

      const channelInfo: DiscordChannelInfo = {
        id: channel.id,
        type: channel.type,
        name: channel.name,
      };
      response.push(channelInfo);
    }

    return {
      channels: JSON.stringify(response),
    };
  }),

  sendMessage: publicProcedure
    .input(
      z.object({
        id: z.string().nonempty(),
        content: z.string().nonempty(),
      })
    )
    .mutation(async ({ input }) => {
      const botToken = process.env.BOT_TOKEN;

      const res = await fetch(
        `https://discord.com/api/v10/channels/${input.id}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bot " + botToken,
          },
          body: input.content,
        }
      );

      const data = await res.json();

      return {
        response: JSON.stringify(data),
      };
    }),
});

export type AppRouter = typeof appRouter;

createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext() {
    return {};
  },
}).listen(4001);

const app = express();
app.use(cors());
app.use(express.json()); // for allowing client to send json
app.use(express.urlencoded({ extended: true })); // for using query sting & request params efficiently

app.post("/s/sendmail", async (req: Request, res: Response) => {
  const to = req.body.to;
  const subject = req.body.subject;
  const text = req.body.text;
  const html = req.body.html;

  const mailPayload: mailMeta = {
    to,
    subject,
    text,
    html,
  };

  const messageid = await sendMail(mailPayload);

  res.status(200);
  res.json({
    messageid,
  });
});

app.listen(4002, () => {
  console.log("App listening at port 4002");
});
