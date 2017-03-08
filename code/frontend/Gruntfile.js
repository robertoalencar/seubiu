module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', '**/*.js', '!node_modules/**'],
      options: {
      }
    },
    shell: {
      supervisor: {
        command: 'supervisor ./bin/www'
      },
      jasmine: {
        command: 'jasmine'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('start', ['shell:supervisor']);
  grunt.registerTask('test', ['shell:jasmine']);

};