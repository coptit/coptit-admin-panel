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
        className={`m-2 p-2 font-bold flex justify-center items-center text-xl hover:scale-105 duration-300 ${
          active === 0 ? "" : ""
        }`}
        onClick={() => {
          setService(0);
          setActive(0);
        }}
      >
        <img
          src="https://tiddi.kunalsin9h.dev/VMvufrA"
          alt="coptit logo"
          className="h-14 w-14 mr-2"
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
