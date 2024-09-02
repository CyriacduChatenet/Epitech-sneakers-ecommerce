import { useEffect, useState } from 'react';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { AppService } from './app/services/app.service';

const App = () => {
  const appService = new AppService();
  const [count, setCount] = useState(0);
  const [hello, setHello] = useState('');

  const sayHello = async () => {
    const result = await appService.getHello();
    setHello(result.data);
  }

  useEffect(() => {
    sayHello();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>{hello} from API</p>
    </>
  )
}

export default App
