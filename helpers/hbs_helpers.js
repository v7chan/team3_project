var hbs = require('hbs');

hbs.registerPartials(__dirname + '/../views/partials');

hbs.registerHelper('section', function(name, options) {
    if(!this._sections) this._sections = {};
    this._sections[name] = options.fn(this);
    return null;
  }
);