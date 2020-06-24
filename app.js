const chatState = {
    question: "name"
}
const send = document.querySelector(".plane-send");
const messageContainer = document.querySelector(".chat-body--messages-container");
const messageInput = document.querySelector(".chat-body--message-input input");
const anchor = document.getElementById("bottom-DOM-anchor")

//Bot questions
const messages = {
    name: {},
    intern : {
        no: `Oops, I thought you were. You can follow @markessien and @xyluz on twitter to know when applications are open for the next internship.\n \nSo will I be seeing you next year? (Y/N)`,
        noNext: "nextInternship",

        yes: `Yaaaay, that's great. What stage are you?`,
        yesNext: "stage"
    },
    nextInternship : {
        yes: "That's great. I'll be waiting patiently for you. \nThanks for engaging.",
        no: `That's not fair for the both of us. I really do hope you change your mind. \nThanks for engaging. Bye.`
    },
    stage : {
        10: `Congrats on being a finalist. Please do tell others about HNG Internship. \nThanks for engaging. Bye.`,
    }
}

//set stages 0-9 bot reply
for(let i=0; i<10; i++){
    messages["stage"][i] = `Wow, nice to see you are making progress. Please hold on until the end. You won't regret it I promise. \nThanks for engaging. Bye.`;
}

send.addEventListener("click", sendMessage);

function sendMessage(e){
    //hide auto-scroll
    setTimeout(()=> document.documentElement.scrollTop = document.documentElement.scrollHeight - document.documentElement.clientHeight, 0.0000000000000000001);

    if(messageInput.value === "") return;

    messageContainer.innerHTML += `
        <div class="chat-body--message chat-body--message-sender">
        ${messageInput.value}
        </div>`;
    replySender();
    
}

function replySender(){
    let message = messages[chatState.question][messageInput.value.toLowerCase()];


    if(chatState.question === "name"){
        chatState.name = messageInput.value;
        message = `<div class="chat-body--message chat-body--message-receiver">
                        Hi <span class="capitalize">${messageInput.value}</span>, are you an HNG Intern? (Y/N)
                    </div>`
        chatState.question = "intern";
    }

    else if(message === undefined){
        message =`<div class="chat-body--message chat-body--message-receiver">
                    Please respond to the previous question like the intern you are, or you wanna be.
                </div>`
    }

    else{
        message =`<div class="chat-body--message chat-body--message-receiver">
                    ${message}
                </div>` 
        chatState.question = messages[chatState.question][messageInput.value.toLowerCase()+"Next"];
        if(chatState.question === undefined) {
            messageInput.setAttribute("disabled", "");
        }
    }
    
    messageContainer.innerHTML += message;
    messageInput.value = "";
}

messageInput.addEventListener("keydown", (e)=> {
    if (e.keyCode === 13) {
        sendMessage(e);
    }
});