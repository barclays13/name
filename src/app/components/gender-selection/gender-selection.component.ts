import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Gender } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gender-selection',
  templateUrl: './gender-selection.component.html',
  styleUrl: './gender-selection.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class GenderSelectionComponent implements OnInit {
  public currentGender: Gender = Gender.Boy;
  constructor(private router: Router) { }

  ngOnInit(): void {
    const gender = localStorage.getItem('gender');

    if(gender) {
      this.currentGender = JSON.parse(gender);
    }
  }

  public stateOptions: any[] = [
    { label: 'Мальчик', value: Gender.Boy },
    { label: 'Девочка', value: Gender.Girl, disabled: true }
  ];

  public onNext(): void {
    localStorage.setItem('gender', JSON.stringify(this.currentGender));
    this.router.navigate(['/data-entry']);
  }
}
