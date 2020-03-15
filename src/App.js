import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography, Input } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import Table from "./Table"
import { convertForTable } from "./tableManager"
import './App.css';

function App() {

  const [chats, setChats] = React.useState({ conversations: [] });
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [tableData, setTableData] = React.useState();
  const [selectedIndex, setSelectedIndex] = React.useState();

  const startDate = (messageData) => {
    return new Date(messageData.self_conversation_state.invite_timestamp / 1000).toLocaleDateString()
  }

  const selectChat = (conversation, index) => {

    setTableData(undefined);
    setShowSpinner(true);
    setSelectedIndex(index);
    setTableData(convertForTable(conversation));

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

  const chatMeta = (conversation) => {
    return (
      <React.Fragment>
        <Typography>Started on {startDate(conversation.conversation.conversation)}</Typography>
        <ul style={{ paddingLeft: 16 }}>
          {conversation.conversation.conversation.participant_data.map(participant =>
            <li>{participant.fallback_name}</li>
          )}
        </ul>
      </React.Fragment>
    )
  }

  return (
    <div className="App">

      <div id="listContentWrapper" style={{ display: "flex", flexDirection: "row", height: "calc(100vh - 34px)" }}>

        <div id="listWrapper" style={{ padding: 16, minWidth: 300, overflowY: "auto", height: "100%" }}>

          <div style={{ display: "flex", marginBottom: 16, paddingTop: 4 }}>
            <Input type="file" onChange={showFile} color="secondary" style={{ paddingBottom: 16 }} />
          </div>

          {chats.conversations.length > 0 && <Typography style={{ marginLeft: 16 }} >{chats.conversations.length} Conversations</Typography >}

          <List component="nav" aria-label="main mailbox folders">

            {chats.conversations.map((conversation, index) =>
              <ListItem
                alignItems="flex-start"
                button
                onClick={() => { setTableData(undefined); selectChat(conversation, index) }}
                selected={selectedIndex === index}
              >
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${conversation.events.length} messages`}
                  secondary={chatMeta(conversation)}
                />
              </ListItem>
            )}
          </List>
        </div>

        <div id="contentWrapper" style={{ display: "flex", flex: 3, flexDirection: "column" }}>

          <Table data={tableData} isLoading={showSpinner && !tableData} eventCount={chats.conversations.length} />
        </div>

      </div>

    </div>
  );
}

export default App;
