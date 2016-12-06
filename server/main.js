import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish('thePlayers', function(){
    var currentUserId = this.userId;
    return PlayersList.find({ createdBy: currentUserId });
  });

  Meteor.methods({
    'createPlayer': function(playerNameVar){
      check(playerNameVar, String);
      var currentUserId = Meteor.userId();
      if(currentUserId){
        PlayersList.insert({
          name: playerNameVar,
          score: 0,
          createdBy: currentUserId
        });
      }
    },
    'removePlayer': function(selectedPlayer){
      check(selectedPlayer, String);
      var currentUserId = Meteor.userId();
      if(currentUserId){
        PlayersList.remove({ _id: selectedPlayer, createdBy: currentUserId });
      }
    },
    'updateScore': function(selectedPlayer, scoreValue){
      check(selectedPlayer, String);
      check(scoreValue, Number);
      var currentUserId = Meteor.userId();
      if(currentUserId){
        PlayersList.update( { _id: selectedPlayer, createdBy: currentUserId },
          { $inc: {score: scoreValue} });
        }
      }
    });
  });

PlayersList = new Mongo.Collection('players');
