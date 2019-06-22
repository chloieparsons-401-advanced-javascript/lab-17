'use strict';

const util = require('../app');
const logger = require('../src/events/logger');

jest.mock('fs');

describe('uppercase', () => {
  it('should return a string uppercased', () => {
    let string = 'Summer time is the best';
    string = util.upper(string);
    expect(string).toEqual('SUMMER TIME IS THE BEST');
  });
});

describe('logger function', () => {
  it('should take in a message and console.log it if a save', () => {
    let test = {
      name: 'saved',
      data: 'Woohoo! Event successfully saved!',
    };
    let spy = jest.spyOn(console, 'log');
    logger.logger(JSON.stringify(test));
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should take in a message and console.error it if an error', () => {
    let test = {
      name: 'error',
      data: 'Uhoh! Event error. Please try again.',
    };
    let spy = jest.spyOn(console, 'error');
    logger.logger(JSON.stringify(test));
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should take in a message and console.log if neither error or save', () => {
    let test = {
      name: 'test',
      data: 'An event occurred, but was not an error nor saved.',
    };
    let spy = jest.spyOn(console, 'log');
    logger.logger(JSON.stringify(test));
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});