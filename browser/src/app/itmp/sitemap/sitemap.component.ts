import { Component, OnInit } from '@angular/core';
import { ModuleService } from '@itmp/arch';
import { routes } from '../itmp-routing.module';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.scss']
})
export class SitemapComponent implements OnInit {
  public routes;
  public moduleRoutes = [];

  constructor(private moduleService: ModuleService) {}

  ngOnInit() {
    this.getRoutes();
    this.routes = routes;
  }

  getRoutes() {
    this.moduleService.modulesAnnounced$.subscribe(res => {
      this.moduleRoutes.push(res.routes);
    });
  }
}
