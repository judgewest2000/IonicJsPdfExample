import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import jsPDF from 'jspdf';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private domSanitizer: DomSanitizer) {

  }

  pdf: SafeResourceUrl;

  display() {
    return this.pdf !== undefined;
  }

  content: { name: string, id: string, data: string }[] = [
    { name: 'nikhill1', id: '1', data: 'temp1' },
    { name: 'nikhill2', id: '2', data: 'temp2' }
  ];

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
      let y = startY + (advanceY * index);
      doc.text(item.name, nameX, y);
      doc.text(item.id, idX, y);
      doc.text(item.data, dataX, y);
    });

    //doc.save('a4.pdf')
    this.pdf = this.domSanitizer.bypassSecurityTrustResourceUrl(doc.output('datauri'));


  }

}
