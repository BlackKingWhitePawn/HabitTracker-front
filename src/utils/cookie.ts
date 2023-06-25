const setCookie = (name: string, value: string, expiryDays: number) => {
  let date = new Date();
  date.setTime(date.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

const getCookie = (name: string) => {
    const cookie = document.cookie
    const field = cookie
      .split(';')
      .find(c => c.trim().split('=')[0] == name)
      ?.split('=')[1]

    
    return field
}

const generateGUID = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export { generateGUID, setCookie, getCookie }