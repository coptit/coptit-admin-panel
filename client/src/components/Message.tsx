import type { DiscordChannelInfo } from "../../../server/discordResponseType";
import { useState } from "react";
import { client } from "../App";
import { trpc } from "../utils/trpc";
import React from "react";

export function Message() {
  const channels = trpc.getAllChannels.useQuery();

  const [selectChannel, setSelectChannel] = useState("");
  const [textareaValue, setTextareaValue] = useState("");

  if (channels.data?.channels === undefined) {
    return (
      <div className="h-full flex justify-center items-center">
        <img
          src="https://tiddi.kunalsin9h.dev/_l8inER"
          alt="logo"
          className="invert h-12 w-12"
        />{" "}
      </div>
    );
  }

  const channelsData: DiscordChannelInfo[] = JSON.parse(
    channels.data?.channels
  );
  const voidChoice: DiscordChannelInfo = {
    id: "",
    name: "-- Select Channel --",
    type: -1,
  };
  channelsData.unshift(voidChoice);

  return (
    <div className="flex flex-col">
      <div className="flex justify-content items-center p-4 m-4">
        <label>
          <span className="text-white text-xl">Select Channel</span>
          <select
            value={selectChannel}
            onChange={(e) => {
              setSelectChannel(e.target.value);
            }}
            className="p-2 text-l m-2 border-none rounded bg-white w-52"
          >
            {channelsData.map((channelData: DiscordChannelInfo) => {
              return (
                <option
                  key={channelData.id}
                  value={channelData.id}
                  className="text-xl"
                >
                  {channelData.name}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <div className="flex justify-content items-center p-4 m-4">
        <label>
          <span className="text-white text-xl">Message JSON Payload</span>
        </label>
        <textarea
          value={textareaValue}
          onChange={(e) => {
            setTextareaValue(e.target.value);
          }}
          className="m-2 rounded h-96 w-96"
        />
      </div>
      <div>
        <button
          className="text-xl text-white px-8 py-2 m-8 bg-[#FA7070] hover:bg-[#f83a3a]"
          onClick={async (e) => {
            e.preventDefault;

            const res = await client.sendMessage.mutate({
              id: selectChannel,
              content: textareaValue,
            });

            setTextareaValue(res.response);
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
