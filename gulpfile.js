var gulp = require('gulp'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    replace = require('gulp-replace'),
    sourcemaps = require('gulp-sourcemaps'),
    critical = require('critical').stream,
    argv = require('yargs').argv,
    gutil = require('gulp-util'),
    fs = require('fs'),
    pkgJson = JSON.parse(fs.readFileSync('./package.json'));

/* baseDirs: baseDirs for the project */

// Set production flag
var isProduction = false;
gutil.log("Testing out the production flag");
if (argv.production) {
    //trigger with gulp --production
    gutil.log("Production Mode - ON");
    isProduction = true;
}

var baseDirs = {
    dist: 'dist/',
    src: 'src/',
    assets: 'dist/assets/',
    examples: 'dist/examples',
    hdxStyle: 'src/hdx-styles/src/common/',
    vendor: 'node_modules/',
    hxlExample: 'src/hxl-example/**/*'
};

/* routes: object that contains the paths */

var routes = {
    styles: {
        vendor: [
            baseDirs.vendor+'select2/dist/css/select2.min.css'
        ],
        less: baseDirs.src+'styles/*.less',
        _less: baseDirs.src+'styles/**/*.less',
        css: baseDirs.assets+'css/'
    },

    templates: {
        html: baseDirs.src+'templates/**/*'
    },

    examples: {
        hxl: baseDirs.examples+'/hxl/'
    },

    dependencies: {

    },

    scripts: {
        vendor: [
            baseDirs.src+'config/analytics.js',
            baseDirs.vendor+'jquery/dist/jquery.min.js',
            baseDirs.vendor+'jquery.cookie/jquery.cookie.js',
            baseDirs.vendor+'bootstrap/dist/js/bootstrap.min.js',
            baseDirs.vendor+'select2/dist/js/select2.min.js'
        ],
        base: baseDirs.src+'scripts/',
        js: baseDirs.src+'scripts/*.js',
        jsmin: baseDirs.assets+'js/'
    },

    files: {
        html: 'dist/',
        images: baseDirs.src+'images/*',
        imgmin: baseDirs.assets+'images/',
        cssFiles: baseDirs.assets+'css/*.css',
        htmlFiles: baseDirs.dist+'**/*',
        styleCss: baseDirs.assets+'css/style.css',
        hdxStyleFonts: baseDirs.hdxStyle+'fonts/**/*',
        hdxStyleImages: baseDirs.hdxStyle+'images/**/*',
        hxlExample: baseDirs.hxlExample+'**/*'
    },

    deployDirs: {
        baseDir: baseDirs.dist,
        baseDirFiles: baseDirs.dist+'**/*',
        ftpUploadDir: 'FTP-DIRECTORY'
    }
};


/* Production overrides */
if (isProduction) {
    routes.scripts.vendor.unshift(baseDirs.src+'config/production.js'); //production config file
} else {
    routes.scripts.vendor.unshift(baseDirs.src+'config/default.js'); //main config file
}

/* Compiling Tasks */


// Templating

gulp.task('templates', function() {
    return gulp.src(routes.templates.html)
        //.pipe(minifyHTML({collapseWhitespace: true}))
        .pipe(replace('$HDX_VERSION_TAG', pkgJson.version))
        .pipe(browserSync.stream())
        .pipe(gulp.dest(routes.files.html));
        // .pipe(notify({
        //     title: 'HTML minified succesfully!',
        //     message: 'templates task completed.'
        // }));
});

// SCSS

gulp.task('styles', function() {
    gulp.src(routes.styles.vendor, {base: '.'})
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Compiling Vendor CSS.",
                message:"<%= error.message %>"
            })
        }))
        .pipe(rename('vendor.css'))
        .pipe(gulp.dest(routes.styles.css))
        .pipe(browserSync.stream());

    return gulp.src(routes.styles.less)
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Compiling LESS.",
                message:"<%= error.message %>"
            })
        }))
        .pipe(sourcemaps.init())
            .pipe(less({}))
            .pipe(autoprefixer('last 3 versions'))
            .pipe(minifyCss())
        .pipe(sourcemaps.write())
        // .pipe(rename('style.css'))
        .pipe(gulp.dest(routes.styles.css))
        .pipe(browserSync.stream());
        // .pipe(notify({
        //     title: 'Less Compiled and Minified succesfully!',
        //     message: 'less task completed.',
        // }));
});

