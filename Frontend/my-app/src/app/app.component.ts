import { UserServiceService } from './services/user-service.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  public users: Array<any>=[];
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
    private formBuilder:FormBuilder
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
      Dni: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]]      
    });
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
    this.form.reset();
  }
  getRows(row:any){
    this.activeUser = row    
    this.form.controls['Name'].setValue(row.Name)
    this.form.controls['Address'].setValue(row.Address)
    this.form.controls['Phone'].setValue(row.Phone)
    this.form.controls['Dni'].setValue(row.Dni)   
  }
}
