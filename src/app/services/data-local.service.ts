import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias:Article[]=[];
  constructor(private storage: Storage,private toastCtrl:ToastController) {

    this.obternerFavoritos();
   }




  guardarNoticia(noticia:Article){

    const existe = this.noticias.find(noti=>noti.title===noticia.title);
    if(!existe){
          this.noticias.unshift(noticia);
          this.guardarStore();
          this.showMessage('Noticia agregada a favoritos');
    }


  }

  eliminarNoticia(noticia:Article){

 
          this.noticias= this.noticias.filter(item => item.title !== noticia.title);
          this.guardarStore();
          this.showMessage('Noticia eliminada de favoitos!');


  }


  async obternerFavoritos(){

   const favoritos = await  this.storage.get('favoritos');


   if(favoritos){
     this.noticias= favoritos;
   }
  }





  private guardarStore(){
    this.storage.set('favoritos',this.noticias);
  }




  async showMessage(mensaje:string) {
    const toast = await this.toastCtrl.create({
      message:mensaje,
      duration: 2000
    });
    toast.present();
  }
}
