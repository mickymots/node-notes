import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '@itmp/arch';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  constructor(public preferences: PreferencesService) {}

  ngOnInit() {
  }

}
