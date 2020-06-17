import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreersiteComponent } from './creersite.component';

describe('CreersiteComponent', () => {
  let component: CreersiteComponent;
  let fixture: ComponentFixture<CreersiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreersiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreersiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
