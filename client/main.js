PlayersList = new Mongo.Collection('players');
import { Template } from 'meteor/templating';

Meteor.subscribe('thePlayers');

Template.leaderboard.helpers({
  'player': function(){
    var currentUserId = Meteor.userId();
    return PlayersList.find({ createdBy: currentUserId },
                            { sort: {score: -1, name: 1} });
  },
  'selectedClass': function(){
    var playerId = this._id;
    var selectedPlayer = Session.get('selectedPlayer');
    if(playerId == selectedPlayer){
      return "selected"
    }
  },
  'selectedPlayer': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    return PlayersList.findOne({ _id: selectedPlayer });
  }
});

Template.leaderboard.events({
  'click .player': function(){
    var playerId = this._id;
    Session.set('selectedPlayer', playerId);
  },
  'click .increment': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    PlayersList.update({ _id: selectedPlayer }, { $inc: {score: 5} });
  },
  'click .decrement': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    PlayersList.update({ _id: selectedPlayer }, {$inc: {score: -5} });
  },
  'click .remove': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    PlayersList.remove({ _id: selectedPlayer });
}
});

Template.addPlayerForm.events({
  'submit form': function(event){
    event.preventDefault();
    var playerNameVar = event.target.playerName.value;
    Meteor.call('createPlayer', playerNameVar);
    event.target.playerName.value = "";
  }
});
