import testFunc from '../src/test';

test('ТЕСТИРУЮ', () => {
  expect(typeof testFunc('123')).toBe('number');
});
