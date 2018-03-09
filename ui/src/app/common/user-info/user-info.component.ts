import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../services/user-info.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  public lineOne: any;
  public lineTwo: any;
  public lineThree: any;
  public lineFour: any;
  public lineFive: any;
  public lineSix: any;
  public lineSeven: any;
  public lineEight: any;
  public lineNine: any;
  public lineTen: any;
  public lineEleven: any;
  public lineTwelve: any;
  public graduateSection: any;

  constructor(private userInfoService: UserInfoService) {}

  ngOnInit() {
    this.lineOne = this.userInfoService.lineOne$;
    this.lineTwo = this.userInfoService.lineTwo$;
    this.lineThree = this.userInfoService.lineThree$;
    this.lineFour = this.userInfoService.lineFour$;
    this.lineFive = this.userInfoService.lineFive$;
    this.lineSix = this.userInfoService.lineSix$;
    this.lineSeven = this.userInfoService.lineSeven$;
    this.lineEight = this.userInfoService.lineEight$;
    this.lineNine = this.userInfoService.lineNine$;
    this.lineTen = this.userInfoService.lineTen$;
    this.lineEleven = this.userInfoService.lineEleven$;
    this.lineTwelve = this.userInfoService.lineTwelve$;
    this.userInfoService.graduateSection$.subscribe(res => {
      this.graduateSection = res;
    });
  }
}
