import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {


  articulos :Article[]=[];
  constructor(private noticiasService:NoticiasService,
    private toastCtrl:ToastController){


  }

  ngOnInit(){
    this.cargarTopNoticias();



  }


  loadData(event){

       
        this.cargarTopNoticias(event);


  }


  private cargarTopNoticias(event?){

    
    this.noticiasService.getTopHeadLines().subscribe(response=>{



      console.log(response);
      if (response.articles.length===0) {
       
     
        this.presentToast('No hay más noticias...');
        event.target.disabled=true;
        return;
      }

      if(event)
        event.target.complete();


      this.articulos.push(...response.articles);
    });

  }



  private async presentToast(mensaje:string) {
    const toast = await this.toastCtrl.create({
      message:mensaje,
      duration: 2000
    });
    toast.present();
  }
}
