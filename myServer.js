const express = require('express');
const app = express();
const EventEmitter=require('events')
const parser=require('body-parser')

app.use(parser.json())
app.use(
	parser.urlencoded({extended:true})
)
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});
const Stream=new EventEmitter();
var v=0
const value = [
	{
		"nbre": 0,
		"romain":""
	}
];
app.get('/get/:id', (req,res) => {
 	v=req.params.id
	value[0]["nbre"]=v
	romain=convertToRoman(v)
	value[0]["romain"]=romain
	res.status(200).json(value);
})

function convertToRoman(num){
	var romain="";
	var romanNumList={M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
	var a;

	if(num<1 || num >3999)
		return "Entrer un nbre entre 1 et 3999";
	else
	{
		for(var key in romanNumList){
			a = Math.floor(num/romanNumList[key])
			if(a>=0)
			{
				for(var i=0;i<a;i++){
					romain+=key
				}
			}
			num=num % romanNumList[key]
		}
	}
	return romain
}
/**
 * SSE =>
 * Event : type evenement
 * Data : le message
 * ID : l'identifiant
 * Retry : le delai de retransmission
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
		romain=convertToRoman(v)
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