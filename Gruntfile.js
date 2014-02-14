var path = require('path');

module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    gadgetPath: path.resolve(process.env.APPDATA, '..\\Local\\Microsoft\\Windows Sidebar\\Gadgets/') +'/',
    // watch
    watch: {
        scripts: {
            files: [
                'cctext.gadget/*',
                'ccweather.gadget/*',
                'ccpidglet.gadget/*',
                'ccdate.gadget/*'
            ],
            tasks: ['copy'],
            options: {
                debounceDelay: 1000
            }
        }
    },
// used to "install" the widgets in the gadget dir
    copy: {
        // used for developing without visual studio
        // text widget
        text: {
            src: 'cctext.gadget/**',
            dest: '<%= gadgetPath %>'
        },
        weather: {
            src: 'ccweather.gadget/**',
            dest: '<%= gadgetPath %>'
        },
        pidglet: {
            src: 'ccpidglet.gadget/**',
            dest: '<%= gadgetPath %>'
        },
        date: {
            src: 'ccdate.gadget/**',
            dest: '<%= gadgetPath %>'
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
grunt.registerTask('default', ['copy']);
grunt.registerTask('build', ['compress','rename']);



};