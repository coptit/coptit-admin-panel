import React from "react";

export function Home() {
  return (
    <div className="text-white text-xl h-full flex justify-center items-center">
      <div className="rounded p-4 drop-shadow-2xl bg-[#FEC868] text-black">
        <p>Usage:</p>
        <p>@Message: Send message to any Discord channel</p>
        <p>@Discord: Send personal DM in discord (Coming Soon) </p>
        <p>@Email: Send bulk emails (Coming Soon) </p>
      </div>
    </div>
  );
}
