import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import jsPDF from 'jspdf';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

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

    doc.text('Name', nameX, 20);
    doc.text('Id', idX, 20);
    doc.text('Data', dataX, 20);

    
    let currentY = 30;

    this.content.forEach(item =>{
      doc.text(item.name, nameX, currentY);
      doc.text(item.id, idX, currentY);
      doc.text(item.data, dataX, currentY);

      currentY = currentY + advanceY;
    });

    doc.save('a4.pdf')
  }

}
