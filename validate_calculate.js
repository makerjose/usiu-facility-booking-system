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

module.exports = {validateCapacity, calculateEventCharges};