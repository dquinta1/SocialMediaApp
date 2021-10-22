var store = require('store');

class Auth {
    constructor() {
      this.authenticated = false;
    }
  
    login(cb) {
      this.authenticated = true;
      // store.set('isAuthenticated', true);
      cb();
    }
  
    logout(cb) {
      this.authenticated = false;
      // store.set('isAuthenticated', false);
      cb();
    }
  
    isAuthenticated() {
      return this.authenticated;
      // return store.get('isAuthenticated');
    }
  }
  
  export default new Auth();