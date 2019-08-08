import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ResponseHeadLines, Article } from '../../interfaces/interfaces';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {


  @Input() enFavoritos:boolean=false;
  @Input() articulos:Article[]=[];
  constructor() { }

  ngOnInit() {

   
  }

}
