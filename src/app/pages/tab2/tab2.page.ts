import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { IonSegment, IonInfiniteScroll } from '@ionic/angular';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{


  @ViewChild (IonSegment) segmento:IonSegment;
  @ViewChild (IonInfiniteScroll) scroll:IonInfiniteScroll;
  categorias:string[]=['business', 'entertainment', 'general' ,'health', 'science' ,'sports', 'technology']

  noticias:Article[]=[];
  
  
  constructor(private noticiaService:NoticiasService){

  }

  ngOnInit(){

    this.segmento.value=this.categorias[0];
    this.cargarNoticias(this.categorias[0]);
  }

  cambiarCategoriaNoticia(segmentEvent){
    this.noticias=[];
    this.scroll.disabled=false;

    const categoria = segmentEvent.detail.value;

    console.log(categoria);

    this.cargarNoticias(categoria);

  }

  loadData(event){

      const categoria = this.segmento.value;
      this.cargarNoticias(categoria,event);


  }




  private cargarNoticias(categoria:string,event?){


    this.noticiaService.getTopHeadLinesByCotegory(categoria).subscribe(response=>{

      console.log(response);
      if (response.articles.length===0) {
       
     
        this.noticiaService.presentToast('No hay más noticias...');
        event.target.disabled=true;
        return;
      }

      if(event)
        event.target.complete();

      this.noticias.push(...response.articles);
    }); 


  }
}
