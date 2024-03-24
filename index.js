import  express from "express";
import cors from "cors";
import http from "http";
import socketMain from "./src/sockect/socket.main.js";
import {connect} from "./src/config/config.database.js";
import { uploadFile } from "./src/middlewares/fileUpload.middleware.js";
const app = express();

app.use(express.static("public"))
app.use(cors());
const server = http.createServer(app);

socketMain(server);
try{
app.post("/fileupload",uploadFile.single("file"),(req,res,next)=>{res.json({fileLink:"http://localhost:5000/files/"+req.file.filename});});
}
catch(err){console.log(err);}

server.listen(5000, () => {
    console.log("Server is running on port 5000");
    connect();
});