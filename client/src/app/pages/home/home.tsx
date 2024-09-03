import { useEffect, useState } from 'react';

import { AppService } from '../../services/app.service';

const HomePage = () => {
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

export default HomePage;
