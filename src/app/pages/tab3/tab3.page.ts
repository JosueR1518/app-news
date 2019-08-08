import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnDestroy {


constructor(public dataLocal:DataLocalService){

}



 ngOnDestroy(){
 }
  
}
