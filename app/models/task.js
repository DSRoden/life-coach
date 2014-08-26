'use strict';

function Task(o){
 this.name = o.name;
 this.difficulty = o.difficulty;
 this.isComplete = false;
 this.description = o.description;
 this.rank = o.rank;
}


module.exports = Task;

