const socket = io('http://172.21.64.1:5000');
        const messagesbox= document.getElementById('chat-message-container');
        const messageInput = document.getElementById('chat-message-input');
        const messageButton = document.getElementById('chat-message-submit');
        const typingIndicator = document.getElementById('typing-indicator');
        name= prompt('What is your name?');
        let onlineUsers={};
        socket.emit('join_message', {username: name});

        messageButton.addEventListener('click', () => {
            const messageInputedUser = messageInput.value;
            if(messageInputedUser === ''){
                alert('Please enter a message');
                return;
            }
            const time=TimeGetter(new Date());
            socket.emit('message', {
                message: messageInputedUser,
                timeString:time,
                type:"text"
            });
            messageInput.value = '';
            const htmladdUserText=`<div  class="d-inline-block m-2 d-flex  flex-row-reverse">
            <img src="./one.jpg" class=" rounded-circle m-2" alt="group-image"style="max-height: 30px;">
            <div class="message bg-danger">
                <p class="text-success-emphasis text-break" style="font-size: 14px; line-height: 1;">${name}</p>
                <h6 class="text-break" style="font-size: 18px; line-height: 1;">${messageInputedUser}</h6>
                <div class="d-flex flex-row-reverse" style="font-size: 14px; line-height: 1;">${time}</div>
            </div>
        </div>`;
            messagesbox.innerHTML += htmladdUserText;
            messagesbox.scrollTop = messagesbox.scrollHeight;
        });


        socket.on('message', (message) => {
          if(message.type=="text"){
            htmladdContent=`<div  class="d-inline-block m-2 d-flex">
            <img src="./all.png" class=" rounded-circle m-2" alt="group-image"style="max-height: 30px;">
            <div class="message bg-success">
                <p class="text-danger-emphasis text-break" style="font-size: 14px; line-height: 1;">${message.username}</p>
                <h6 class="text-break" style="font-size: 18px; line-height: 1;">${message.message}</h6>
                <div class="d-flex flex-row-reverse" style="font-size: 14px; line-height: 1;">${message.timeString}</div>
            </div>
        </div>`
          }
          else{
            htmladdContent=` <div  class="d-inline-block m-2 d-flex">
            <img src="./all.png" class=" rounded-circle m-2" alt="group-image"style="max-height: 30px;">
            <div class="message bg-success">
                <p class="text-danger-emphasis text-break" style="font-size: 14px; line-height: 1;">${message.username}</p>
                <div class="d-flex align-items-center justify-content-between">
                <h6 class="text-break" style="font-size: 18px; line-height: 1;">${message.filename}</h6>
                <a href="${message.filelink}" download="${message.filename}" target="_blank"><img src="./download-image.webp" class="rounded-circle" alt="group-image"style="max-height: 30px; "></a>
                </div>
                <div class="d-flex flex-row-reverse" style="font-size: 14px; line-height: 1;">${message.timeString}</div>
            </div>
            </div>`
          }
            messagesbox.innerHTML += htmladdContent;
            messagesbox.scrollTop = messagesbox.scrollHeight;
        });

        socket.emit('prevoius-message',{});
        socket.on('prevoius-message', (data) => {
            data.forEach((message) => {
              if(message.type=="text"){
                htmladdContent=`<div  class="d-inline-block m-2 d-flex">
                <img src="./all.png" class=" rounded-circle m-2" alt="group-image"style="max-height: 30px;">
                <div class="message bg-success">
                    <p class="text-danger-emphasis text-break" style="font-size: 14px; line-height: 1;">${message.username}</p>
                    <h6 class="text-break" style="font-size: 18px; line-height: 1;">${message.message}</h6>
                    <div class="d-flex flex-row-reverse" style="font-size: 14px; line-height: 1;">${message.timeString}</div>
                </div>
            </div>`
              }
              else{
                htmladdContent=` <div  class="d-inline-block m-2 d-flex">
                <img src="./all.png" class=" rounded-circle m-2" alt="group-image"style="max-height: 30px;">
                <div class="message bg-success">
                    <p class="text-danger-emphasis text-break" style="font-size: 14px; line-height: 1;">${message.username}</p>
                    <div class="d-flex align-items-center justify-content-between">
                    <h6 class="text-break" style="font-size: 18px; line-height: 1;">${message.filename}</h6>
                    <a href="${message.filelink}" download="${message.filename}" target="_blank"><img src="./download-image.webp" class="rounded-circle" alt="group-image"style="max-height: 30px; "></a>
                    </div>
                    <div class="d-flex flex-row-reverse" style="font-size: 14px; line-height: 1;">${message.timeString}</div>
                </div>
                </div>`
              }
                messagesbox.innerHTML += htmladdContent;
            });
            const userisaddedHtml=`<div  class="d-inline-block m-2 d-flex justify-content-center">
            <div class=" bg-secondary-emphasis message-middle">
                you joined in the chat
            </div>
        </div>`
        messagesbox.innerHTML += userisaddedHtml;

            messagesbox.scrollTop = messagesbox.scrollHeight;
        });
        socket.on('online-users',(data)=>{
             onlineUsers=data;
        })
        //it should implement the typing feature  

        
        socket.on("onboard-users",(data)=>{
            htmladdContent=`<div  class="d-inline-block m-2 d-flex justify-content-center">
            <div class=" bg-secondary-emphasis message-middle">
                ${data.username} joined in the chat
            </div>
        </div>`
            messagesbox.innerHTML += htmladdContent;
            messagesbox.scrollTop = messagesbox.scrollHeight;
        })

        function TimeGetter(TimeGiven) {
            const hours = TimeGiven.getHours();
            const minutes = TimeGiven.getMinutes();
            const period = hours >= 12 ? 'pm' : 'am';
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;
          
            return formattedTime;
          }