/* Scripts (js) ES6 => ES5, minify and concat into a single file.*/

gulp.task('scripts', function() {
    gulp.src(routes.scripts.vendor, {base: '.'})
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Babel and Concat failed.",
                message:"<%= error.message %>"
            })
        }))
        .pipe(concat('vendor.js'))
        .pipe(babel())
        // .pipe(uglify())
        .pipe(gulp.dest(routes.scripts.jsmin));
    return gulp.src(routes.scripts.js)
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Babel and Concat failed.",
                message:"<%= error.message %>"
            })
        }))
        .pipe(sourcemaps.init())
            .pipe(concat('script.js'))
            .pipe(babel())
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(routes.scripts.jsmin))
        .pipe(browserSync.stream());
        // .pipe(notify({
        //     title: 'JavaScript Minified and Concatenated!',
        //     message: 'your js files has been minified and concatenated.'
        // }));
});

/* Lint, lint the JavaScript files */

gulp.task('lint', function() {
	return gulp.src(routes.scripts.js)
		.pipe(jshint({
			lookup: true,
			linter: 'jshint',
		}))
		.pipe(jshint.reporter('default'));
});

/* Image compressing task */

gulp.task('images', function() {
    return gulp.src(routes.files.images)
        .pipe(gulp.dest(routes.files.imgmin));
});

/* Preproduction beautifiying task (SCSS, JS) */

gulp.task('beautify', function() {
    // gulp.src(routes.scripts.js)
    //     .pipe(beautify({indentSize: 4}))
    //     .pipe(plumber({
    //         errorHandler: notify.onError({
    //             title: "Error: Beautify failed.",
    //             message:"<%= error.message %>"
    //         })
    //     }))
    //     .pipe(gulp.dest(routes.scripts.base))
    //     .pipe(notify({
    //         title: 'JS Beautified!',
    //         message: 'beautify task completed.'
    //     }));
});

/* Serving (browserSync) and watching for changes in files */

gulp.task('serve', function() {
    browserSync.init({
        server: './dist/'
    });

    gulp.watch([routes.styles.less, routes.styles._less], gulp.series('styles'));
    gulp.watch(routes.templates.html, gulp.series('templates'));
    gulp.watch(routes.scripts.js, gulp.series('scripts', 'beautify'));
});

/* Optimize your project */

gulp.task('uncss', function() {
    // return gulp.src(routes.files.cssFiles)
    //     .pipe(uncss({
    //         html:[routes.files.htmlFiles],
    //         ignore:['*:*']
    //     }))
    //     .pipe(plumber({
    //         errorHandler: notify.onError({
    //             title: "Error: UnCSS failed.",
    //             message:"<%= error.message %>"
    //         })
    //     }))
    //     .pipe(minifyCss())
    //     .pipe(gulp.dest(routes.styles.css));
    //     // .pipe(notify({
    //     //     title: 'Project Optimized!',
    //     //     message: 'UnCSS completed!'
    //     // }));
});

/* Extract CSS critical-path */

gulp.task('critical', function () {
    return gulp.src(routes.files.htmlFiles)
        .pipe(critical({
            base: baseDirs.dist,
            inline: true,
            html: routes.files.htmlFiles,
            css: routes.files.styleCss,
            ignore: ['@font-face',/url\(/],
            width: 1300,
            height: 900
        }))
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Critical failed.",
                message:"<%= error.message %>"
            })
        }))
        .pipe(gulp.dest(baseDirs.dist));
        // .pipe(notify({
        //     title: 'Critical Path completed!',
        //     message: 'css critical path done!'
        // }));
});

/* Temporary bla */
gulp.task('hdxAssets', function() {
    gulp.src(routes.files.hdxStyleFonts)
    .pipe(gulp.dest(baseDirs.assets + 'fonts/'));

    return gulp.src(routes.files.hdxStyleImages)
        .pipe(gulp.dest(baseDirs.assets + 'images/'));
});

gulp.task('dev', gulp.series('templates', 'styles', 'scripts',  'images', 'hdxAssets', 'serve'));

gulp.task('build', gulp.series('templates', 'styles', 'scripts', 'images', 'hdxAssets'));

gulp.task('optimize', gulp.series('uncss', 'critical', 'images'));

gulp.task('deploy', gulp.series('optimize'));

gulp.task('default', gulp.series('dev'));
