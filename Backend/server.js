const express = require("express")
const app = express()
const port = 3000
const mongoose = require("mongoose")
const route = require("./routes/route")
app.use(express.json())

const cors = require("cors")
app.use(cors({
  origin: "https://gemini-chat-sandy.vercel.app/"
}));
const dotenv = require("dotenv")
dotenv.config()
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("mongodb connected"))
.catch(()=>console.log("couldn't connect mongodb"))

app.use("/api", route)


app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`)
})

