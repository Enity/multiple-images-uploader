# Multiple images uploader

Simple uploader for tons of images

## Features

- Multistream upload
- Stop/pause, resuming previous upload
- [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) & events support
- Configurable chunk size 

## Installing

```
npm install multiple-images-uploader
```

## Examples


```js
const filesToUpload = form.elements.files;

const uploader = new MultipleUploader({
  target: 'http://example.com/upload',
  files: filesToUpload
});

//Subscribe for progress
uploader.on('progress' (event) => console.log(event));
// will print {total: 51255, loaded: 12234, percent: '23%'}

uploader.start()
  .then(() => console.log('success!'));
  .catch((e) => console.log('e'));

// Also you can subsribe 
uploader.on('finish', () => ...);
uploader.on('error'), (error) => ...);
```
Constructor options argument
```js
{
  target: 'localhost'   // request target,
  files: files          // accept <FileList> type
  additData: [          // data to be sent with each part
    {
    key: 'login',
    value: 'boroda'
    }
  ]
  partSize: 5           // each part will contain n files. Default: 5
  streams: 2            // number of concurrent requests. Default: 1.
}
```


