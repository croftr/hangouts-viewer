import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChatIcon from '@material-ui/icons/Chat';
import MessaageContent from "./MessageContent"
import './App.css';
// import chats from "./data/smallChat.json"
import chats from "./data/chat.json"

function App() {

  const [selectedConversation, setSelectedConversation] = React.useState();

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

  return (
    <div className="App" style={{ }}>

      <div style={{}}>Conversations {chats.conversations.length}</div>

      <div id="listContentWrapper" style={{ display: "flex", flexDirection: "row", height: "calc(100vh - 30px)" }}>
        <div id="listWrapper" style={{ marginRight: 16, minWidth: 300, overflowY: "auto", height: "100%" }}>
          <List component="nav" aria-label="main mailbox folders">
            {chats.conversations.map(conversation =>
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
