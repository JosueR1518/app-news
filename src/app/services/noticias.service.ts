import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseHeadLines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';
import { ToastController } from '@ionic/angular';


const apiKey:string=environment.apiKey;
const baseUrl:string = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-key':apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  topHeadLines:number=0;
  pageIndex:number=0; 
  categoriaActual:string='';


  constructor(private http:HttpClient, private toastCtrl:ToastController) { }



  getTopHeadLines(){
    this.topHeadLines++;



     return this.ejecutarQuery<ResponseHeadLines>(`/top-headlines?country=us&page=${this.topHeadLines}`);
  }

  getTopHeadLinesByCotegory(categoria:string){


      if(this.categoriaActual !== categoria){
        this.categoriaActual = categoria;
        this.pageIndex =0;
      }
      this.pageIndex++; 

    return this.ejecutarQuery<ResponseHeadLines>(`/top-headlines?category=${categoria}&country=us&page=${this.pageIndex}`)

  }


  private ejecutarQuery<T>(query:string){

    query = baseUrl + query;
    return this.http.get<T>(query,{headers});
  

  }



  async presentToast(mensaje:string) {
    const toast = await this.toastCtrl.create({
      message:mensaje,
      duration: 2000
    });
    toast.present();
  }
}
