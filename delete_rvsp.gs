function deleteNoRSVPEvents() {
  var today = new Date();
  var nextweek = new Date();
  nextweek.setDate(nextweek.getDate() + 10);
  Logger.log(today + " " + nextweek);

  var calendars = CalendarApp.getAllOwnedCalendars();
  Logger.log("Found number of calendars: " + calendars.length);

  for (var i = 0; i < calendars.length; i++) {
    var calendar = calendars[i];
    var events = calendar.getEvents(today, nextweek); // Adjust the end date if needed

    for (var j = 0; j < events.length; j++) {
      var event = events[j];
      var attendees = event.getGuestList();

      for (var k = 0; k < attendees.length; k++) {
        var attendee = attendees[k];
        var self = attendee.getEmail();

        if (self === Session.getActiveUser().getEmail() && attendee.getGuestStatus() === CalendarApp.GuestStatus.NO) {
          event.deleteEvent();
          Logger.log("Deleted event: " + event.getTitle());
          break; // Exit the loop after deleting the event
        }
      }
    }
  }
}
