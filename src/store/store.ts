import axios from "axios";
import { makeAutoObservable } from 'mobx';
import { API_URL } from "../http";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(login: string, password: string) {
    try {
      const res = await AuthService.login(login, password);
      console.log(res);      
      // localStorage.setItem('token', res.data.accessToken);
      this.setAuth(true);     
      console.log(res.data);      
      // this.setUser(user);
      console.log(this.user);      
    } catch (err) {
      console.log(err.response?.data?.message);
      
    }
  }

  async registration(login: string, password: string) {
    try {
      const res = await AuthService.registration(login, password);
      console.log(res);
      // localStorage.setItem('token', res.data.accessToken);
      this.setAuth(true);
      this.setUser(res.data.user);
    } catch (err) {
      console.log(err.response?.data?.message);

    }
  }

  async logout() {
    try {
      await AuthService.logout();
      // localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (err) {
      console.log(err.response?.data?.message);

    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      // const res = await axios(`${API_URL}/refresh`, { withCredentials: true });
      // console.log('checkAuth >>> ', res);
      // localStorage.setItem('token', res.data.accessToken);
      this.setAuth(true);
      // this.setUser(res.data.user);
    } catch (err) {
      console.log(err.response?.data?.message);

    } finally {
      this.setLoading(false);
    }
  }
}