import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultQuestionsComponent } from './default-questions.component';

describe('DefaultQuestionsComponent', () => {
  let component: DefaultQuestionsComponent;
  let fixture: ComponentFixture<DefaultQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
