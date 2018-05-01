import Uploader from './uploader';

const form = document.getElementById('form');
const input = document.getElementById('files') as HTMLInputElement;

form.onsubmit = e => {
  e.preventDefault();
  const files: File[] = [];
  for (let i = 0; i < input.files.length; i++) {
    files.push(input.files[i]);
  }
  const uploader = new Uploader({
    target: 'http://localhost:3000/testupload',
    files,
    additData: [
      { key: 'login', value: 'boroda'}
    ]
  });
  uploader.on('progress', (event) => console.log(event));
  uploader.on('finish', () => console.log('finish'));
  uploader.start().then(() => console.log('SUCCESS'));
};
