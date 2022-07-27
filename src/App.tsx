import Header from "./components/Header";

import initialEmails from "./data/emails";

import "./App.css";

import { useState } from "react";

type Email = {
  id: number;
  sender: string;
  title: string;
  starred: boolean;
  read: boolean;
};

function App() {
  const [emails, setEmails] = useState(initialEmails);

  function toogleRead(email: Email) {
    // 1- klonojme te dhenat
    const emailsCopy = structuredClone(emails);

    //2- perputhim te dhenat qe na duhen e "emails" me "emailsCopy"
    // @ts-ignore
    const match = emailsCopy.finde((target) => target.id === email.id);

    match.read = !match.read;

    // updetojme te dhenat
    setEmails(emailsCopy);
  }

  function toogleStarred(email: Email) {
    // 1- klonojme te dhenat
    const emailsCopy = structuredClone(emails);

    //2- perputhim te dhenat e "emails" me "emailsCopy"
     // @ts-ignore
    const match = emailsCopy.finde((target) => target.id === email.id);

    match.starred = !match.starred;

    // updetojme te dhenat
    setEmails(emailsCopy);
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              // onChange={() => {}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {emails.map((email) => (
          <div className={email.read ? 'email read' : 'email unread'}>
            <input
              className='read-checkbox'
              type='checkbox'
              checked={email.read}
              // te bejme te mundur klikimin e checkboxit te pare
              onClick={() => {
                toogleRead(email);
              }}
            />
            <input
              className="star-checkbox"
              type="checkbox"
              checked={email.starred}
              // te bejme te mundur klikimin e checkboxit te paare
              onClick={() => {
                toogleStarred(email);
              }}
            />
            <span>{email.sender}</span>
            <span className="title">{email.title}</span>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
