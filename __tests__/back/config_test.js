/*eslint-env jasmine */
/*global jest*/

jest.dontMock('../../src/back/Config');

var Config = require('../../src/back/Config');

describe('Config', () => {
  it('can store passed options', () => {
    Config.store({ajax: 1});
    expect(Config.opts).toEqual({ajax: 1});
  })

  it('can return an option', () => {
    Config.store({ajax: 1});
    expect(Config.get('ajax')).toEqual(1);
  })
})
