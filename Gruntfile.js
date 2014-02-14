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
            src: 'cctext.gadget/',
            dest: 'appdata'
        }
    },

    compress: {

        //text gadget
        text: {
            options: {
                mode: 'zip',
                archive: 'build/cctext.zip'
            },
            files: [
                {
                     cwd: 'cctext.gadget/',
                    src: ['**'],
                    expand: true
                }
            ]
        },
        weather: {
            options: {
                mode: 'zip',
                archive: 'build/ccweather.zip'
            },
            files: [
                {
                     cwd: 'ccweather.gadget/',
                    src: ['**'],
                    expand: true
                }
            ]
        },
        pidglet: {
            options: {
                mode: 'zip',
                archive: 'build/ccpidglet.zip'
            },
            files: [
                {
                     cwd: 'ccpidglet.gadget/',
                    src: ['**'],
                    expand: true
                }
            ]
        },
        date: {
            options: {
                mode: 'zip',
                archive: 'build/ccdate.zip'
            },
            files: [
                {
                     cwd: 'ccdate.gadget/',
                    src: ['**'],
                    expand: true
                }
            ]
        }
    },
    rename: {
        text: {
            src: 'build/cctext.zip',
            dest: 'build/cctext.gadget'
        },
        weather: {
            src: 'build/ccweather.zip',
            dest: 'build/ccweather.gadget'
        },
        pidglet: {
            src: 'build/ccpidglet.zip',
            dest: 'build/ccpidglet.gadget'
        },
        date: {
            src: 'build/ccdate.zip',
            dest: 'build/ccdate.gadget'
        }
    }
});

// Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-compress');
grunt.loadNpmTasks('grunt-rename');

// Default task(s).
grunt.registerTask('default', ['watch']);
grunt.registerTask('build', ['compress','rename']);

};