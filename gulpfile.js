var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    bsync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    smartGrid = require('smart-grid'),
    rename = require('gulp-rename');

	gulp.task('imagemin', function() {
	return gulp.src('src/img/**/*')
		.pipe(imagemin()) // Cache Images
		.pipe(gulp.dest('dist/img')); 
	});
	
gulp.task('sass', function() {
    return gulp.src('src/sass/**/*.+(scss|sass)')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(bsync.stream())
});

gulp.task('scripts', function() {
    return gulp.src([
        'src/libs/jquery/dist/jquery.min.js',
        'src/js/googlemap.js',
        'src/js/slidie.js',
        'src/js/navigation.js',
        'src/js/main.js'
    ])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('cssCompress', function() {
    return gulp.src([
        'src/css/*.css'
])
    .pipe(cssnano())
	.pipe(rename({suffix: '.min', prefix : ''}))
    .pipe(gulp.dest('dist/css'));
})

gulp.task('bs', function() {
    bsync({
        server: {
            baseDir: 'src'
        },
        notify: false
    });
});
 
gulp.task('autoprefixer', () =>
    gulp.src('src/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('src/css'))
);

gulp.task('watch', ['bs', 'autoprefixer'], function() {
    gulp.watch('src/**/*.+(sass|scss)', ['sass']);
    gulp.watch('src/*.html', bsync.reload);
    gulp.watch('src/js/**/*.js', bsync.reload);
});

gulp.task('build', ['imagemin', 'sass', 'scripts', 'cssCompress'], function() {

	var buildFiles = gulp.src([
		'src/*.html',
		'src/.htaccess',
		]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'src/css/main.min.css',
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'src/js/scripts.min.js',
		]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'src/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));

});

// var settings = {
//     outputStyle: 'scss', /* less || scss || sass || styl */
//     columns: 12, /* number of grid columns */
//     offset: '30px', /* gutter width px || % */
//     mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
//     container: {
//         maxWidth: '1200px', /* max-width Ð¾n very large screen */
//         fields: '30px' /* side fields */
//     },
//     breakPoints: {
//         lg: {
//             width: '1100px', /* -> @media (max-width: 1100px) */
//         },
//         md: {
//             width: '960px'
//         },
//         sm: {
//             width: '780px',
//             fields: '15px' /* set fields only if you want to change container.fields */
//         },
//         xs: {
//             width: '560px'
//         }
//         /* 
//         We can create any quantity of break points.
 
//         some_name: {
//             width: 'Npx',
//             fields: 'N(px|%|rem)',
//             offset: 'N(px|%|rem)'
//         }
//         */
//     }
// };
// smartGrid('src', settings);