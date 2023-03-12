const conv=require('./converIntToRoman.js');
const EventEmitter=require('events');
const express =require('express');
const Stream=new EventEmitter();
let app=express()
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

let v=0
let romain=""
const value = [
	{
		"nbre": 0,
		"romain":""
	}
];
app.get('/get/:id', (req,res) => {

 	v=req.params.id
	value[0]["nbre"]=v
	romain=conv.convertToRoman(v)
	value[0]["romain"]=romain
	res.status(200).json(value);
})
/**
 * SSE
 */

app.get('/', (req,res) => {
	console.log('Client connected')
	res.setHeader('Content-Type', 'text/event-stream')
	res.setHeader('Access-Control-Allow-Origin', '*')
	Stream.on('push',function (data){
			res.write('data: '+data+'\n\n')
		}
	);
	setInterval(function (){
		romain=conv.convertToRoman(value[0]["nbre"])
		value[0]["romain"]=romain
		Stream.emit('push', romain)
	},20000)

})

app.listen(8000, () => {
	console.log("Serveur à l'écoute")
});



























/*const http=require("http");
const host="localhost";
const port=8000;
const requestListener=function(req,res){
	res.writeHeader(200);
	res.end("my fisrt server");
};

const server=http.createServer(requestListener);
server.listen(port,host,()=>{
	console.log('Server is running on http://${host}:${port}');
});*/