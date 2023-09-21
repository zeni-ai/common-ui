
import './App.css';

import FeatureGateProvider from './featureGate/FeatureGateProvider'
import { quickBooksUtility } from './helper/helper';

function App() {
  quickBooksUtility.init(
    "/connection/auth",
   'domain'
  );
const handleOnConnectClick = () => {
    return quickBooksUtility.handleClick();
}
  return (
    <FeatureGateProvider>
      <div>Hello world!!!</div>
      </FeatureGateProvider>
  )
}

export default App
