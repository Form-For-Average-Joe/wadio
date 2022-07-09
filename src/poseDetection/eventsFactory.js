const EventEmitter = require('eventemitter3');

class StageChangeEmitter extends EventEmitter {}

const stageChangeEmitter = new StageChangeEmitter();

export default stageChangeEmitter;
