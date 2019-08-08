import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {


  @Input() noticia:Article;
  @Input() enFavoritos:boolean;
  @Input() index:string;
  constructor(
    private iab:InAppBrowser,
    private actionSheetController:ActionSheetController,
    private socialSharing: SocialSharing,
    private localData:DataLocalService,
    private plattform:Platform
    ) { }

  ngOnInit() {}




  abrirNoticia(){



    const browser = this.iab.create(this.noticia.url,'_system');

  }


  async abrirActionSheet() {

    console.log(this.enFavoritos);

    let button = {}

    if(!this.enFavoritos){
        button = {
          text: 'Favorito',
          icon: 'heart',
          handler: () => {
            console.log('Favorite clicked');
  
            this.localData.guardarNoticia(this.noticia);
          }
        };
    }else{
       button = {
        text: 'Eliminar Favorito',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');

          this.localData.eliminarNoticia(this.noticia);
        }
      }

    }

      let buttons = [ {
        text: 'Compartir',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');

        this.compartirNoticia();
      }
      }, button, 
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }];

      const actionSheet = await this.actionSheetController.create( {
        header: 'Opciones',
        buttons: buttons
      });

      await actionSheet.present();
    }


    compartirNoticia(){






      if(this.plattform.is('cordova')){

        this.socialSharing.share(this.noticia.title,this.noticia.source.name,'',this.noticia.url);
       

      }else{

        if (navigator['share']) {
          navigator['share']({
              title: this.noticia.title,
              text: this.noticia.description,
              url: this.noticia.url,
          })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
        }else{
          console.log('No se soporta compartir :(');
        }
        
      }
    }



  
}
