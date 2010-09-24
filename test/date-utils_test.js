/*global module,test,same,equal,ok,DateUtils*/
module('date-utils.js');

var d = function(y, m, d, h, min, s) {
  return new Date(y, m - 1, d, h || 0, min || 0, s || 0);
};

var sameDates = function(actual, expected) {
  same(actual.toString(), expected.toString());
};


test('DateUtils.add', function() {
  var examples = [
    [d(2010, 9, 21), 1, 'd', d(2010, 9, 22)],
    [d(2010, 9, 21), 4, 'd', d(2010, 9, 25)],
    [d(2010, 9, 21), -4, 'd', d(2010, 9, 17)],
    [d(2010, 9, 1), -4, 'd', d(2010, 8, 28)],
    [d(2010, 9, 1, 18), -4, 'h', d(2010, 9, 1, 14)],
    [d(2010, 9, 1, 0), -4, 'h', d(2010, 8, 31, 20)],
    [d(2010, 9, 1, 0), -4, 'm', d(2010, 8, 31, 23, 56)],
    [d(2010, 9, 1, 10, 23), -4, 'm', d(2010, 9, 1, 10, 19)],
    [d(2010, 9, 1, 10, 23), 4, 'm', d(2010, 9, 1, 10, 27)]
  ];

  for(var i=0; i<examples.length; ++i) {
    var ex = examples[i];
    sameDates(DateUtils.add(ex[0], ex[1], ex[2]), ex[3]);
  }
});

test('DateUtils.tomorrow', function() {
  sameDates(DateUtils.tomorrow(d(2010,9,21)), d(2010, 9, 22));
  sameDates(DateUtils.tomorrow(d(2010,9,30)), d(2010, 10, 1));
  sameDates(DateUtils.tomorrow(d(2010,8,31)), d(2010, 9, 1));
});

test('DateUtils.yesterday', function() {
  sameDates(DateUtils.yesterday(d(2010,9,22)), d(2010, 9, 21));
  sameDates(DateUtils.yesterday(d(2010,10,1)), d(2010, 9, 30));
  sameDates(DateUtils.yesterday(d(2010,9,1)), d(2010, 8, 31));
});


test('DateUtils.last_monday', function() {
  sameDates(DateUtils.last_monday(d(2010,9,22)), d(2010, 9, 20));
  sameDates(DateUtils.last_monday(d(2010,9,21)), d(2010, 9, 20));
  sameDates(DateUtils.last_monday(d(2010,10,1)), d(2010, 9, 27));
  sameDates(DateUtils.last_monday(d(2010,10,2)), d(2010, 9, 27));
  sameDates(DateUtils.last_monday(d(2010,10,4)), d(2010, 9, 27));
  sameDates(DateUtils.last_monday(d(2010,9,1)), d(2010, 8, 30));
});

test('DateUtils.next_monday', function() {
  sameDates(DateUtils.next_monday(d(2010,9,22)), d(2010, 9, 27));
  sameDates(DateUtils.next_monday(d(2010,9,21)), d(2010, 9, 27));
  sameDates(DateUtils.next_monday(d(2010,10,1)), d(2010, 10, 4));
  sameDates(DateUtils.next_monday(d(2010,10,2)), d(2010, 10, 4));
  sameDates(DateUtils.next_monday(d(2010,10,4)), d(2010, 10, 11));
  sameDates(DateUtils.next_monday(d(2010,9,1)), d(2010, 9, 6));
});

