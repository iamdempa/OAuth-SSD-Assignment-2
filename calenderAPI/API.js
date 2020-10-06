const { google } = require("googleapis");


// api to create a new calender event 
function insertEvent(auth, event) {
  const calendar = google.calendar({ version: "v3", auth });

  console.log(event.testEvent.summary);

  var testEvent = {
    summary: event.testEvent.summary,
    location: event.testEvent.location,
    description: event.testEvent.description,
    start: {
      dateTime: event.testEvent.start.dateTime,
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: event.testEvent.end.dateTime,
      timeZone: "America/Los_Angeles",
    },
    attendees: [{ email: "jbjayarathna@gmail.com" }],
    reminders: {
      useDefault: true,
    },
  };

  // insert the event 
  calendar.events.insert(
    {
      auth: auth,
      calendarId: "primary",
      resource: testEvent,
    },
    function (err, testEvent) {
      if (err) {
        console.log(
          "There was an error contacting the Calendar service: " + err
        );
        return;
      }
      console.log("Event created: %s", testEvent.summary);
    }
  );
}


// list all the events 
function listEvents(auth) {
  const calendar = google.calendar({ version: "v3", auth });
  let eventList = calendar.events
    .list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    })
    .then((res) => {
      //   console.log(res.data.items);
      return res.data.items;
    })
    .catch((err) => {
      console.log(err);
    });
  return eventList;
}


// export the modules 
module.exports = {
  insertEvent,
  listEvents,
};
