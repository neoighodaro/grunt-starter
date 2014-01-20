module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Read node's "package.json" file
    pkg: grunt.file.readJSON('package.json'),

    // Includes task
    includes: {
      files: {
          src: ['<%= pkg.dir.src %>/*.html'],
          dest: '<%= pkg.dir.build %>',
          flatten: true,
          cwd: '.',
          options: { silent: true }
      }
    },

    // JSHint task
    jshint: {
      all: '<%= pkg.dir.build %>/assets/js/*.js'
    },

    // Imageminifier task
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= pkg.dir.src %>/assets/img',
          src: ['*.{png,jpg,gif}'],
          dest: '<%= pkg.dir.build %>/assets/img/'
        }]
      }
    },

    // Uglify task
    uglify: {
      options: { mangle: false },
      build: {
        files: {
          '<%= pkg.dir.build %>/assets/js/jquery.min.js': ['bower_components/jquery/jquery.js'],
          '<%= pkg.dir.build %>/assets/js/script.min.js': ['<%= pkg.dir.src %>/assets/js/script.js']
        }
      }
    },

    // Clean up task
    clean: [
      "build/*"
    ],

    // Copy task
    copy: {
      scripts: {
        src: '<%= pkg.dir.src %>/assets/js/script.js',
        dest: '<%= pkg.dir.build %>/assets/js/script.js'
      }
    },

    // Watch task
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: '<%= pkg.dir.src %>/assets/js/*.js',
        tasks: ['jshint','uglify'],
        options: {
          spawn: false
        }
      },
      css: {
        files: '<%= pkg.dir.src %>/assets/scss/*.scss',
        tasks: ['sass'],
        options: {
          spawn: false
        }
      },
      html: {
        files: '<%= pkg.dir.src %>/*.html',
        tasks: ['includes'],
        options: {
          spawn: false
        }
      },
      htmlIncludes: {
        files: '<%= pkg.dir.src %>/includes/*.html',
        tasks: ['includes'],
        options: {
          spawn: false
        }
      }
    },

    // Concat task
    // concat: {
    // },

    // SASS task
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          '<%= pkg.dir.build %>/assets/css/style.min.css': '<%= pkg.dir.src %>/assets/scss/style.scss'
        }
      }
    }

  });

  // Load the plugin that provides the tasks.
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Default task(s).
  grunt.registerTask('build',   ['jshint', /*'concat',*/ 'uglify', 'sass', 'imagemin', 'includes', 'copy']);
  grunt.registerTask('default', ['clean', 'build']);

};