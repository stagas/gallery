
/*!
 *
 * gallery
 *
 */

/**
 * Module dependencies.
 */

var Emitter = require('emitter')
var domify = require('domify')
var events = require('event')
var classes = require('classes')

/**
 * Exports.
 */

module.exports = Gallery

/**
 * Gallery class.
 *
 * @api public
 */

function Gallery () {
  this.el = null
  this.images = []
  this.items = []
  this.active = null
  this.lastActive = this.active
}

/**
 * Make Emitter.
 */

Emitter(Gallery.prototype)

/**
 * Set path and files.
 *
 * @param {String} path
 * @param {Array} files
 * @api public
 */

Gallery.prototype.set = function (path, files) {
  this.path = path
  this.files = files
}

/**
 * Emit `change` if user has selected
 * a new image.
 *
 * @return {Object} this
 * @api private
 */

Gallery.prototype.change = function () {
  if (this.active !== this.lastActive) {
    this.emit('change', this.active, this.lastActive)
    this.lastActive = this.active
  }
  return this
}

/**
 * Add image `file` to collection.
 *
 * @param {String} file
 * @return {Object} this
 * @api public
 */

Gallery.prototype.add = function (file) {
  var self = this
  var ul = find(this.el, '.gallery-images')

  var li = document.createElement('li')
  var img = document.createElement('img')
  img.src = this.path+'/'+file
  li.appendChild(img)

  events.bind(img, 'click', function (ev) {
    self.onclick(ev)
  })

  events.bind(img, 'dblclick', function (ev) {
    self.onclick(ev)
    self.change()
    self.emit('ok')
  })

  // images are inserted in reverse!
  // newest goes to the top (first)
  this.images.unshift(img)
  this.items.unshift(li)
  ul.insertBefore(li, ul.firstChild)

  return this
}

/**
 * Selects an image.
 *
 * @param {Number} index
 * @return {Object} this
 * @api public
 */

Gallery.prototype.select = function (index) {
  var target = this.images[index]
  if (this.active) classes(this.active).remove('gallery-active')
  this.active = target
  classes(this.active).add('gallery-active')
  this.updatePreview()
  this.emit('select', target, index)
  return this
}

/**
 * Update preview image based on current active.
 *
 * @return {Object} this
 * @api private
 */

Gallery.prototype.updatePreview = function () {
  var img = document.createElement('img')
  img.src = this.active.src
  var preview = find(this.el, '.gallery-preview')
  preview.innerHTML = ''
  preview.appendChild(img)
  return this
}

/**
 * Image onclick handler.
 *
 * @param {Event} ev
 * @return {Boolean}
 * @api private
 */

Gallery.prototype.onclick = function (ev) {
  ev.preventDefault()
  ev.stopPropagation()
  var index = this.images.indexOf(ev.target)
  this.select(index)
  return false
}

/**
 * Render gallery view.
 *
 * @return {Object} this
 * @api public
 */

Gallery.prototype.render = function () {
  var self = this

  var html = require('./template')

  this.el = domify(html)[0]

  var fileInput = find(this.el, '.gallery-file-input')

  events.bind(fileInput, 'change', function () {
    self.emit('files', fileInput.files)
  })

  events.bind(find(this.el, '.gallery-ok'), 'click', function (ev) {
    self.change()
    self.emit('ok')
  })

  this.files.forEach(function (file) {
    self.add(file)
  })

  return this
}

/**
 * Show gallery. Lazily render if not already.
 *
 * @param {Element} el
 * @return {Object} this
 * @api public
 */

Gallery.prototype.show = function (el) {
  var self = this
  el = el || document.body
  if (!this.el) this.render()
  classes(this.el).remove('hide')
  el.appendChild(this.el)
  this.emit('show')
  return this
}

/**
 * Hide gallery.
 *
 * @return {Object} this
 * @api public
 */

Gallery.prototype.hide = function () {
  classes(this.el).add('hide')
  this.emit('hide')
  return this
}

/**
 * Selector utility.
 *
 * @param {Element} el
 * @param {String} sel
 * @return {NodeList}
 * @api private
 */

function find (el, sel) {
  return el.querySelectorAll(sel)[0]
}
