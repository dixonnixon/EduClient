const appAuthProvider = {
    isAuthenticated: false,
    async signin({username, password}, callback) {
        console.log("signin", username, password);
        const response = await fetch('https://10.1.0.16:443/users/login', {
            method: "POST",
            cache: "no-cache", 
            headers: {
                "Content-Type": "application/json",
                // 'Access-Control-Allow-Origin': 'http://10.1.0.16:1574/'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const data = await response.json();
        console.log("data", data);
        
        appAuthProvider.isAuthenticated = true;
        // callback(data);
        callback({ response: data, isAuthenticated: appAuthProvider.isAuthenticated });
      // setTimeout(callback, 100); // fake async
    },


    async signout(callback) {
        appAuthProvider.isAuthenticated = false;
      setTimeout(callback, 100);
    },
  };
  
  export { appAuthProvider };