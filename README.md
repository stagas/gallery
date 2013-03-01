
# gallery

The UI piece for a potential gallery image selector/uploader.

The test implements one with [component/upload](https://github.com/component/upload) and an express backend to get you started.

## Installing

`component-install stagas/gallery`

## API

  - [Gallery()](#gallery)
  - [Gallery.set()](#gallerysetpathstringfilesarray)
  - [Gallery.add()](#galleryaddfilestring)
  - [Gallery.select()](#galleryselectindexnumber)
  - [Gallery.show()](#galleryshowelelement)
  - [Gallery.hide()](#galleryhide)

### Gallery()

  Gallery class.

### Gallery.set(path:String, files:Array)

  Set path and files.

### Gallery.add(file:String)

  Add image `file` to collection.

### Gallery.select(index:Number)

  Selects an image.

### Gallery.show(el:Element)

  Show gallery. Lazily render if not already.

### Gallery.hide()

  Hide gallery.

## License

MIT
