import mongoose from "mongoose";

const mesageSchema = new mongoose.Schema({
    message: {type: String, required: function(){return this.type=="text"}},
    username: {type: String, required: true},
    time: {type: Date, required: true, default: Date.now},
    timeString:{type: String, required: true},
    type:{ type:String,enum:["text","file"],required:true},
    filelink:{type:String,required:function(){return this.type=="file"}},
    filename:{type:String,required:function(){return this.type=="file"}}
});

export default mongoose.model("Message", mesageSchema);