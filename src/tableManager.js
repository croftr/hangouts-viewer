import React from 'react';

const getImage = (event) => {
    let url  = undefined;
    if (event && event.chat_message && event.chat_message.message_content.attachment) {
        const attachment = event.chat_message.message_content.attachment[0];        
        if (attachment) {
            url = attachment.embed_item && attachment.embed_item.plus_photo && attachment.embed_item.plus_photo.thumbnail ? attachment.embed_item.plus_photo.thumbnail.url : "";
            // image = <img style="-webkit-user-select: none;margin: auto;" src={url}></img>       
        }
    }
    
    return url;
}

const deriveContent = (event) => {

    switch (event.event_type) {
        case "REGULAR_CHAT_MESSAGE": {

            let content;
            if (event.chat_message && event.chat_message.message_content && event.chat_message.message_content.segment) {
                const message = event.chat_message.message_content.segment[0];

                if (message.type === "TEXT") {
                    content = message.text;
                } else {
                    content = message.type;
                }
            } else {
                if (event.chat_message.message_content.attachment) {
                    const attachment = event.chat_message.message_content.attachment[0];
                    let url;
                    if (attachment) {
                        url = "Image"
                        // url = attachment.embed_item && attachment.embed_item.plus_photo && attachment.embed_item.plus_photo.thumbnail ? attachment.embed_item.plus_photo.thumbnail.url : "";
                    }
                    content = url;
                } else {
                    console.warn(event.chat_message)
                }

            }
            return content;

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

    return {
        columns: [
            { title: "Date", field: "date", type: "datetime" },
            { title: 'Type', field: 'type' },
            { title: 'Content', field: 'content' },
            {                 
                field: 'image', 
                sorting: false, 
                searchable: false,
                disableClick: true,
                render: rowData => rowData.image ? <a href={rowData.image}><img src={rowData.image} style={{ width: 100, height: 100 }}/> </a> : ""
            }
        ],
        rows: data.events.map(event => { return { date: new Date(event.timestamp / 1000), type: event.event_type, content: deriveContent(event), image: getImage(event) } }),
    }
}