'use strict';

module.exports = function (grunt) {
    // Load all tasks
    require('load-grunt-tasks')(grunt);
    // Show elapsed time
    require('time-grunt')(grunt);
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: {
            // Configurable paths
            appRoot: 'app',
            appNamespace: 'WordCloud',
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            grunt: {
                files: ['gruntfile.js'],
                options: {
                    reload: true
                },
                tasks: [
                    'handlebars',
                    'sass:development'
                ]
            },
            sass: {
                files: [
                    '<%= config.appRoot %>/style/scss/**/*.scss'
                ],
                tasks: ['sass:development']
            },
            css: {
                files: [
                    '<%= config.appRoot %>/style/css/*.css'
                ],
                options: {
                    reload: true
                }
            },
            handlebars: {
                files: [
                    // put each template in its module folder rather than a huge templates folder
                    '<%= config.appRoot %>/**/*.hbs'
                ],
                tasks: ['handlebars']
            },
            templates: {
                files: [
                    '<%= config.appRoot %>/js/templates/templates.js'
                ],
                options: {
                    reload: true
                }
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= config.appRoot %>/{,*/}*.html',
                    '<%= config.appRoot %>/style/css/*.css',
                    '<%= config.appRoot %>/assets/{,*/}*',
                    '<%= config.appRoot %>/data/*.json'
                ]
            }
        },

        connect:
        {
            server:
            {
                options:
                {
                    hostname: 'localhost',
                    port: 8000,
                    base: '<%= config.appRoot %>',
                    livereload: true
                }
            }
        },

        // Compile the scss source into a single css file.
        sass: {
            development: {
                files: {
                    '<%= config.appRoot %>/style/css/main.css': '<%= config.appRoot %>/style/scss/main.scss'
                },
                options: {
                    style: 'expanded',
                    lineNumbers: true,
                    includePaths: require('bourbon').includePaths.concat(require('bourbon-neat').includePaths)
                }
            },
            dist: {
                files: {
                    '<%= config.appRoot %>/style/css/main.css': '<%= config.appRoot %>/style/scss/main.scss'
                },
                options: {
                    style: 'compressed',
                    includePaths: require('bourbon').includePaths.concat(require('bourbon-neat').includePaths)
                }
            }
        },
        handlebars: {
            options: {
                namespace: '<%= config.appNamespace %>.Templates',
                processName: function(filePath) {
                    return filePath.replace(/^app.*\/templates\//, '').replace(/\.hbs$/, '');
                }
            },
            all: {
                files: {
                    '<%= config.appRoot %>/js/templates/templates.js': ['<%= config.appRoot %>/**/*.hbs']
                }
            }
        }

    });

    // Register tasks
    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {

        grunt.task.run([
            'sass:development',
            'handlebars',
            //'connect:livereload',
            'connect:server',
            'watch'
        ]);
    });

    grunt.registerTask('compile', 'Compile', function (target) {
        grunt.task.run([
            'sass:dist',
            'handlebars'
        ]);
    });

};
