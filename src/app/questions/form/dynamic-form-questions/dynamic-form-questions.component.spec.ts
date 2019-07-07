import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormQuestionsComponent } from './dynamic-form-questions.component';

describe('DynamicFormQuestionsComponent', () => {
  let component: DynamicFormQuestionsComponent;
  let fixture: ComponentFixture<DynamicFormQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
