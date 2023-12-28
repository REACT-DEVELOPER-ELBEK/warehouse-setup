import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = (key: string, value: any, options?: object) => {
  cookies.set(key, value, options);
};

export const getCookie = (key: string) => {
  return cookies.get(key);
};

export const removeCookie = (key: string) => {
  cookies.remove(key);
};