import { Server } from 'socket.io';
import messageRepository from '../config/message.repository.js';

let usersOnline={}

const socketMain = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_message', (data) => {
      socket.join(["room1"]);
      socket.data.username=data.username;
      usersOnline[socket.id]=data.username;
      io.to("room1").emit("online-users", usersOnline);
      socket.broadcast.to('room1').emit('onboard-users', {username:data.username});
    });

    socket.on('message', (data) => {
        data.username=socket.data.username;
        socket.broadcast.to('room1').emit('message', data);
        const messageSentByUser={
          message: data.message,
          username: socket.data.username,
          timeString: data.timeString,
          type:data.type
      }
      if(data.filelink&&data.type=="file"&&data.filename){messageSentByUser[`filelink`]=data.filelink;messageSentByUser[`filename`]=data.filename;}
      // console.log(messageSentByUser,data);
        const messagedb = new messageRepository(messageSentByUser);

        messagedb.save();
    });

    socket.on("prevoius-message",()=>{
      messageRepository.find({})
      .then((messages)=>{
        socket.emit("prevoius-message",messages);
      })
    });
    let typingUsrs={};
    socket.on("typing-started",()=>{
      typingUsrs[socket.id]=socket.data.username;
      socket.broadcast.to('room1').emit('typing', {username:typingUsrs});
    });
    socket.on("typing-ended",()=>{
      delete typingUsrs[socket.id];
      socket.broadcast.to('room1').emit('typing', {username:typingUsrs});
    });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        delete usersOnline[socket.id];
        delete typingUsrs[socket.id];
        socket.broadcast.to('room1').emit('offboard-users', {username:socket.data.username});
        io.to("room1").emit("online-users", usersOnline);
    });
  });

 
};

export default socketMain;

