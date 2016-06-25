var gulp = require('gulp');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var insert = require('gulp-insert');
var wrap = require('gulp-wrap');

var files = [
  'bower_components/jsencrypt/bin/jsencrypt.js',
  'src/slash-client.js'
];

var lintFiles = [
  'src/slash-client.js'
];

var licenses = [
  'src/LICENSE.txt',
  'bower_components/jsencrypt/LICENSE.txt'
];

gulp.task('lint', function () {
  return gulp.src(lintFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('license', function() {
  return gulp.src(licenses)
    .pipe(insert.transform(function(contents, file) {
      return 'File: ' + file.path.replace(__dirname, '') + "\n" + contents;
    }))
    .pipe(concat('LICENSE.txt'))
    .pipe(gulp.dest(''));
});

var packageJson = require('./package.json');
gulp.task('scripts', function() {
  return gulp.src(files)
    .pipe(concat('slash-client.js'))
    .pipe(wrap({src: 'src/template.txt'}, {version: packageJson.version}, {variable: 'data'}))
    .pipe(gulp.dest('dist/'))
    .pipe(rename('slash-client.min.js'))
    .pipe(uglify({preserveComments: 'license'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['lint', 'scripts', 'license']);
gulp.task('default', ['build']);