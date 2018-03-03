console.log('\n----------PROGRAM START-----------\n');
var events = require('events');

var emitter = new events.EventEmitter();

var connectHandlerFn = (data) =>{
    console.log('\n Connection Successful \n =' + data);

    emitter.emit('data_received');
} 

emitter.on('connection', connectHandlerFn);

var dataHanlderFn = () =>{
    console.log('data received Successfully');
}

emitter.on('data_received', dataHanlderFn);

emitter.emit('connection', "test data");

emitter.removeListener('connection', connectHandlerFn);


var eventListener = events.EventEmitter.listenerCount(emitter, 'connection')
console.log(eventListener + ' Listner(s) listening to connection event')


console.log('\n----------PROGRAM END-----------\n');