const { google } = require("googleapis");

function listConnectionNames(auth) {
  const service = google.people({ version: "v1", auth });
  let contacts = service.people.connections
    .list({
      resourceName: "people/me",
      pageSize: 100,
      personFields: "photos,names,phoneNumbers",
    })
    .then((res) => {
      return res.data.connections;
    })
    .catch((err) => {
      console.log("Error: ", err);
    });

  return contacts;
}

function insertContact(auth, contact) {
  const service = google.people({ version: "v1", auth });
  service.people.createContact(
    {
      parent: "people/me",
      resource: contact,
    },
    {},
    function (err, res) {
      console.log(err);
    }
  );
}

function insertEvent(auth, event) {
  const calendar = google.calendar({ version: "v3", auth });

  console.log(event.testEvent.summary);

  var testEvent = {
    summary: event.testEvent.summary,
    location: event.testEvent.location,
    description: event.testEvent.description,
    start: {
      dateTime: "2020-10-06T12:58:05-07:00",
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: "2020-10-07T06:00:00-07:00",
      timeZone: "America/Los_Angeles",
    },
    // recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
    attendees: [{ email: "jbjayarathna@gmail.com" }],
    reminders: {
      useDefault: true,
    },
  };

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

module.exports = {
  listConnectionNames,
  insertContact,
  insertEvent,
  listEvents,
};
