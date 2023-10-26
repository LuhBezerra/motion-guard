import Cookie from 'js-cookie';

export const setCookie = (key: string, value: any) => {
  Cookie.set(key, value);
};

export const getCookie = (key: string) => {
  return Cookie.get(key);
};

export const removeCookie = (key: string) => {
  Cookie.remove(key);
}