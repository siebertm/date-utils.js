var DateUtils = {
  days: {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6
  },

  add: function(date, offset, component) {
    switch(component) {
      case 'd': offset *= 86400; break;
      case 'h': offset *= 3600; break;
      case 'm': offset *= 60; break;
      case 's': break;
      default: throw 'DateUtils.add: unrecognized component: ' + component;
    }

    return new Date(date.getTime() + (offset * 1000));
  },


  tomorrow: function(date) {
    return DateUtils.add(date, 1, 'd');
  },

  yesterday: function(date) {
    return DateUtils.add(date, -1, 'd');
  },

  last_monday: function(date) {
    var dow = date.getDay(), offset;

    return DateUtils.add(date, DateUtils.offset_to_last(dow, 'monday'), 'd');
  },

  next_monday: function(date) {
    var dow = date.getDay(), offset = 8 - dow;
    return DateUtils.add(date, DateUtils.offset_to_next(dow, 'monday'), 'd');
  },

  offset_to_next: function(dow, target_dow) {
    var target = DateUtils.days[target_dow];

    if(!target) {
      throw 'DateUtils.offset_to_next: target_dow is not correct: ' + target_dow;
    }

    return 7 + target - dow;
  },

  offset_to_last: function(dow, target_dow) {
    var target = DateUtils.days[target_dow];

    if(!target) {
      throw 'DateUtils.offset_to_last: target_dow is not correct: ' + target_dow;
    }


    if(dow <= 1) {
      return -1 * (7 - target + dow);
    } else {
      return -1 * (dow - target);
    }
  }

};

