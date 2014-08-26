'use strict';

var Goal = require('../models/goal'),
    Task = require('../models/task'),
    moment = require('moment');

exports.new = function(req, res){
  res.render('goals/new');
};

exports.create = function(req, res){
  Goal.create(req.body, res.locals.user._id, function(){
    res.redirect('/goals');
  });
};

exports.index = function(req, res){
  Goal.findAllByUserId(res.locals.user._id, function(err, goals){
    res.render('goals/index', {goals:goals, moment:moment});
  });
};

exports.show = function(req, res){
  Goal.findById(req.params.id, function(err, goal){
    if(goal.userId.toString()  === res.locals.user._id.toString()){
      res.render('goals/show', {goal:goal, moment:moment});
    } else {
      res.redirect('/goals');
    }
  });
};

exports.addTask = function(req, res){
  var task = new Task(req.body);
  Goal.findById(req.params.id, function(err, goal){
    goal.addTask(task);
    res.redirect('/goals/:id', {goal:goal});
  });
};
