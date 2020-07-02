import {Component, OnInit, ViewChild} from '@angular/core';
import {SiteService} from "../../../shared/services/site.service";
import {Site} from "../../../models/site.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import { Router, NavigationExtras } from '@angular/router';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-listsite',
  templateUrl: './listsite.component.html',
  styleUrls: ['./listsite.component.css']
})
export class ListsiteComponent implements OnInit {
 public sites:Site[];
 public recherchesites: Site[];
 public rowIndexArray:any[];
 public detail:number = 0;
 imageDetailList:AngularFireList<any>;
 value: any;
  public inters:MatTableDataSource<Site>;
  myControl = new FormControl();
  //options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  options:string[]=[
    'Kinshasa',
    'Bas-Uele',
    'Equateur',
    'Haut-Katanga',
    'Haut-Lomami',
    'Haut-Uele',
    'Ituri',
    'Kasaï',
    'Kasaï-Central',
    'Kasaï-Oriental',
    'Kongo-Central',
    'Kwango',
    'Kwilu',
    'Lomami',
    'Lualaba',
    'Mai-Ndombe',
    'Maniema',
    'Mongala',
    'Nord-Kivu',
    'Nord-Ubangi',
    'Sankuru',
    'Sud-Kivu',
    'Sud-Ubangi',
    'Tanganyika',
    'Tshopo',
    'Tshuapa'
  ];
  displayedColumns: string[] = ['code'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
 constructor(private service:SiteService, private route:Router,private firebase:AngularFireDatabase) { }

  ngOnInit(): void {
    this.getSite();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
 getSite(){
   this.service.imageDetailList.snapshotChanges().subscribe(
     list =>{
       this.recherchesites = this.sites = list.map(item=>{
         return item.payload.val();
       });

       this.rowIndexArray= Array.from(Array(Math.ceil(this.sites.length/3)).keys());
     }
   )
 }

 search(query:string){
  
  this.recherchesites= (query)? this.sites.filter(site=>site.content.province.toLowerCase().includes(query.toLowerCase())):this.sites;
  
 }
 plus(){
  this.detail = 1;
 }
  voirDetail(site:Site){
     let navigationExtra: NavigationExtras={
        queryParams:{
          special:btoa(JSON.stringify(site))
        }
     };
     this.route.navigate(['sitedetail'],navigationExtra);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
