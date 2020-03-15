import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { CircularProgress, Typography, Input  } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MessaageContent from "./MessageContent"
import './App.css';

function App() {

  const [selectedConversation, setSelectedConversation] = React.useState();
  const [chats, setChats] = React.useState({ conversations: [] });
  const [showSpinner, setShowSpinner] = React.useState(false);

  const startDate = (messageData) => {
    return new Date(messageData.self_conversation_state.invite_timestamp / 1000).toLocaleDateString()
  }

  const selectChat = (conversation) => {
    setShowSpinner(true);    
    //need delay for spinner to render
    setTimeout(() => setSelectedConversation(conversation), 500);
  }

  const showFile = () => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      var preview = document.getElementById('show-text');
      var file = document.querySelector('input[type=file]').files[0];
      var reader = new FileReader()

      var textFile = /.json/;

      if (file && file.type.match(textFile)) {
        reader.onload = function (event) {
          const loadedChats = JSON.parse(event.target.result);
          setChats(loadedChats);
        }
      } else {
        preview.innerHTML = "<span class='error'>It doesn't seem to be a json file!</span>";
      }
      reader.readAsText(file);

    } else {
      alert("Your browser is too old to support HTML5 File API");
    }
  }

  return (
    <div className="App" style={{ padding: 16 }}>

      <div style={{ display: "flex", marginBottom: 16, paddingTop: 16 }}>
        <Input type="file" onChange={showFile} color="primary" />        
      </div>

      <Typography >Conversations {chats.conversations.length}</Typography >

      <div id="listContentWrapper" style={{ display: "flex", flexDirection: "row", height: "calc(100vh - 30px)" }}>
        <div id="listWrapper" style={{ marginRight: 16, minWidth: 300, overflowY: "auto", height: "100%" }}>

          <List component="nav" aria-label="main mailbox folders">

            {chats.conversations.map(conversation =>
              <ListItem button onClick={() => selectChat(conversation)}>
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

        <div id="contentWrapper" style={{ display: "flex", flex: 3, flexDirection: "column", overflowY: "auto" }}>
          
          { showSpinner && !selectedConversation && (
            <div style={{ display: "flex", flexDirection: "column", padding: 16, alignSelf: "center" }}>
              <Typography>Loading your conversation</Typography>
              <span style={{ alignSelf: "center", marginTop: 16 }}><CircularProgress /></span>
            </div>
          )}
        </div>

        {selectedConversation && <MessaageContent conversation={selectedConversation} />}

      </div>

    </div>
  );
}

export default App;
