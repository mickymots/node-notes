import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@itmp/arch';
import { MessageService } from '@itmp/arch';
import { ModuleService } from '@itmp/arch';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppStore } from '@itmp/arch';
import { NotificationService } from '@itmp/arch';
import { Notification } from '@itmp/arch';
import { Http, Response } from '@angular/http';
import { LoginTable } from './login-table';
import { environment } from '@itmp/arch';

/**
 * This component implements stub authentication mechanism for non-production environments.
 * A login page with a User ID list to choose is displayed to the user. 
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'  
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public valid: boolean = false;
  public message: string;
  public errorMessage: string;  
  public standard_data: LoginTable[];
  public sba_data: LoginTable[];

 constructor(
    private http: Http,
    private fb: FormBuilder,
    public authService: AuthService,
    private notificationService: NotificationService,
    private messageService: MessageService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.setMessage();
    this.constructTable();    
  }

  buildForm() {
    this.loginForm = this.fb.group({ 
      'uid': ['', Validators.required]
    });
    this.valid = true;
  }

  setMessage() {
    this.message = (this.authService.getAuthStatus())
      ? 'You are logged-in. Click logout below to exit.'
      : 'You are not logged-in. Enter a User ID from above to log in.';
  }

  constructTable() {   
    //Extract JSON data for Standard Login table
    this.getStdLogin()
      .subscribe(res=> {
        this.standard_data = res
      });

    //Extract JSON data for SBA Login table
    this.getSbaLogin()
      .subscribe(res=> {
        this.sba_data = res        
      });
  }  

  getStdLogin(): Observable<LoginTable[]> {
    return this.http.get('./assets/data/standard-login.json')     
      .map((res: Response) => {
        let body = res.json();
        return body.data || {}
      });
  }

  getSbaLogin(): Observable<LoginTable[]>{       
    return this.http.get('./assets/data/sba-login.json')   
      .map((res: Response) => {
        let body = res.json();
        return body.data || {}
      });
  }

  submitForm(loginForm) {

    let isValidID: boolean;
    this.http.get('./assets/data/validate-userID.json')
      .subscribe ((result)=> {
        isValidID = this.validateID(result, this.loginForm.get('uid').value)

        if (!isValidID){
          this.errorMessage = "UserID entered is not Valid";
        }          
        else{
            this.errorMessage = "";            
            this.authService.logIn(this.loginForm.get('uid').value);
            this.notifyUser();
        } 
      })
  }

  validateID(result: any, _userID: any): boolean{
    let match: boolean = false;
    let userArr: Array<any> = [];
    userArr = result.json().data;   

    for (let index in userArr){
      if (_userID == userArr[index].userID){
        match = true;
      }
    }    
    return match;
  }

  notifyUser() {
    let notification = new Notification('Success', 'You have successfully logged in');
    this.notificationService.notify(notification);
  }

}