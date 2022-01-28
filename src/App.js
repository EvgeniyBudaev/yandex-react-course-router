import React, { useContext, useEffect, useState } from 'react';
import { ownHistory } from "./own-history";

function Screen(props) {
  return (
      <div style={{ outline: '1px solid red', padding: '20px'}}>
        {props.children}
      </div>
  )
}

const routerContext = React.createContext({ url: ''});

const Router = (props) => {
    const [url, setUrl] = useState('');

    useEffect(() => {
        setUrl(window.location.pathname);
        const unsubscribe = ownHistory.listen(() => {
            setUrl(window.location.pathname);
        });
        return unsubscribe;
    }, []);

    return (
        <routerContext.Provider value={{ url: url}}>
            {props.children}
        </routerContext.Provider>
    );
};

const Route = (props) => {
    const rCtx = useContext(routerContext);
    return props.path === rCtx.url ? props.children : null;
};

window.addEventListener('popstate', () => {
    console.log('history changed');
});

function App() {
  function navigate(targetLocation) {
      ownHistory.pushState({}, targetLocation);
  }

  return (
      <>
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/foo')}>foo</button>
          <button onClick={() => navigate('/bar')}>bar</button>
          <Router>
              <div className="App">
                  <Route path="/">Home</Route>
                  <Route path="/foo"><Screen>foo</Screen></Route>
                  <Route path="/bar"><Screen>bar</Screen></Route>
              </div>
          </Router>
      </>
  );
}

export default App;
