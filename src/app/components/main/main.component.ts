import { Component } from '@angular/core';
import { MainService } from '../../services';
import { take } from 'rxjs';
import { Gender, MainData, Status } from '../../models';
import xor from 'lodash/xor';
import shuffle from 'lodash/shuffle';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  public defaultNameList: MainData[] = [];
  public nameSelected: MainData[] = [];
  public beforeList: MainData[] = [];
  public afterList: MainData[] = [];
  public options: MainData[] = [];

  public round: number = 0;
  public status = Status;
  public currectStatus: Status = Status.Start;

  public firstSName: string = '';
  public firstDName: string = '';
  public thirdName: string = '';
  public sonsName: string = '';
  public daughtersName: string = '';
  public stateOptions: any[] = [
    { label: 'Мальчик', value: Gender.Boy, disabled: true },
    { label: 'Девочка', value: Gender.Girl, disabled: true }
  ];

  public currentGender: Gender = Gender.Boy;
  public genderEnum = Gender;
  public count: number = 1;
  public allCountStep: number = 1;

  constructor(private readonly mainService: MainService) {}

  ngOnInit(): void {
    this.mainService
      .getData(false)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.defaultNameList = this.nameSelected = data;
        },
        error: () => {}
      });
  }

  public onStart(): void {
    this.round += 1;
    this.currectStatus = Status.Main;
    this.beforeList = shuffle(this.nameSelected);
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
        this.beforeList = shuffle(this.afterList);
        this.afterList = [];
      }
    }
  }

  public get isInvalidStart(): boolean {
    return !this.nameSelected.length || !this.firstSName || !this.daughtersName || !this.sonsName || !this.thirdName;
  }

  public get getInvalidName(): MainData[] {
    return xor(this.nameSelected, this.beforeList);
  }

  public onSetRandomBoyName(): void {
    const namesMale = [
      'Александр',
      'Дмитрий',
      'Сергей',
      'Андрей',
      'Михаил',
      'Иван',
      'Юрий',
      'Владимир',
      'Николай',
      'Павел',
      'Виктор',
      'Артем',
      'Максим',
      'Валентин',
      'Геннадий',
      'Олег',
      'Игорь',
      'Василий',
      'Станислав',
      'Григорий'
    ];

    this.sonsName = namesMale[Math.floor(Math.random() * namesMale.length)];
  }

  public onSetRandomGirleName(): void {
    const names = [
      'Анна',
      'Екатерина',
      'Ольга',
      'Мария',
      'Татьяна',
      'Ирина',
      'Наталья',
      'Светлана',
      'Юлия',
      'Елена',
      'Валентина',
      'Александра',
      'Виктория',
      'Надежда',
      'Любовь',
      'Марина',
      'Галина',
      'Дарья',
      'Евгения',
      'Антонина'
    ];

    this.daughtersName = names[Math.floor(Math.random() * names.length)];
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

  public getValue(e: any): any {
    return e.target.value;
  }
}
