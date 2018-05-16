var gulp = require('gulp'),
    sass = require('gulp-sass'),
    bsync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    smartGrid = require('smart-grid'),
    rename = require('gulp-rename');

gulp.task('sass', function() {
    return gulp.src('src/sass/**/*.+(scss|sass)')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(bsync.stream())
    //.pipe(bsync.reload({stream: true}))
});

gulp.task('scripts', function() {
    return gulp.src([
        'src/libs/jquery/dist/jquery.min.js',
        'src/js/googlemap.js',
        'src/js/slidie.js',
        'src/js/navigation.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'));
});

gulp.task('cssCompress', function() {
    return gulp.src([
        'src/css/*.css'
])
    .pipe(cssnano())
    .pipe(gulp.dest('src/css'));
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

gulp.task('watch', ['bs', 'autoprefixer', 'scripts'], function() {
    gulp.watch('src/**/*.+(sass|scss)', ['sass']);
    gulp.watch('src/*.html', bsync.reload);
    gulp.watch('src/js/**/*.js', bsync.reload);
    //gulp.watch('src/css/**/*.css', bsync.reload);
    //gulp.watch('src/css/**/*.css', ['cssCompress']);
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