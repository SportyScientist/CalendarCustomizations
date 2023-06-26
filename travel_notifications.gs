// Set Up all variables
var today = new Date();
var nextweek = new Date();

nextweek.setDate(nextweek.getDate() + 10);
Logger.log(today + " " + nextweek);

var paddingDuration = 20; // Duration of the padding events in minutes

var calendars = CalendarApp.getAllOwnedCalendars();
Logger.log("Found number of calendars: " + calendars.length);

// This function creates the padding Events 
function addPaddingEvents() {
  
  for (var i = 0; i < calendars.length; i++) {
    var calendar = calendars[i];
    var events = calendar.getEvents(today, nextweek); // Adjust the end date if needed

    for (var j = 0; j < events.length; j++) {
      var event = events[j];
      var eventLocation = event.getLocation();

      if (eventLocation) {
        var eventStart = event.getStartTime();
        var eventEnd = event.getEndTime();

        // Check if there is an adjacent event before the main event
        var adjacentEventsBefore = calendar.getEvents(new Date(eventStart.getTime() - paddingDuration * 60000), eventStart);
        if (adjacentEventsBefore.length === 0) {
          // Create padding event before the main event
          var paddingStart = new Date(eventStart.getTime() - paddingDuration * 60000);
          var paddingEnd = eventStart;
          var paddingEventBefore = calendar.createEvent('Travel', paddingStart, paddingEnd);

          // Set the color of the padding event to gray
          paddingEventBefore.setColor(CalendarApp.EventColor.GRAY);

          // Configure the padding event to not send reminders and block others from booking the slot
          paddingEventBefore.setGuestsCanInviteOthers(false);
          paddingEventBefore.setGuestsCanModify(false);
          paddingEventBefore.setGuestsCanSeeGuests(false);
          paddingEventBefore.removeAllReminders();
        }

        // Check if there is an adjacent event after the main event
        var adjacentEventsAfter = calendar.getEvents(eventEnd, new Date(eventEnd.getTime() + paddingDuration * 60000));
        if (adjacentEventsAfter.length === 0) {
          // Create padding event after the main event
          var paddingStart = eventEnd;
          var paddingEnd = new Date(eventEnd.getTime() + paddingDuration * 60000);
          var paddingEventAfter = calendar.createEvent('Travel', paddingStart, paddingEnd);

          // Set the color of the padding event to gray
          paddingEventAfter.setColor(CalendarApp.EventColor.GRAY);

          // Configure the padding event to not send reminders and block others from booking the slot
          paddingEventAfter.setGuestsCanInviteOthers(false);
          paddingEventAfter.setGuestsCanModify(false);
          paddingEventAfter.setGuestsCanSeeGuests(false);
          paddingEventAfter.removeAllReminders();
        }
      }
    }
  }
}
