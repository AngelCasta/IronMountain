import { UserServiceService } from './services/user-service.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  public users: Array<any>=[]
  public modalParams={title:'',btn1:'',btn2:'',btn3:''}
  filterUser = ''
  form: FormGroup;
  private activeUser={
    Id:0,
    Name:'',
    Address:'',
    Phone:'',
    Dni:'',
    CreationDate:''
  };
  constructor(
    private userService:UserServiceService,
    private formBuilder:FormBuilder,
    private modalService:NgbModal
  ){
    this.buildForm();
    this.updateTableData()
  }
  updateTableData(){
    this.userService.getUsers().subscribe((resp:any)=>{      
      this.users=resp.items
    })
  }
  private buildForm(){
    this.form = this.formBuilder.group({
      Name: ['',  [Validators.required, Validators.minLength(4),Validators.maxLength(40)]],
      Address: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(110)]],
      Phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      Dni: ['', [
        Validators.required, 
        Validators.minLength(18),
        Validators.maxLength(18),
        Validators.pattern(
          "^[A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]$"
          )
        ]]      
    });
  }
  
  showMessage(modal:any){
    this.modalParams.title = 'Nuevo Usuario'
    this.modalParams.btn1 = 'Guardar'
    this.modalParams.btn2 = 'Cancelar'
    this.modalParams.btn3 = 'Limpiar'
    this.modalService.open(modal,{backdrop:'static',centered:true})
  }
  showMessageEdit(modal:any){
    this.modalParams.title = 'Edición de Usuario'
    this.modalParams.btn1 = 'Editar'
    this.modalParams.btn2 = 'Eliminar'
    this.modalParams.btn3 = 'Cancelar'
    this.modalService.open(modal,{backdrop:'static',centered:true})
  }
  closeMessage(modal:any){
    if(this.activeUser.Id == 0){
      this.modalService.dismissAll(modal)
      this.resetForm()
    }else{
      this.deleteUser()
    }
    
  }
  save(event: Event) {
    event.preventDefault()
    if(this.form.valid){
      const value = this.form.value
      if(this.activeUser.Id == 0){        
        this.userService.postUsers(value).toPromise().then((resp:any) =>{          
          this.updateTableData()
        }) 
        this.resetForm()       
      }else{
        this.activeUser.Name = value.Name
        this.activeUser.Address = value.Address
        this.activeUser.Phone = value.Phone
        this.activeUser.Dni = value.Dni
        this.userService.updateUser(this.activeUser).toPromise().then((resp:any) =>{
          this.updateTableData()
        })
        this.resetForm()
        this.activeUser.Id = 0
      }      
    }   
  }
  deleteValidator(){
    return this.activeUser.Id == 0
  }
  deleteUser(){
    if(this.activeUser.Id != 0) this.userService.deleteUser(this.activeUser).toPromise().then((resp:any)=>{
      this.updateTableData()
    })
    this.resetForm()
  }
  resetForm(){
    if(this.activeUser.Id == 0){
      this.form.reset();
    }else{
      this.modalService.dismissAll()
    }    
  }
  getRows(row:any,modal:any){
    this.activeUser = row    
    this.form.controls['Name'].setValue(row.Name)
    this.form.controls['Address'].setValue(row.Address)
    this.form.controls['Phone'].setValue(row.Phone)
    this.form.controls['Dni'].setValue(row.Dni)   
    this.showMessageEdit(modal)
  }
}
