var gulp = require('gulp');
var path = require('path');
var typescript = require('gulp-tsc');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var concat = require('gulp-concat');
var typings = require('gulp-typings');

var rootDir = './';
var nodeModulesDir = path.join(rootDir, 'node_modules');
var srcDir = path.join(rootDir, 'src');
var distDir = path.join(rootDir, 'dist');
var distSrcDir = path.join(distDir, 'src');
var distLibDir = path.join(distDir, 'lib');
var typingsJsonFile = path.join(rootDir, 'typings.json');

var typeScriptOptions = {
    outputFile: 'angularjs-ortec-finance.js',
    moduleType: 'amd'
}

var libOptions = {
    outputFile: 'lib.js'
}

var libraryFiles = [
    path.join(nodeModulesDir, 'requirejs/require.js'),
    path.join(nodeModulesDir, 'angular/angular.min.js')
]

var cleanPath = function (path) {
    return gulp.src(path, { read: false })
        .pipe(vinylPaths(del));
};

gulp.task('clean-dist-src', function () {
    return cleanPath(distSrcDir);
});

gulp.task('clean-dist-lib', function () {
    return cleanPath(distLibDir);
});

gulp.task('compile', ['clean-dist-src'], function () {
    return gulp.src([srcDir + '/**/*.ts'])
        .pipe(typescript({
            out: typeScriptOptions.outputFile,
            module: typeScriptOptions.moduleType
        }))
        .pipe(gulp.dest(distSrcDir));
});

gulp.task('compose-libs', ['clean-dist-lib'], function () {
    return gulp.src(libraryFiles)
        .pipe(concat(libOptions.outputFile))
        .pipe(gulp.dest(distLibDir));
});

gulp.task('typings', function () {
    return gulp.src(typingsJsonFile)
        .pipe(typings()); 
});

gulp.task('init', ['typings', 'compose-libs'], function () {
    
});