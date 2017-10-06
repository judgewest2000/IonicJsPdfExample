import { SplashScreen } from '@ionic-native/splash-screen';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { File } from '@ionic-native/file';

import jsPDF from 'jspdf';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private file: File) {

  }

  pdf: '';

  display() {
    return this.pdf !== undefined;
  }

  content: { name: string, id: string, data: string }[] = [
    { name: 'nikhill1', id: '1', data: 'temp1' },
    { name: 'nikhill2', id: '2', data: 'temp2' }
  ];

  b64toBlob = (b64Data, contentType, sliceSize?) => {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  createPdf() {
    const doc = new jsPDF()
    doc.text('Hello world!', 10, 10)

    const nameX = 10;
    const idX = 40;
    const dataX = 70;
    const advanceY = 10;
    const startY = 30;

    doc.text('Name', nameX, 20);
    doc.text('Id', idX, 20);
    doc.text('Data', dataX, 20);

    this.content.forEach((item, index) => {
      const y = startY + (advanceY * index);
      doc.text(item.name, nameX, y);
      doc.text(item.id, idX, y);
      doc.text(item.data, dataX, y);
    });

    const base64 = (doc.output('datauri') as string).split(',')[1];

    const blob = this.b64toBlob(base64, 'application/pdf');

    const filename = `tester${Math.floor(Math.random() * 1000000)}.pdf`;

    const dir = this.file.cacheDirectory

    this.file.writeFile(dir, filename, blob)
      .then(res => {
        alert(`Written ${filename} to ${dir}`);
        console.log(res);
      });

  }

}
