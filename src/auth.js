

const appAuthProvider = {
    isAuthenticated: false,
    async signin({username, passwd}, callback) {
        console.log(username, passwd);
        try {
          const response = await fetch(`https://192.168.1.7/users/login`, {
              method: "POST",
              cache: "no-cache", 
              headers: {
                  "Content-Type": "application/json",
                  // 'Access-Control-Allow-Origin': 'http://10.1.0.16:1574/'
                  // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify({
                  // username: 'su',
                  // password: 'su'
                  username: username,
                  password: passwd
              })
          });
        } catch (err) {
          console.error(`[ACTION ERROR]: ${err}`);
        }
        const data = await response.json();
        console.log("data", data);
        if(data.success && !data.err) {
          appAuthProvider.isAuthenticated = true;
        }
        callback();
      // setTimeout(callback, 100); // fake async
    },


    async signout(callback) {
        appAuthProvider.isAuthenticated = false;
        callback();
    },
  };
  
  export { appAuthProvider };