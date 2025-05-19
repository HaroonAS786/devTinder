module.exports=function(){
    process.on('uncaughtException',(ex)=>{
        console.log("WE GOT AN UNCAUGHT EXCEPTION")
        process.exit(1)
        // winston.error(ex.message,ex)
    })
    process.on('unhandledRejection',(ex)=>{
        console.log("WE GOT AN UNCAUGHT EXCEPTION")
        process.exit(1)
        // winston.error(ex.message,ex)
    })
}