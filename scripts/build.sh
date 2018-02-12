lessc --clean-css assets/stylesheets/index.less assets/stylesheets/index.min.css
npx babel assets/javascripts/index.es6 --out-file assets/javascripts/index.min.js --minified --presets=env
