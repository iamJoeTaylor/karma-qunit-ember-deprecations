module.exports = function (grunt) {
  grunt.initConfig({
    pkgFile: 'package.json',
    'npm-contributors': {
      options: {
        commitMessage: 'chore: update contributors'
      }
    },
    build: {
      adapter: ['src/adapter.js']
    },
    bump: {
      options: {
        commitMessage: 'chore: release v%VERSION%',
        pushTo: 'upstream',
        commitFiles: [
          'package.json'
        ]
      }
    },
    karma: {
      options: {
        singleRun: true
      },
      adapter: {
        configFile: 'karma.conf.js'
      }
    }
  })

  require('load-grunt-tasks')(grunt)
  grunt.loadTasks('tasks')

  grunt.registerTask('test', ['karma'])
  grunt.registerTask('default', ['test'])

  grunt.registerTask('release', 'Bump the version and publish to NPM.', function (type) {
    grunt.task.run([
      'npm-contributors',
      'build',
      'bump-only:' + (type || 'patch'),
      'bump-commit',
      'npm-publish'
    ])
  })
}
