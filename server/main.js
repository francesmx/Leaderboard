import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish('thePlayers', function(){
    var currentUserId = this.userId;
    return PlayersList.find({ createdBy: currentUserId });
  });

  Meteor.methods({
    'createPlayer': function(playerNameVar){
        var currentUserId = Meteor.userId();
        PlayersList.insert({
            name: playerNameVar,
            score: 0,
            createdBy: currentUserId
        });
    }
  });
});

PlayersList = new Mongo.Collection('players');
