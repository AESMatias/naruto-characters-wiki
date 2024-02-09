import { Navigator } from './src/routes/Routes.jsx';
import { Provider } from 'react-redux';
import { store } from './src/store/store.jsx';


export default function App() {

  return (
    <Provider store={store}>
      <Navigator>
      </Navigator>
    </Provider>

  );
}