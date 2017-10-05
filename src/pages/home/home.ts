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


  createPdf(){
    const doc = new jsPDF()
    
    doc.text('Hello world!', 10, 10)
    doc.save('a4.pdf')
  }

}
