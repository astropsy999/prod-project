import { LoginSchema } from 'features/AuthByUsername';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice.test', () => {
  test('test username', () => {
    const state: DeepPartial<LoginSchema> = { username: '123' };
    expect(
      loginReducer(state as LoginSchema, loginActions.setUsername('123123')),
    ).toEqual({ username: '123123' });
  });
  test('test password', () => {
    const state: DeepPartial<LoginSchema> = { password: '123' };
    expect(
      loginReducer(state as LoginSchema, loginActions.setPassword('123123')),
    ).toEqual({ password: '123123' });
  });
});
