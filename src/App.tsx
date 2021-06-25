import React, { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import './App.css';
import { IUser } from './models/IUser';
import UserService from './services/UserService';
import LoginForm from './components/LoginForm';
import { observer } from 'mobx-react-lite';

function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);
  async function getUsers() {
    try {
      const res = await UserService.fetchUsers();
      setUsers(res.data);
    } catch (err) {
      console.log(err);
      
    }
  }

  useEffect(() => {
    // store.isAuth = true;
    // if (localStorage.getItem('token')) {
    //   store.checkAuth();
    // }
  });

  console.log(store.isAuth);
  
  if (store.isLoading) {
    return (<div>Loading in progress...</div>)
  }

  if (!store.isAuth) {    
    return (
      <div>
        <LoginForm />
        <button onClick={getUsers}>Users List</button>
      </div>
    )
  }
  console.log(store.isAuth);
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      {/* </header> */}
      {/* <h1>{store.isAuth ? store.user.id : 'Login'}</h1> */}
      <button onClick={() => store.logout()}>Logout</button>
      <div>
        <button onClick={getUsers}>Users List</button>
      </div>
      <div>UID | Login</div>
      {
        users.map((user, i) => 
          <div key={i}>{user.id}</div>
        )
      }
    </div>
  );
}

export default observer(App);
