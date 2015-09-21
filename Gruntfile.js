module.exports = function(grunt){

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    browserify: {
      dist: {
        files: {'prod/es5.js': ['dev/namespace.js','dev/Task.js', 'dev/TaskList.js','dev/app.js']},
        options: {
          sourceMap: true,
          transform: [["babelify", {"optional": ["runtime"]}]]
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    sass: {dist: {
      files: {
        'css/main.css': 'sass/todo.scss'
      }
    }},
    watch: {
      js: {
        files: ['dev/*.js'],
        tasks: ['js']
      },
      css: {
        files: ['sass/*.scss'],
        tasks: ['sass']
      }
    }
  });

  grunt.registerTask("test", ["karma"]);
  grunt.registerTask("js", ["browserify"]);
  grunt.registerTask("default", ["sass","browserify"]);
};