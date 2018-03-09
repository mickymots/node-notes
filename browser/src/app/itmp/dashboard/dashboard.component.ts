import { Component, OnInit } from '@angular/core';
import { ModuleService, MODULE_TYPE } from '@itmp/arch';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public modules: any = [];

  constructor(private moduleService: ModuleService) {}

  ngOnInit() {
    this.getModules();
  }

  getModules() {
    this.moduleService.modulesAnnounced$.subscribe(res => {
      if (res.moduleType === MODULE_TYPE.APPLICATION) {
        this.modules.push(res);
      }
    });
  }
}
