import React, { useState } from "react";
import * as EmailValidator from "email-validator";
import { client } from "../App";

export function Email() {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [html, setHtml] = useState("");
  const [emails, setEmails] = useState([""]);

  const [totalEmails, setTotalEmails] = useState(0);
  const [validEmails, setValidEmails] = useState(0);

  return (
    <div className="">
      <div className="flex justify-center h-[80%]">
        <div className="p-4 m-8 grow rounded-xl border-solid border-2 flex flex-col bg-[#1e1915] ">
          <label className="text-white font-bold p-2 m-2">
            Subject:
            <input
              placeholder="Email subject"
              className="rounded p-2 m-2 w-[60%] ml-4 text-black"
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            />
          </label>
          <label className="text-white font-bold p-2 m-2">
            Text Body:
            <br />
            <textarea
              placeholder="Text email body"
              className="rounded p-2 m-2 w-[60%] ml-4 text-black"
              rows={8}
              cols={60}
              onChange={(e) => {
                setText(e.target.value);
              }}
            ></textarea>
          </label>
          <label className="text-white font-bold p-2 m-2">
            HTML Body:
            <br />
            <textarea
              placeholder="HTML email body"
              rows={10}
              cols={60}
              className="rounded p-2 m-2 text-black"
              onChange={(e) => {
                setHtml(e.target.value);
              }}
            ></textarea>
          </label>
        </div>
        <div className="p-4 m-8 grow rounded border-solid border-2 bg-[#1e1915] rounded-xl">
          <span className="text-white font-bold p-2 m-2">
            Emails: (one per line)
          </span>
          <br />
          <textarea
            className="rounded p-2 m-2"
            rows={25}
            cols={50}
            onChange={(e) => {
              const emails = e.target.value.split("\n");
              setTotalEmails(emails.length);

              const validEmails: string[] = [];

              for (let email of emails) {
                email = email.trim();
                if (EmailValidator.validate(email)) {
                  validEmails.push(email);
                }
              }
              setValidEmails(validEmails.length);
              setEmails(validEmails);
            }}
          ></textarea>
          <br />
          <span className="text-white p-2 m-2">
            Total Emails (all entries):{" "}
            <span className="font-bold rounded bg-white text-black p-1">
              {totalEmails}
            </span>
          </span>
          <br />
          <span className="text-white p-2 m-2">
            Valid Emails:{" "}
            <span className="font-bold rounded bg-white text-black p-1">
              {validEmails}
            </span>
          </span>
        </div>
      </div>
      <button
        className="w-26 font-bold text-black px-8 py-2 m-8 bg-[#F4C868] hover:bg-[#eda812] rounded hover:scale-110 duration-300 active:bg-black active:text-white "
        onClick={async (e) => {
          e.preventDefault;

          console.log(html);

          await client.sendMail.mutate({
            emails,
            subject,
            text,
            html,
          });
        }}
      >
        Send
      </button>
    </div>
  );
}
