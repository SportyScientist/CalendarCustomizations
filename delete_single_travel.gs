function deleteLonelyTravelEvents() {
  var today = new Date();
  var nextweek = new Date();
  nextweek.setDate(nextweek.getDate() + 10);
  Logger.log(today + " " + nextweek);

  var calendars = CalendarApp.getAllOwnedCalendars();
  Logger.log("Found number of calendars: " + calendars.length);

  for (var i = 0; i < calendars.length; i++) {
    var calendar = calendars[i];
    var events = calendar.getEvents(today, nextweek);

    for (var j = 0; j < events.length; j++) {
      var event = events[j];

      if (event.getTitle() === "Travel") {
        var eventStart = event.getStartTime();
        var eventEnd = event.getEndTime();

        var adjacentEventsBefore = calendar.getEvents(new Date(eventStart.getTime() - 20 * 60000), eventStart);
        var adjacentEventsAfter = calendar.getEvents(eventEnd, new Date(eventEnd.getTime() + 20 * 60000));

        if (adjacentEventsBefore.length === 0 && adjacentEventsAfter.length === 0) {
 
          event.deleteEvent();
        }

        var overlappingEvents = calendar.getEvents(eventStart, eventEnd);

        if (overlappingEvents.length > 1) {

          event.deleteEvent();
      }
    }
  }
}}
