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

function listEvents(auth) {
  const calendar = google.calendar({ version: "v3", auth });
  let eventList = calendar.events
    .list(
      {
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      }
      // (err, res) => {
      //   if (err) return console.log("The API returned an error: " + err);
      //   const events = res.data.items;
      //   eventList = events;
      //   if (events.length) {
      //     console.log("Upcoming 10 events:");
      //     events.map((event, i) => {
      //       const start = event.start.dateTime || event.start.date;
      //       //   console.log(`${start} - ${event.summary}`);
      //     });
      //   } else {
      //     console.log("No upcoming events found.");
      //   }
      // }
    )
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
  listEvents,
};
