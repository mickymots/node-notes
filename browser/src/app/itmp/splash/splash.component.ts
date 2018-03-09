import { Component, OnInit } from '@angular/core';
import { Notification, NotificationService } from '@itmp/arch';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  public locations = [
    'Bath',
    'Belfast',
    'Birmingham',
    'Cardiff',
    'Edinburgh',
    'Glasgow',
    'Leeds',
    'Liverpool',
    'London',
    'Manchester',
    'Newcastle',
    'Nottingham'
  ];
  public roleSelectText: string = 'Start';

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {}

  selectRole() {
    let notification = new Notification(
      'Role Selected',
      'You have selected the "Child Benefit" role'
    );
    this.notificationService.notify(notification);
    this.roleSelectText = 'Change';
  }
}
