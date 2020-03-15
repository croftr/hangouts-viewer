import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChatIcon from '@material-ui/icons/Chat';
import MessaageContent from "./MessageContent"
import './App.css';

function App() {

  const [selectedConversation, setSelectedConversation] = React.useState();
  const [chats, setChats] = React.useState();

  const startDate = (messageData) => {
    return new Date(messageData.self_conversation_state.invite_timestamp / 1000).toLocaleDateString()
  }

  const chatMessages = (data) => {
    return (
      <ul>
        {data.events.map(event => (
          <li>
            {event.event_type}
          </li>
        ))}

      </ul>
    )
  }

  const selectChat = (conversationId) => {
    setSelectedConversation(conversationId.id)
  }

    const showFile = () => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
         var preview = document.getElementById('show-text');
         var file = document.querySelector('input[type=file]').files[0];
         var reader = new FileReader()

         var textFile = /.json/;

         if (file.type.match(textFile)) {
            reader.onload = function (event) {
              // preview.innerHTML = event.target.result;
              const loadedChats = JSON.parse(event.target.result);                            
              setChats(loadedChats);
            }
         } else {
            preview.innerHTML = "<span class='error'>It doesn't seem to be a text file!</span>";
         }
         reader.readAsText(file);

   } else {
      alert("Your browser is too old to support HTML5 File API");
   }
  }

  return (
    <div className="App" style={{}}>

      <div>
        <input type="file" onChange={showFile} />
        <div id="show-text">Choose text File</div>
      </div>

      <div style={{}}>Conversations {chats && chats.conversations ? chats.conversations.length : 0}</div>

      <div id="listContentWrapper" style={{ display: "flex", flexDirection: "row", height: "calc(100vh - 30px)" }}>
        <div id="listWrapper" style={{ marginRight: 16, minWidth: 300, overflowY: "auto", height: "100%" }}>
          
          <List component="nav" aria-label="main mailbox folders">
          
            {chats && chats.conversations.map(conversation =>
              <ListItem button onClick={() => setSelectedConversation(conversation)}>
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${conversation.events.length} messages`}
                  secondary={`Started on ${startDate(conversation.conversation.conversation)}`}
                />
              </ListItem>
            )}
          </List>
        </div>

        {selectedConversation && <MessaageContent conversation={selectedConversation} />}

      </div>

    </div>
  );
}

export default App;
