const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const fs = require('fs');
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const { v4: uuidv4 } = require('uuid');
const {validateCapacity, calculateEventCharges} = require('./validate_calculate');

app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get('/', function (request, response) {
  response.render('home');
});

app.post('/event-report', urlEncodedParser, function (request, response) {
  const event_name = request.body.event_name;
  const venue = request.body.venue;
  const capacity = parseInt(request.body.capacity); 
  const book_date = request.body.date;
  const book_time = request.body.time;

  if (validateCapacity(venue, capacity)) {
    const cost = calculateEventCharges(venue, capacity);

    const event = {
      event_name: event_name,
      venue: venue,
      capacity: capacity,
      book_date: book_date,
      book_time: book_time,
      cost: cost,
    };

    saveEventDetails(event);

    response.render('report', event); // event object contains the event details

  } else {
    // Capacity validation failed, show error message in home page
    response.render('home', {
      errorMessage: 'Capacity exceeds the maximum limit for the selected venue.',
    });
  }
});

function saveEventDetails(event) {
    fs.readFile('data.json', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
      } else {
        let eventDetails = [];
        if (data) {
          eventDetails = JSON.parse(data);
        }
        event.id = uuidv4(); //generate a unique ID for each event
        eventDetails.push(event);
        const json = JSON.stringify(eventDetails, null, 2);
        fs.writeFile('data.json', json, 'utf8', function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('event details saved.');
          }
        });
      }
    });
  }
app.get('/view-events', function (request, response) {
  fs.readFile('data.json', 'utf8', function (err, data) {
    console.log("data fetched successfully");
    if (err) {
      console.log(err);
      response.render('events', { events: [] }); // pass an empty array if there's an error
    } else {
      const events = JSON.parse(data); // parse the data from data.json
      response.render('events', { events: events }); // sending events to events.hbs
    }
  });
});

// handle event deletion (using DELETE request fron frontend)
app.delete('/delete-event', function (request, response) {
    const eventIdToDelete = request.query.eventId;
  
    fs.readFile('data.json', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        response.status(500).send({ error: 'Internal server error' });
      } else {
        let events = JSON.parse(data);
  
        // filter out the event with the specified ID
        events = events.filter((event) => event.id !== eventIdToDelete);
  
        const json = JSON.stringify(events, null, 2);
  
        // after filtering the event out, we rewrite the data back to data.json without the filtered event
        fs.writeFile('data.json', json, 'utf8', function (err) {
          if (err) {
            console.log(err);
            response.status(500).send({ error: 'Internal server error' });
          } else {
            response.status(200).send({ message: 'Event deleted successfully' });
          }
        });
      }
    });
  });

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = {validateCapacity, calculateEventCharges};