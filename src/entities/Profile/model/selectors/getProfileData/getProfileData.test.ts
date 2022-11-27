import { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import avatar from 'shared/assets/tests/avatar.webp';
import { getProfileData } from './getProfileData';

describe('getLoginError.test.', () => {
  test('should return error', () => {
    const data = {
      username: 'admin',
      age: 42,
      country: Country.Ukraine,
      lastname: 'Фамилия',
      currency: Currency.UAH,
      first: 'Имя',
      city: 'Город',
    };
    const state: DeepPartial<StateSchema> = {
      profile: {
        data: data,
      },
    };
    expect(getProfileData(state as StateSchema)).toEqual(data);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});
