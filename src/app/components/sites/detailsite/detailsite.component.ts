import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Site } from 'src/app/models/site.model';

@Component({
  selector: 'app-detailsite',
  templateUrl: './detailsite.component.html',
  styleUrls: ['./detailsite.component.css']
})
export class DetailsiteComponent implements OnInit {
   data:Site;
  constructor(private activateRoute: ActivatedRoute, private router:Router) { 
    this.activateRoute.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(atob(params.special));
        console.log(this.data);
      }
    });
  }

  ngOnInit(): void {
  }

  retour(){
      this.router.navigate(['sitelist']);
  }
}
