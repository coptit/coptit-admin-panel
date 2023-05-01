import type { DiscordChannelInfo } from "../../../server/discordResponseType";
import { useState } from "react";
import { client } from "../App";
import { trpc } from "../utils/trpc";
import React from "react";

export function Message() {
  const channels = trpc.getAllChannels.useQuery();

  const [selectChannel, setSelectChannel] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [messageID, setMessageID] = useState("");

  // Modes can be 0 -> New Message
  // Modes can be  1 -> Edit Message
  const [messageMode, setMessageMode] = useState(0);

  if (channels.data?.channels === undefined) {
    return (
      <div className="h-full flex justify-center items-center">
        <img
          src="https://tiddi.kunalsin9h.dev/_l8inER"
          alt="logo"
          className="h-12 w-12"
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
      <div className="p-8">
        <button
          onClick={(e) => {
            e.preventDefault;
            setMessageMode(0);
          }}
          className={`px-4 py-2 mr-8 drop-shadow-2xl rounded text-black font-bold  ${
            messageMode === 0
              ? "scale-110 duration-300 bg-[#eda812]"
              : "bg-[#F4C868]"
          } `}
        >
          New
        </button>
        <button
          onClick={(e) => {
            e.preventDefault;
            setMessageMode(1);
          }}
          className={`px-4 py-2 drop-shadow-2xl rounded text-black font-bold  ${
            messageMode === 1
              ? "scale-110 duration-300 bg-[#eda812]"
              : "bg-[#F4C868]"
          } `}
        >
          Edit
        </button>
      </div>
      <div className="flex justify-content items-center p-4 m-4">
        <label>
          <span className="text-black text-xl">Select Channel: </span>
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
        {messageMode === 1 ? (
          <div className="ml-8">
            <label>
              <span className="text-black text-xl">Message ID: </span>
              <input
                placeholder="Message ID"
                className="p-2 text-l m-2 border-none rounded bg-white w-52"
                onChange={(e) => {
                  setMessageID(e.target.value);
                }}
              />
            </label>
          </div>
        ) : null}
      </div>
      <div className="flex justify-content items-center p-4 m-4">
        <label>
          <span className="text-black text-xl">Message JSON Payload: </span>
        </label>
        <textarea
          placeholder="Message content created using discohook.org"
          value={textareaValue}
          onChange={(e) => {
            setTextareaValue(e.target.value);
          }}
          className="m-2 rounded h-96 w-96 p-4"
        />
      </div>
      <div>
        <button
          className="font-bold text-black px-8 py-2 m-8 bg-[#F4C868] hover:bg-[#eda812] rounded hover:scale-110 duration-300 active:bg-black active:text-white"
          onClick={async (e) => {
            e.preventDefault;

            // send message
            if (messageMode === 0) {
              const res = await client.sendMessage.mutate({
                id: selectChannel,
                content: textareaValue,
              });

              setTextareaValue(res.type + "\n\n\n" + res.response);
            } else {
              const res = await client.updateMessage.mutate({
                messageID: messageID,
                channelID: selectChannel,
                content: textareaValue,
              });

              setTextareaValue(res.type + "\n\n\n" + res.response);
            }
          }}
        >
          {messageMode === 0 ? "Send" : "Update (Replace)"}
        </button>
      </div>
    </div>
  );
}
