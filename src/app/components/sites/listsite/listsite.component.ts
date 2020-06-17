import {Component, OnInit, ViewChild} from '@angular/core';
import {SiteService} from "../../../shared/services/site.service";
import {Site} from "../../../models/site.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import { Router, NavigationExtras } from '@angular/router';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";

@Component({
  selector: 'app-listsite',
  templateUrl: './listsite.component.html',
  styleUrls: ['./listsite.component.css']
})
export class ListsiteComponent implements OnInit {
 public sites:Site[];
 public recherchesites: Site[];
 public rowIndexArray:any[];
 imageDetailList:AngularFireList<any>;
 value: any;
  public inters:MatTableDataSource<Site>;

  options:string[]=['Kinshasa','Kongo central','Mongala','Tshuapa'];
  displayedColumns: string[] = ['code'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
 constructor(private service:SiteService, private route:Router,private firebase:AngularFireDatabase) { }

  ngOnInit(): void {
    this.getSite();
    
  }
 getSite(){
   this.service.imageDetailList.snapshotChanges().subscribe(
     list =>{
       this.recherchesites = this.sites = list.map(item=>{
         return item.payload.val();
       });

       console.log(this.recherchesites);
       this.rowIndexArray= Array.from(Array(Math.ceil(this.sites.length/3)).keys());
     }
   )
 }
 search(query:string){
  
  this.recherchesites= (query)? this.sites.filter(site=>site.content.province.toLowerCase().includes(query.toLowerCase())):this.sites;
    console.log(query);
 }

  applyFilter(province:string) {
    this.service.getByProvince(province).snapshotChanges().subscribe(
      list =>{
        this.sites = list.map(item=>{
          return item.payload.val();
        });
 
        this.inters= new MatTableDataSource(this.sites);
        this.inters.paginator = this.paginator;
        console.log(this.sites);
        this.rowIndexArray= Array.from(Array(Math.ceil(this.sites.length/3)).keys());
      }
    )
  }

  closeCherche() {
    this.value='';
    this.getSite();
    
  }

  voirDetail(site:Site){
     let navigationExtra: NavigationExtras={
        queryParams:{
          special:btoa(JSON.stringify(site))
        }
     };
     this.route.navigate(['sitedetail'],navigationExtra);
  }
}
