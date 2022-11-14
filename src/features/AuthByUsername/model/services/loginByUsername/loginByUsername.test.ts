import axios from 'axios';

jest.mock('axios');

const mockedAxios = jest.mocked(axios, true);

describe('loginByUsername.test', () => {
  test('', () => {
    mockedAxios.post.mockReturnValue(
      Promise.resolve({ data: { username: '123', id: '1' } }),
    );
    // expect().toEqual();
  });
});
