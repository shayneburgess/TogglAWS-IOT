var TogglClient = require('toggl-api');
var toggl = new TogglClient({apiToken: '<replace>'});

exports.handleStart = function(event, context, callback) {
	toggl.startTimeEntry({
		description: 'Timer started with dash',
		billable:    false,
		pid: 26629023
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
