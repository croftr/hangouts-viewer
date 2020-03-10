import React from 'react';

const MessageContent = ({ conversation }) => {

    const renderDetails = (event) => {

        switch (event.event_type) {
            case "REGULAR_CHAT_MESSAGE": {
                return (
                    <React.Fragment>
                        <span>{event.event_type}</span>

                        {event.chat_message && event.chat_message.message_content && event.chat_message.message_content.segment && event.chat_message.message_content.segment.map(message => {
                            if (message.type === "TEXT") {
                                return ` ${message.text}`;
                            } else {
                                return ` ${message.type}`;
                            }
                        })}
                    </React.Fragment>
                )
            }
            case "RENAME_CONVERSATION": {
                return (
                    <React.Fragment>
                        <span>{event.event_type}</span>
                        <span>From: {event.conversation_rename.old_name} To: {event.conversation_rename.new_name} </span>
                    </React.Fragment>
                )
            }
            case "HANGOUT_EVENT": {
                return (           
                    <React.Fragment>
                        <span>{event.event_type}</span>
                        <span> {event.hangout_event.event_type}</span>
                    </React.Fragment>
                )
            }
            case "ADD_USER": {
                return (           
                    <React.Fragment>
                        <span>{event.event_type}</span>
                        <span> {event.hangout_event && event.hangout_event.event_type}</span>
                    </React.Fragment>
                )

            }
            default: return <span>{event.event_type}</span>
        }

    }

    // You can use Hooks here!
    return (
        <div style={{ display: "flex", flex: 3, flexDirection: "column", overflowY: "auto" }}>
            <p>Id: {conversation.conversation.conversation_id.id}</p>
            <ul>
                {conversation.conversation.conversation.participant_data.map(participant =>
                    <li>{participant.fallback_name}</li>
                )}
            </ul>

            <ul>
                {conversation.events.map(event =>
                    <li>

                        {renderDetails(event)}

                    </li>
                )}
            </ul>

        </div>
    )

}

export default MessageContent;