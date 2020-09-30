const date = require('date-and-time');

module.exports = {
    convert: (userInput) => {
        //expected userinput: h1/d2/w/3/m4/y5

        const hour = 1* 60 * 60 * 1000;

        let value;
        let date;
        switch(userInput.charAt(0)) {
            case 'h':
              // hours
              value = userInput.split('h')[1];

              if (isNaN(value)) return 'Incorrect user input given';

              date = Date.now();
              date += hour * value;
              return date;
            case 'd':
              // days
              value = userInput.split('d')[1];

              if (isNaN(value)) return 'Incorrect user input given';

              date = Date.now();
              date += hour * 24 * value;
              return date;
            case 'w':
              // weeks
              value = userInput.split('w')[1];

              if (isNaN(value)) return 'Incorrect user input given';

              date = Date.now();
              date += hour * 24 * 7 * value;
              return date;
            case 'm':
              // months
              value = userInput.split('m')[1];

              if (isNaN(value)) return 'Incorrect user input given';

              date = Date.now();
              date += hour * 24 * 7 * 4 * value;
              return date;
            case 'y':
              // years
              value = userInput.split('y')[1];

              if (isNaN(value)) return 'Incorrect user input given';

              date = Date.now();
              date += hour * 24 * 7 * 4 * 12 * value;
              return date;
        }
    }
}