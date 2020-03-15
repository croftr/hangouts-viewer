const deriveContent = (event) => {

    switch (event.event_type) {
        case "REGULAR_CHAT_MESSAGE": {

            if (event.chat_message && event.chat_message.message_content && event.chat_message.message_content.segment) {
                return event.chat_message.message_content.segment.map(message => {
                    if (message.type === "TEXT") {
                        return ` ${message.text}`;
                    } else {
                        return ` ${message.type}`;
                    }
                })

            }
            break;
        }
        case "RENAME_CONVERSATION": {
            return `From: ${event.conversation_rename ? event.conversation_rename.old_name : ""} To: ${event.conversation_rename ? event.conversation_rename.new_name : ""}`
            
        }
        case "HANGOUT_EVENT": {
            return event.hangout_event.event_type;
        }
        case "ADD_USER": {
            return event.hangout_event ? event.hangout_event.event_type : ""

        }
        default: return event.event_type
    }


}

export const convertForTable = (data) => {
    console.log(data);

    return {
        columns: [
            { title: "Date", field: "date", type: "date" },
            { title: 'Type', field: 'type' },
            { title: 'Content', field: 'content' },
        ],
        rows: data.events.map(event => { return { date: new Date(event.timestamp / 1000), type: event.event_type, content: deriveContent(event) } }),
    }
}