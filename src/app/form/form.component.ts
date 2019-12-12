import { Component, OnInit } from '@angular/core';
import { Form } from './models/form.model';
import { Option } from './models/option.model';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent implements OnInit {
    public form: Form;    
    public autor_list: Option[];
    public category_list: Option[];
    public update: Boolean;
    public book_id: Number;
    
    constructor(private router: Router, private route: ActivatedRoute) { }

    public ngOnInit() {
      debugger;     
      if(this.route.snapshot.paramMap.get("id") != null){
        this.update = true;
        this.book_id = parseInt(this.route.snapshot.paramMap.get("id"));
        fetch('http://localhost:2000/book/?id='+this.route.snapshot.paramMap.get("id"), {
            method: 'GET'        
          })
         .then((result) => {
           if(result.status === 200){
             return result.json();
           }else if(result.status === 401){
             console.log('Error en servicio');
           }
          }).then((jsonResult) => {
            var lst: Form;
            jsonResult.map(p => {          
              lst = {
                name: p.Nombre,
                description: p.Descripcion,
                autor_id: p.AutorId,
                category_id: p.CategoriaId,
                ISBN: p.ISBN       
              };              
            });   
            this.form = lst;     
            console.log(jsonResult);
          }).catch((error)=>{
            console.log(error);
          });
      }else{
        this.update = false;
        this.form = {
          name: '',
          description: '',
          autor_id: 0,
          category_id: 0,
          ISBN: ''        
        }; 
      }       
      
      fetch('http://localhost:2000/autor/', {
        method: 'GET'        
      })
     .then((result) => {
       if(result.status === 200){
         return result.json();
       }else if(result.status === 401){
         console.log('Error en servicio');
       }
      }).then((jsonResult) => {
        var lst = [];
        jsonResult.map(p => {          
          var book_item = {id: p.IdAutor, description: p.Nombre};
          lst.push(book_item);
        });
        this.autor_list = lst;
        console.log(jsonResult);
      }).catch((error)=>{
        console.log(error);
      });

      fetch('http://localhost:2000/category/', {
        method: 'GET'        
      })
     .then((result) => {
       if(result.status === 200){
         return result.json();
       }else if(result.status === 401){
         console.log('Error en servicio');
       }
      }).then((jsonResult) => {
        var lst = [];
        jsonResult.map(p => {          
          var book_item = {id: p.IdCategoria, description: p.Nombre};
          lst.push(book_item);
        });
        this.category_list = lst;
        console.log(jsonResult);
      }).catch((error)=>{
        console.log(error);
      });                 
    }

    public saveBook() {   
      var header = { 'Accept': 'application/json',
                   'Content-Type':'application/json'                   
                  }; 
      if(this.update){
        var current_date = new Date();
        var request = { 'Id': this.book_id.toString(), 'Nombre': this.form.name, 'Descripcion': this.form.description, 'IdAutor': this.form.autor_id,
                        'IdCategoria': this.form.category_id, 'ISBN': this.form.ISBN, 'FechaCreacion': current_date};
        fetch('http://localhost:2000/book/', {
          method: 'PUT',
          headers: header,
          body: JSON.stringify(request)        
        })
       .then((result) => {
         if(result.status === 200){
           return result.json();
         }else if(result.status === 401){
           console.log('Error en servicio');
         }
        }).then((jsonResult) => {        
          console.log(jsonResult);
        }).catch((error)=>{
          console.log(error);
        }); 
      }else{
        var current_date = new Date();
        var request_insert = { 'Nombre': this.form.name, 'Descripcion': this.form.description, 'IdAutor': this.form.autor_id,
                        'IdCategoria': this.form.category_id, 'ISBN': this.form.ISBN, 'FechaCreacion': current_date};
        fetch('http://localhost:2000/book/', {
          method: 'POST',
          headers: header,
          body: JSON.stringify(request_insert)        
        })
       .then((result) => {
         if(result.status === 200){
           return result.json();
         }else if(result.status === 401){
           console.log('Error en servicio');
         }
        }).then((jsonResult) => {        
          console.log(jsonResult);
        }).catch((error)=>{
          console.log(error);
        }); 
      }        
    }

    public Back(){
      this.router.navigate(['/book'])    
    }
}
