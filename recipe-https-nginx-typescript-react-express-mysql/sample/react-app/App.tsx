import {FC ,useEffect,useState} from 'react';

const App:FC = () => {
  const [data,setData] = useState({message:"hoge"})
  useEffect(()=> {
    ( async () => {
      // fetch先は作成したサブドメインに適時書き換える
      const res = await fetch('https://localhost.hironomiu.com/api/v1/hello')
      const data = await res.json()
      setData(data)
    })()
  })
  return <div>{data.message}</div>;
};

export default App;