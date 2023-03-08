const express = require('express');
const app = express();
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});
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
	var m = ["", "M", "MM", "MMM"]
	var c = ["", "C", "CC", "CCC", "CD", "D",
		"DC", "DCC", "DCCC", "CM "]
	var x = ["", "X", "XX", "XXX", "XL", "L",
		"LX", "LXX", "LXXX", "XC"]
	var i = ["", "I", "II", "III", "IV", "V",
		"VI", "VII", "VIII", "IX"]
	var miliers=m[Math.floor(v / 1000)]
	var centaines = c[Math.floor((v % 1000) / 100)]
	var dizaines = x[Math.floor((v % 100) / 10)]
	var unites = i[v % 10]
	romain=miliers+centaines+dizaines+unites;
	value[0]["romain"]=romain
	res.status(200).json(value);
	console.log("return "+v+" get "+value[0]["romain"])
})
/**
 * SSE =>
 * Event : type evenement
 * Data : le message
 * ID : l'identifiant
 * Retry : le delai de retransmission
 */
app.get('/', (req,res) => {
	var m = ["", "M", "MM", "MMM"]
	var c = ["", "C", "CC", "CCC", "CD", "D",
		"DC", "DCC", "DCCC", "CM "]
	var x = ["", "X", "XX", "XXX", "XL", "L",
		"LX", "LXX", "LXXX", "XC"]
	var i = ["", "I", "II", "III", "IV", "V",
		"VI", "VII", "VIII", "IX"]
	var miliers=m[Math.floor(v / 1000)]
	var centaines = c[Math.floor((v % 1000) / 100)]
	var dizaines = x[Math.floor((v % 100) / 10)]
	var unites = i[v % 10]
	romain=miliers+centaines+dizaines+unites;
	value[0]["romain"]=romain
	const intervalId = setInterval(() => {
		res.write(`data: ${romain}\n\n`)
	}, 10000)
	//res.status(200).json(value);
	res.on('close', () => {
		console.log('Client closed connection')
		clearInterval(intervalId)
		res.end()
	})

	console.log("return "+v+" get "+value[0]["romain"])
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