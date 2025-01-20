import { Component, OnInit } from '@angular/core';
import { MainData, Status } from '../../models';
import { MainService } from '../../services';
import { take } from 'rxjs';

@Component({
  selector: 'app-female',
  templateUrl: './female.component.html',
  styleUrl: './female.component.scss'
})
export class FemaleComponent implements OnInit {
  public defaultNameList: MainData[] = [];
  public nameSelected: MainData[] = [];
  public beforeList: MainData[] = [];
  public afterList: MainData[] = [];

  public data: any;

  public options: MainData[] = [];

  public round: number = 0;
  public status = Status;
  public currectStatus: Status = Status.Main;

  public firstSName: string = '';
  public thirdName: string = '';
  public sonsName: string = '';
  public daughtersName: string = '';


  public count: number = 1;
  public allCountStep: number = 1;

  constructor(private readonly mainService: MainService) {}

  ngOnInit(): void {
    // @ts-ignore
    this.data = JSON.parse(localStorage.getItem('girlData'));
    this.mainService
      .getData(false)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.defaultNameList = this.nameSelected = data;
          this.onStart();
        },
        error: () => {}
      });
  }

  public onStart(): void {
    this.round += 1;
    this.currectStatus = Status.Main;
    this.beforeList = this.shuffle(this.nameSelected);
  }

  public onChoose(): void {
    this.afterList = [];
    this.currectStatus = Status.Selection;
    this.count = 1;
    this.allCountStep = Math.floor(this.beforeList.length / 2);
    this.prepareOptions();
  }

  public onSelectName(item: MainData): void {
    this.afterList.push(item);
    if (this.beforeList.length) {
      this.count += 1;
      this.prepareOptions();
    } else {
      if (this.afterList.length === 1) {
        this.currectStatus = Status.Result;
      } else {
        this.round += 1;
        this.currectStatus = Status.Main;
        this.beforeList = this.shuffle(this.afterList);
        this.afterList = [];
      }
    }
  }

  public get getInvalidName(): MainData[] {
    return this.xor(this.nameSelected, this.beforeList);
  }

  private prepareOptions(): void {
    if (this.beforeList.length > 3) {
      this.options = this.beforeList.slice(0, 2);
      this.beforeList.splice(0, 2);
    } else {
      this.options = this.beforeList;
      this.beforeList = [];
    }
  }

  private shuffle(array: any[]) {
    let shuffledArray = array.slice(); // Создаем копию массива
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  private xor(...arrays: any[]) {
    const allItems = arrays.reduce((acc, array) => acc.concat(array), []);
    const itemCounts = allItems.reduce((count: any, item: any) => {
      count[item] = (count[item] || 0) + 1;
      return count;
    }, {});
    return allItems.filter((item: any) => itemCounts[item] === 1);
  }

  public getValue(e: any): any {
    return e.target.value;
  }
}
