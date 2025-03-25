import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Gender } from '../../models';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrl: './data-entry.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DataEntryComponent implements OnInit {
  public form!: FormGroup;
  public firstSName: string = '';
  public thirdName: string = '';
  public sonsName: string = '';
  public daughtersName: string = '';

  public currentGender: any;
  public gender = Gender;
  public nameData: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const gender = localStorage.getItem('gender');
    const data = localStorage.getItem('gender');

    if (gender) {
      this.currentGender = JSON.parse(gender);
    }

    if(data) {
      this.nameData = JSON.parse(data);
    }


    this.form = new FormGroup({
      firstName: new FormControl(this.nameData?.firstName ?? '', Validators.required),
      thirdName: new FormControl(this.nameData?.thirdName ?? '', Validators.required),
      sonsName: new FormControl(this.nameData?.sonsName ?? '', this.currentGender === Gender.Boy ? Validators.required : null),
      daughtersName: new FormControl(this.nameData?.daughtersName ?? '', this.currentGender === Gender.Boy ? Validators.required : null),
    })
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

    this.form.get('sonsName')?.setValue(namesMale[Math.floor(Math.random() * namesMale.length)]);
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

    this.form.get('daughtersName')?.setValue(names[Math.floor(Math.random() * names.length)]);
  }

  public onBack(): void {
    this.router.navigate(['/gender-selection']);
  }

  public onNext(): void {
    if (this.currentGender === Gender.Girl)  {
      localStorage.setItem('girlData', JSON.stringify(this.form.value));
      this.router.navigate(['girl']);
    } else {
      localStorage.setItem('boyData', JSON.stringify(this.form.value));
      this.router.navigate(['boy']);
    }
  }
}
