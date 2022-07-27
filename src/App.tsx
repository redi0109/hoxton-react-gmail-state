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
  const [emails, setEmails] = useState(initialEmails)
  const [hidenRead, setHidenRead] = useState(true)
  const [page, setPage] = useState('starred')

  const unreadEmails = emails.filter(email => !email.read)

  const starredEmails = emails.filter(email => email.starred)

 
  let emailsToDisplay = emails
  if (hidenRead) emailsToDisplay = unreadEmails
  if (page === 'starred') emailsToDisplay = emailsToDisplay.filter (email => email.starred)



  function toogleRead(email: Email) {
    // 1- klonojme te dhenat
    const emailsCopy = structuredClone(emails)

    //2- perputhim te dhenat qe na duhen e "emails" me "emailsCopy"
   
    const match = emailsCopy.finde((target : Email) => target.id === email.id)

    match.read = !match.read

    // updetojme te dhenat
    setEmails(emailsCopy)
  }

  function toogleStarred(email: Email) {
    // 1- klonojme te dhenat
    const emailsCopy = structuredClone(emails);

    //2- perputhim te dhenat e "emails" me "emailsCopy"
  
    const match = emailsCopy.finde((target : Email) => target.id === email.id);

    match.starred = !match.starred

    // updetojme te dhenat
    setEmails(emailsCopy);
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={page === 'inbox' ? 'item active' : 'item'}
            onClick={() => {
              setPage('inbox')
            }}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadEmails.length}</span>
          </li>
          <li
             className={page === 'starred' ? 'item active' : 'item'}
            onClick={() => {
              setPage('starred')
            }}
          >
            <span className="label">Starred</span>
            <span className="count">{starredEmails.length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hidenRead}
              onChange={() => {
                setHidenRead(!hidenRead)
                
                // shkurtim i metodes if else

                // if (hidenRead){
                //   setHidenRead(false)
                // } else{
                //   setHidenRead(true)
                // }
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {emailsToDisplay.map((email) => (
          <div key={email.id} className={email.read ? 'email read' : 'email unread'}>
            <input
              className='read-checkbox'
              type='checkbox'
              checked={email.read}
              // te bejme te mundur klikimin e checkboxit te pare
              onChange={() => {
                toogleRead(email);
              }}
            />
            <input
              className="star-checkbox"
              type="checkbox"
              checked={email.starred}
              // te bejme te mundur klikimin e checkboxit te paare
              onChange={() => {
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
