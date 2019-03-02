import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeAuthenticationComponent } from './code-authentication.component';

describe('CodeAuthenticationComponent', () => {
  let component: CodeAuthenticationComponent;
  let fixture: ComponentFixture<CodeAuthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeAuthenticationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
