module.exports = {

    getUserSearchDAO: function() {
      return require('./user-search-dao' + '-' + 'postgresql');
    }

};