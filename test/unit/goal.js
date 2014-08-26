/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Goal    = require('../../app/models/goal'),
    Task   = require('../../app/models/task'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'life-coach-test';

describe('Goal', function(){
  this.timeout(10000);
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
      cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
        done();
      });
    });

  describe('.create', function(){
    it('should create a new goal', function(done){
      var body = {name:'travel', due:'2014-08-27', tags: 'adventure, travel'},
      userId = Mongo.ObjectID('000000000000000000000001');
      Goal.create(body, userId, function(err, goal){
        expect(goal).to.be.instanceof(Goal);
        expect(goal._id).to.be.instanceof(Mongo.ObjectID);
        expect(goal.userId).to.be.instanceof(Mongo.ObjectID);
        expect(goal.name).to.equal('travel');
        expect(goal.due).to.be.instanceof(Date);
        expect(goal.tags).to.have.length(2);
        done();
      });
    });
  });

  describe('.findAllByUserId', function(){
    it('should find all goals for each user', function(done){
      var userId = Mongo.ObjectID('000000000000000000000001');
      Goal.findAllByUserId(userId, function(err, goals){
        expect(goals).to.have.length(2);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find all goals for each user', function(done){
      var _id = Mongo.ObjectID('a00000000000000000000001');
      Goal.findById(_id, function(err, goal){
        expect(goal.name).to.equal('marathon');
        done();
      });
    });
  });

  describe('.addTask', function(){
    it('should add a task to goal', function(done){
      var t = {name: 'shoes', difficulty: '3', isComplete: false, description: 'buy running shoes', rank: '2'},
         task = new Task(t),
         _id = Mongo.ObjectID('a00000000000000000000001');
      Goal.addTask(task, _id, function(){
        Goal.findById('a00000000000000000000001', function(err, goal){
          console.log(goal);
          expect(goal.tasks).to.have.length(4);
          done();
        });
      });
    });
  });
});

