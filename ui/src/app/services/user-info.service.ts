import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class UserInfoService {
  private lineOne = new ReplaySubject<string>();
  public lineOne$ = this.lineOne.asObservable();
  private lineTwo = new ReplaySubject<string>();
  public lineTwo$ = this.lineTwo.asObservable();
  private lineThree = new ReplaySubject<string>();
  public lineThree$ = this.lineThree.asObservable();
  private lineFour = new ReplaySubject<string>();
  public lineFour$ = this.lineFour.asObservable();
  private lineFive = new ReplaySubject<string>();
  public lineFive$ = this.lineFive.asObservable();
  private lineSix = new ReplaySubject<string>();
  public lineSix$ = this.lineSix.asObservable();
  private lineSeven = new ReplaySubject<string>();
  public lineSeven$ = this.lineSeven.asObservable();
  private lineEight = new ReplaySubject<string>();
  public lineEight$ = this.lineEight.asObservable();
  private lineNine = new ReplaySubject<string>();
  public lineNine$ = this.lineNine.asObservable();
  private lineTen = new ReplaySubject<string>();
  public lineTen$ = this.lineTen.asObservable();
  private lineEleven = new ReplaySubject<string>();
  public lineEleven$ = this.lineEleven.asObservable();
  private lineTwelve = new ReplaySubject<string>();
  public lineTwelve$ = this.lineTwelve.asObservable();
  private graduateSection = new ReplaySubject<boolean>();
  public graduateSection$ = this.graduateSection.asObservable();

  constructor() {}

  setLineOne(lineOne: string) {
    this.lineOne.next(lineOne);
  }

  setLineTwo(lineTwo: string) {
    this.lineTwo.next(lineTwo);
  }

  setLineThree(lineThree: string) {
    this.lineThree.next(lineThree);
  }

  setLineFour(lineFour: string) {
    this.lineFour.next(lineFour);
  }

  setLineFive(lineFive: string) {
    this.lineFive.next(lineFive);
  }

  setLineSix(lineSix: string) {
    this.lineSix.next(lineSix);
  }

  setLineSeven(lineSeven: string) {
    this.lineSeven.next(lineSeven);
  }

  setLineEight(lineEight: string) {
    this.lineEight.next(lineEight);
  }

  setLineNine(lineNine: string) {
    this.lineNine.next(lineNine);
  }
  setLineTen(lineTen: string) {
    this.lineTen.next(lineTen);
  }

  setLineEleven(lineEleven: string) {
    this.lineEleven.next(lineEleven);
  }

  setLineTwelve(lineTwelve: string) {
    this.lineTwelve.next(lineTwelve);
  }

  setGraduateSection(graduateSection: boolean) {
    this.graduateSection.next(graduateSection);
  }
}
