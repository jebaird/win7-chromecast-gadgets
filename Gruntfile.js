module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // watch
    watch: {
        scripts: {
            files: '**/*.js',
            tasks: [],
            options: {
                debounceDelay: 1000
            }
        }
    },

    copy: {
        // used for developing without visual studio
        // text widget
        text: {
            src: 'src/',
            dest: 'dest/'
        }
    }
});

// Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-copy');

// Default task(s).
grunt.registerTask('default', ['watch']);

};