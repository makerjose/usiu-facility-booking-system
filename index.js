const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const fs = require('fs');
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get('/', function (request, response) {
  response.render('home');
});

app.post('/event-report', urlEncodedParser, function (request, response) {
  const venue = request.body.venue;
  const capacity = parseInt(request.body.capacity); 
  const book_date = request.body.date;
  const book_time = request.body.time;

  if (validateCapacity(venue, capacity)) {
    const cost = calculateEventCharges(venue, capacity);

    const event = {
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

function validateCapacity(venue, capacity) {
  if (venue === 'auditorium' && capacity > 100) {
    return false;
  } else if (venue === 'tvroom_1' && capacity > 50) {
    return false;
  } else if (venue === 'tvroom_2' && capacity > 30) {
    return false;
  }
  return true;
}

function calculateEventCharges(venue, capacity) {
  //venue charges per seat
  const venue_charges = {
    auditorium: 250,
    tvroom_1: 100,
    tvroom_2: 50,
  };

  // Calculate the total charges based on the venue that has been selected
  return capacity * venue_charges[venue];
}

function saveEventDetails(event) {
  fs.readFile('data.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      let eventDetails = [];
      if (data) {
        eventDetails = JSON.parse(data);
      }
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
    if (err) {
      console.log(err);
      response.render('events', { events: [] }); // pass an empty array if there's an error
    } else {
      const events = JSON.parse(data); // parse the data from data.json
      response.render('events', { events: events }); // sending events to events.hbs
    }
  });
});

//handle event deletion
app.post('/delete-event', urlEncodedParser, function (request, response) {
  const eventIdToDelete = request.body.eventId;

  fs.readFile('data.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
      response.redirect('/view-events'); //redirect to the events page after deletion
    } else {
      let events = JSON.parse(data);

      //filter out the event with the specified ID
      events = events.filter((event) => event._id !== eventIdToDelete);

      const json = JSON.stringify(events, null, 2);

      //after filtering the event we rewrite the data back json.data without the filtered event
      fs.writeFile('data.json', json, 'utf8', function (err) {
        if (err) {
          console.log(err);
        }
        response.redirect('/view-events'); // redirect to the events page after successful deletion
      });
    }
  });
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
