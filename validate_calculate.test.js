const {validateCapacity, calculateEventCharges} = require('./validate_calculate');

test('validateCapacity: auditorium can accommodate a capacity of 1000 is false', () => {
    expect(validateCapacity('auditorium', 5000)).toBe(false);
});
test('validateCapacity: tvroom_1 can accommodate a capacity of 60 is false', () => {
    expect(validateCapacity('tvroom_1', 60)).toBe(false);
});
test('validateCapacity: tvroom_2 with can accommodate a capacity of 100 is false', () => {
    expect(validateCapacity('tvroom_2', 100)).toBe(false);
});
test('validateCapacity: auditorium can accommodate a capacity of 70 is true', () => {
    expect(validateCapacity('auditorium', 70)).toBe(true);
});
test('validateCapacity: tvroom_1 can accommodate a capacity of 20 is true', () => {
    expect(validateCapacity('tvroom_1', 20)).toBe(true);
});
test('validateCapacity: tvroom_2 with can accommodate a capacity of 10 is true', () => {
    expect(validateCapacity('tvroom_2', 10)).toBe(true);
});
test('calculateEventCharges: auditorium with capacity 60 will generate =  250 * 60 = 15000', () => {
    expect(calculateEventCharges('auditorium', 60)).toBe(15000);
});
test('calculateEventCharges: tvroom_1 with capacity 50 will generate = 100 * 50 = 5000', () => {
    expect(calculateEventCharges('tvroom_1', 50)).toBe(5000);
});
test('calculateEventCharges: tvroom_2 with capacity 20 will generate = 50 * 20 = 1000', () => {
    expect(calculateEventCharges('tvroom_2', 20)).toBe(1000);
});
      