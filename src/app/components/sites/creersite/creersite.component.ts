import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import validate = WebAssembly.validate;
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {SiteService} from "../../../shared/services/site.service";

@Component({
  selector: 'app-creersite',
  templateUrl: './creersite.component.html',
  styleUrls: ['./creersite.component.css']
})
export class CreersiteComponent implements OnInit {
  imgSrc:string;
  selectedImage: any = null;
  isSubmitted:boolean;
  formtemplate = new FormGroup({
    id: new FormControl(),
    nom: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    img: new FormControl('',Validators.required),
    province: new FormControl('', Validators.required),
    cat: new FormControl('', Validators.required),
    telephone: new FormControl('',Validators.required),
    email: new FormControl(),
    site: new FormControl(),
    horaire: new FormControl('', Validators.required),
    adresse: new FormControl('', Validators.required),
    presentation: new FormControl()
  })
  constructor(private storage: AngularFireStorage, private  service: SiteService) { }

  ngOnInit(): void {
    this.ressetForm();
  }

  showPreview(event: any) {
    if(event.target.files && event.target.files[0]){
       const reader = new FileReader();
       reader.onload=(e:any)=>this.imgSrc=e.target.result;
       reader.readAsDataURL(event.target.files[0]);
       this.selectedImage = event.target.files[0];
    }
    else {
       this.imgSrc='/assets/img/fleur.jpg';
       this.selectedImage = null;
    }
  }
  
  onSubmit(formValue) {
     this.isSubmitted= true;
     if(this.formtemplate.valid){
       var filePath = `images/${this.selectedImage.name}_${new Date().getTime()}`;
       const  fileRef = this.storage.ref(filePath);
       this.storage.upload(filePath,this.selectedImage).snapshotChanges()
          .pipe(
             finalize(()=>{
               fileRef.getDownloadURL().subscribe((url)=>{
                  formValue['img'] = url;
                  formValue['id'] = formValue['nom']+new Date().getTime();
                  this.service.inserImageDetails(formValue);
                  this.ressetForm();
               })
             })
          ).subscribe();
     }
  }
  get formControls(){
     return this.formtemplate['controls'];
  }
  ressetForm(){
     this.formtemplate.reset();
     this.formtemplate.setValue({
      id:'',
      nom:'',
       description:'',
       img:'',
       province:'',
       cat:'',
       telephone:'',
       email:'',
       site:'',
       horaire:'',
       adresse:'',
       presentation:''
     });
     this.imgSrc='/assets/img/fleur.jpg';
     this.selectedImage= null;
     this.isSubmitted= false;
  }
}
