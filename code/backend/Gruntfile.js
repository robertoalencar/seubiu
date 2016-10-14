module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', '**/*.js', '!node_modules/**', '!migrations/**'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    shell: {
      supervisor: {
        command: 'supervisor ./bin/www'
      },
      jasmine: {
        command: 'jasmine'
      },
      orm_db_sync: {
        command: 'node utils/orm-db-sync.js'
      },
      bootstrap_db: {
        command: 'node utils/bootstrap-db.js'
      },
      redis_flush_all: {
        command: 'redis-cli flushall'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('start', ['shell:supervisor']);
  grunt.registerTask('test', ['shell:jasmine']);
  grunt.registerTask('jshint', ['jshint']);
  grunt.registerTask('initdb', ['shell:redis_flush_all', 'shell:orm_db_sync', 'shell:bootstrap_db']);

};