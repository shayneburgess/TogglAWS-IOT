var TogglClient = require('toggl-api');
var AWS = require('aws-sdk');
var apiKey = process.env.API_KEY;  
var toggl = new TogglClient({apiToken: apiKey});


exports.handleStart = function(event, context, callback) {
	var projectID = process.env.PROJECT_ID;   
	toggl.startTimeEntry({
		description: 'Timer started with dash',
		billable:    false,
		pid: parseInt(projectID)
	}, function(err, timeEntry) {
		if (err) {
			console.log("Error: " + err);
		} else {
			console.log("Timer started. ID: " + timeEntry.id);
		}
	});

}

exports.handleStop = function(event, context, callback) {
	toggl.getCurrentTimeEntry(function(err, currentEntry) {
		if (currentEntry) {
			toggl.stopTimeEntry(currentEntry.id, function(err, stoppedEntry) {
										console.log(stoppedEntry.description + " was stopped");
			});	
		} else {
			console.log("Stop button clicked with no timer running. Doing nothing.");
		}
	});
}