// Function to populate the modal with user data
//modal body and selections
const ModalBody=document.getElementById("modal-body");
const ModalHeading=document.getElementById("modalHeading");
const ModalFooter=document.getElementById("modal-footer");

function populateUserModal() {
  console.log('Populating user modal...');
  ModalBody.innerHTML=`<div class="modal-body"><ul id="userList"></ul></div>`;
  ModalHeading.innerHTML="Online users";
  const userList = document.getElementById('userList');
  userList.innerHTML = ''; // Clear the list        
  ModalFooter.innerHTML=`<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>`;
  for (const key in onlineUsers) {
    if (onlineUsers.hasOwnProperty(key)) {
      const user = onlineUsers[key];
      const listItem = document.createElement('li');
      listItem.textContent = user;
      userList.appendChild(listItem);
    }
    
  }
//   openModal();
}

const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
function openModal() {
  modal.show();
}
function closeModal(){
  modal.hide()
}
  
document.getElementById("online-users-button").addEventListener('click', populateUserModal);




let isTyping = false;

const inputField = document.getElementById('chat-message-input');

inputField.addEventListener('keydown', function () {
  // User has started typing
  isTyping = true;
});

inputField.addEventListener('keyup', function () {
  // User has stopped typing
  isTyping = false;
});

let last=false;
setInterval(function () {
    if (isTyping) {
      // You can perform actions here when the user is typing
      last=true;
      socket.emit('typing-started',{});
    } else {
    //   FileSystemWritableFileStream
      if(last){
        socket.emit('typing-ended',{});
      }
      last=false;
    }
  }, 1000);

socket.on('typing',(data)=>{
    console.log(data);
    data=data.username;
     data = Object.values(data);
    if (data.length > 0) {
      const firstValue = data[0];
      console.log(firstValue);
      const typingUsers = data.length > 1 ? `(${firstValue} and ${data.length - 1} others are typing...)` : `(${firstValue} is typing...)`;
      typingIndicator.innerHTML = typingUsers;

    } else {
      console.log('No one is typing');
      typingIndicator.innerHTML = '';
    }
})

socket.on('offboard-users',(data)=>{
    htmladdContent=`<div  class="d-inline-block m-2 d-flex justify-content-center">
    <div class=" bg-secondary-emphasis message-middle">
        ${data.username} left the chat
    </div>`
    messagesbox.innerHTML += htmladdContent;
    messagesbox.scrollTop = messagesbox.scrollHeight;
})


function checkFileSelection() {
  var fileInput = document.getElementById('formFileInput');
  console.log("hello")
  if (fileInput.files.length > 0) {
    console.log(fileInput.files)
    fileSelectionConform(fileInput.files[0]);
  } 
}


function fileSelectionConform(fileInformation){
  ModalHeading.innerHTML="Conformation of file sending";
  ModalBody.innerHTML=`<div class="d-flex align-items-center justify-content-around">
  <img src="./files.jpg" class="img-thumbnail " alt="group-image"style="max-height: 80px;"> 
  <h3>${fileInformation.name}</h3>
 </div>`;
 ModalFooter.innerHTML=`<button type="button" class="btn btn-success" id="submit-file" >send</button><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>`;
 const submitFile=ModalFooter.querySelector("#submit-file");
 submitFile.addEventListener("click",()=>{closeModal();
  const formData = new FormData();
  formData.append('file', fileInformation);
 fetch("http://172.21.64.1:5000/fileupload",{
  method:"POST",
  body:formData
 }).then(response => response.json()).then((data)=>{console.log(data);
  const messageInputedUser = messageInput.value;
const time=TimeGetter(new Date());
socket.emit('message', {
message: messageInputedUser,
 timeString:time,
 type:"file",
 filelink:data.fileLink,
 filename:fileInformation.name
 });
 messageInput.value = '';
 const htmladdUserText=`<div  class="d-inline-block m-2 d-flex  flex-row-reverse">
            <img src="./one.jpg" class=" rounded-circle m-2" alt="group-image"style="max-height: 30px;">
            <div class="message bg-danger">
                <p class="text-success-emphasis text-break" style="font-size: 14px; line-height: 1;">${name}</p>
                <div class="d-flex align-items-center justify-content-between">
                <h6 class="text-break" style="font-size: 18px; line-height: 1;">${fileInformation.name}</h6>
                <a href="${data.fileLink}" download="${fileInformation.name}" target="_blank"><img src="./download-image.webp" class="rounded-circle" alt="group-image"style="max-height: 30px; "></a>
                </div>
                <div class="d-flex flex-row-reverse" style="font-size: 14px; line-height: 1;">${time}</div>
            </div>
        </div>`;
            messagesbox.innerHTML += htmladdUserText;
            messagesbox.scrollTop = messagesbox.scrollHeight;
})

})

  openModal()
}



function filetype(fileName){
  var fileExtension = fileName.split('.').pop().toLowerCase();
    if (fileExtension === 'png'||fileExtension === 'jpg' || fileExtension === 'jpeg') {
        return 'img';
    } else if (fileExtension === 'gif') {
        return 'GIF image';
    }
    else {
        return 'Unknown file type';
    }
}

function fileHTMLGenerator(data){
  let fileType=filetype(data.filename);
  if(fileType=='img'){return `<img src="./57600791.jpg" class="img-thumbnail img-fluid m-2 "style="max-height: 200px;" ></img>`}
  else{return null;}
}

function fileTypeKeppr(element){
  let htmlKeep=fileHTMLGenerator();
  if(htmlKeep){
  let parrent=element.parrentNode;
  }
}