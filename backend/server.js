const app = require('./app');
const dotenv = require('dotenv');
const { connectDatabase } = require("./config/database")


// Handling Uncaught Exception 
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Server is sutting down due to Uncaught Exception");
        process.exit(1);
})


//Config
dotenv.config({ path: "backend/config/config.env" })


//connecting database
connectDatabase();


const server = app.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})

// Unhandled Promise Rejection 
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Server is sutting down due to Unhandled Promise Rejection");
    server.close(()=>{
        process.exit(1);
    })
})