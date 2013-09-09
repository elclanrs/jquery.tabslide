/**!
 * Advanced jQuery Boilerplate
 * https://gist.github.com/elclanrs/5668451
 * @author: Cedric Ruiz
 */
(function(e){e.newPlugin=function(t,n,r,i){function s(r,i){this.opts=e.extend({},n,i);this.el=r;this._name=t;this._init()}s.prototype._init=e.noop;s.prototype[t]=function(e){if(!e)return this._init();try{return this[e].apply(this,[].slice.call(arguments,1))}catch(t){}};e.extend(s.prototype,r);if(i)e[t]=i;e.fn[t]=function(){var n=arguments,r;this.each(function(){var i=e.data(this,"plugin_"+t);if(!i||typeof n[0]=="object"){return e.data(this,"plugin_"+t,new s(this,n[0]))}return r=i[t].apply(i,n)});return/^get/.test(n[0])?r:this}}})(jQuery);

/**!
 * Tabslide
 * @author: Cedric Ruiz
*/
(function($, win, doc, undefined) {

  var pluginName, defaults, methods;

  pluginName = 'tabslide';

  defaults = {
    nav: '.tabslide-nav',
    navItems: 'li',
    buildNavItems: true,
    wrap: '.tabslide-wrap',
    item: '.slide',
    activeClass: 'slide-active',
    before: null,
    after: null,
    fadeSpeed: 300
  };

  methods = {

    _init: function() {

      var self = this,
          active = this.opts.activeClass;

      this.$el = $(this.el);

      this.$nav = this.$el.find(this.opts.nav);
      this.$navItems = this.$nav.find(this.opts.navItems);

      this.$wrap = this.$el.find(this.opts.wrap);
      this.$items = this.$wrap.find(this.opts.item);

      if (this.opts.buildNavItems) this._buildNavItems();

      this.$items.hide().first().show();
      this.$navItems.removeClass(active).first().addClass(active);

      this.$navItems.click(function() {
        self.go(self.$navItems.index(this));
      });
    },

    _buildNavItems: function() {

      var isCustom = this.opts.buildNavItems instanceof Array,
          item = function(val){ return '<li><a href="#">'+ val +'</a></li>'; },
          items;

      items = isCustom ?
        $.map(this.opts.buildNavItems, item) :
        this.$items.map(function(i){ return item(++i); }).get();

      this.$navItems = $(items.join(''));

      this.$nav.append($('<ul/>').append(this.$navItems));
    },

    _getCurIdx: function() {
      return this.$items.index(this.$items.filter(':visible'));
    },

    go: function(idx) {

      var active = this.opts.activeClass,
          fadeSpeed = this.opts.fadeSpeed;

      if (idx >= this.$items.length) idx = 0;
      if (idx < 0) idx = this.$items.length-1;

      if (this.opts.before) this.opts.before.call(this, idx);

      this.$navItems.removeClass(active).eq(idx).addClass(active);
      this.$items.fadeOut(fadeSpeed).eq(idx).fadeIn(fadeSpeed);

      if (this.opts.after) this.opts.after.call(this, idx);
    },

    prev: function() {
      this.go(this._getCurIdx() - 1);
    },

    next: function() {
      this.go(this._getCurIdx() + 1);
    }
  };

  $.newPlugin(pluginName, defaults, methods);

}(jQuery, window, document));
