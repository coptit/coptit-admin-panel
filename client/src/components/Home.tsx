import React from "react";

export function Home() {
  return (
    <div className="text-black text-xl h-full flex justify-center items-center">
      <div className="rounded p-4 drop-shadow-2xl bg-grayColor text-black">
        <p>Usage:</p>
        <br />
        <p>@Message: Send message to any Discord channel</p>
        <br />
        <p>@Email: Send bulk emails</p>
      </div>
    </div>
  );
}
