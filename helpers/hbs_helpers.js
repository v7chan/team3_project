var hbs = require('hbs');

hbs.registerPartials(__dirname + '/../views/partials');

hbs.registerHelper('section', function(name, options) {
    if(!this._sections) this._sections = {};
    this._sections[name] = options.fn(this);
    return null;
  }
);

hbs.registerHelper('equal', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if( lvalue!=rvalue ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

hbs.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);
 
  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});

hbs.registerHelper('include', function(options) {
    var context = {},
        mergeContext = function(obj) {
            for(var k in obj)context[k]=obj[k];
        };
    mergeContext(this);
    mergeContext(options.hash);
    return options.fn(context);
});