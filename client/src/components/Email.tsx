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
        <div className="p-4 m-8 grow rounded-xl border-solid border-2 flex flex-col bg-grayColor ">
          <label className="text-back font-bold p-2 m-2">
            Subject:
            <input
              placeholder="Email subject"
              className="rounded p-2 m-2 w-[60%] ml-4 text-black"
              onChange={(e) => {
                setSubject(e.target.value.trim());
              }}
            />
          </label>
          <label className="text-black font-bold p-2 m-2">
            Text Body:
            <br />
            <textarea
              placeholder="Text email body"
              className="rounded p-2 m-2 w-[60%] ml-4 text-black"
              rows={8}
              cols={60}
              onChange={(e) => {
                setText(e.target.value.trim());
              }}
            ></textarea>
          </label>
          <label className="text-black font-bold p-2 m-2">
            HTML Body:
            <br />
            <textarea
              placeholder="HTML email body"
              rows={10}
              cols={60}
              className="rounded p-2 m-2 text-black"
              onChange={(e) => {
                setHtml(e.target.value.trim());
              }}
            ></textarea>
          </label>
        </div>
        <div className="p-4 m-8 grow rounded border-solid border-2 bg-grayColor rounded-xl">
          <span className="text-black font-bold p-2 m-2">
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
          <span className="text-black p-2 m-2">
            Total Emails (all entries):{" "}
            <span className="font-bold rounded bg-white text-black p-1">
              {totalEmails}
            </span>
          </span>
          <br />
          <span className="text-black p-2 m-2">
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
          e.preventDefault();

          const send = confirm("Are you sure, you want to send emails!");

          if (!send) return;

          const errorBox = document.getElementById("send-mail-error");
          const errorBoxMessage = document.getElementById(
            "send-mail-error-message"
          );

          if (emails.length === 0 || emails[0] === "") {
            if (errorBoxMessage?.innerHTML != undefined) {
              errorBoxMessage.innerHTML =
                "<p><strong>Error</strong><br /><p>Emails list does not have any verified emails</p>";
            }
            // @ts-ignore
            errorBox?.showModal();
            return;
          }

          if (subject === "" || (text === "" && html === "")) {
            if (errorBoxMessage?.innerHTML != undefined) {
              errorBoxMessage.innerHTML =
                "<p><strong>Error</strong><br /><p>Subject, Text or Html is empty</p>";
            }
            // @ts-ignore
            errorBox?.showModal(); // expected error
            return;
          }

          client.sendMail.mutate({
            emails,
            subject,
            text,
            html,
          });

          await sendMailTracker();
        }}
      >
        Send
      </button>

      <dialog id="send-mail-error" className="py-5 px-10 rounded">
        <div id="send-mail-error-message"></div>
        <form method="dialog">
          <button className="p-2 my-4 rounded bg-gray-200">Understood</button>
        </form>
      </dialog>

      <dialog id="send-mail-tracker-modal" className="p-10 w-96">
        <div className="rounded">
          <strong>Sending Mail</strong>
          <p id="send-mail-data">-- unavailable --</p>
          <button
            id="send-mail-cancel"
            className="p-2 my-4 rounded bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </dialog>
    </div>
  );
}

async function sendMailTracker() {
  const sendMailModal = document.getElementById("send-mail-tracker-modal");
  const sendMailCancel = document.getElementById("send-mail-cancel");
  const sendMailData = document.getElementById("send-mail-data");
  // @ts-ignore
  sendMailModal?.showModal(); // expected error

  const websocketURL = "wss://cap-ws.hop.sh";
  // const websocketURL = "ws://localhost:4003";

  const ws = new WebSocket(websocketURL);

  sendMailCancel?.addEventListener("click", () => {
    ws.send("ABORT");
    ws.close();
    // @ts-ignore
    sendMailModal?.close();
  });

  ws.addEventListener("error", () => {
    if (sendMailModal?.innerHTML != undefined) {
      sendMailModal.innerHTML = `<strong>WebSocket Error:</strong><br /><p>Could not able to connect to ${websocketURL}</p>`;
    }
  });

  ws.addEventListener("message", (event) => {
    if (sendMailData != undefined) {
      sendMailData.textContent = event.data;
    }
  });

  window.onbeforeunload = () => {
    return "Some process is running, closing might cancel the process";
  };
}
