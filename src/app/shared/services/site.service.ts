import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class SiteService {
 imageDetailList:AngularFireList<any>;
 imageDetailP:AngularFireList<any>;
  constructor(private firebase:AngularFireDatabase) {
    this.imageDetailList = this.firebase.list('/site');
  }

  getImageDetailList(){
    this.imageDetailList = this.firebase.list('imageDetails');
  }
  getByProvince(p:string):AngularFireList<any>{
    console.log(p)
    this.imageDetailP = this.firebase.list('/site',
    ref => ref.equalTo(p));
    return this.imageDetailP;
  }
  inserImageDetails(imageDatails){
    console.log(imageDatails);
    this.imageDetailList.push({content:imageDatails});
  }
}
