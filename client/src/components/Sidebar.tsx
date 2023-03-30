import { useState } from "react";
import React from "react";

export function Sidebar({
  setService,
}: {
  setService: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="p-8 flex flex-col items-start">
      <button
        className={`m-2 p-2 font-bold flex justify-center items-center hover:underline ${
          active === 0 ? "" : ""
        }`}
        onClick={() => {
          setService(0);
          setActive(0);
        }}
      >
        <img
          src="https://tiddi.kunalsin9h.dev/_l8inER"
          alt="coptit logo"
          className="h-10 w-10 mr-2"
        />
        COPTIT Admin
      </button>
      <button
        className={`m-4 p-2 rounded  hover:bg-[#697d36] hover:scale-105 duration-300 ${
          active === 1 ? "bg-[#697d36]" : "bg-[#ABC270]"
        }`}
        onClick={() => {
          setService(1);
          setActive(1);
        }}
      >
        Message
      </button>
      <button
        className={`m-4 p-2 rounded hover:bg-[#697d36] hover:scale-105 duration-300 ${
          active === 2 ? "bg-[#697d36]" : "bg-[#ABC270]"
        }`}
        onClick={() => {
          setService(2);
          setActive(2);
        }}
      >
        Discord DM
      </button>
      <button
        className={`m-4 p-2 rounded  hover:bg-[#697d36] hover:scale-105 duration-300 ${
          active === 3 ? "bg-[#697d36]" : "bg-[#ABC270]"
        }`}
        onClick={() => {
          setService(3);
          setActive(3);
        }}
      >
        Email
      </button>
    </div>
  );
}
