/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Task    = require('../../app/models/task');

describe('Task', function(){
  describe('constructor', function(){
    it('should create a new Task object', function(){
      var t = {name: 'shoes', difficulty: '3', isComplete: false, description: 'buy running shoes', rank: '2'},
          task = new Task(t);
      expect(task).to.be.instanceof(Task);
      expect(task.name).to.equal('shoes');
    });
  });
});


