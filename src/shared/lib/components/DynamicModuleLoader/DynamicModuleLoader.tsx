import { ReduxStoreWithManager } from 'app/providers/StoreProvider/config/StateSchema';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

interface DynamicModuleLoaderProps {}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
  const { children } = props;
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useDispatch();

  useEffect(() => {
    store.reducerManager.add('loginForm', loginReducer);
    dispatch({ type: '@INIT loginForm reducer' });
    return () => {
      store.reducerManager.remove('loginForm');
      dispatch({ type: '@DESTROY loginForm reducer' });
    };
    // eslint-disable-next-line
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
