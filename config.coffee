exports.config =
  
  paths:
    public: 'public'
  
  files:
    javascripts:
      defaultExtension: 'js'
      joinTo:
        'js/app.js': /^app/
        'js/vendor.js': /^(vendor|bower_components)/
      order:
        before: [
          'vendor/js/PxLoader.js',
          'vendor/js/PxLoaderImage.js'
        ]
 
    stylesheets:
      defaultExtension: 'less'
      joinTo: 
        'css/app.css': /^(app|vendor)/
