import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterSpComponent } from './typewriter-sp.component';

describe('TypewriterSpComponent', () => {
  let component: TypewriterSpComponent;
  let fixture: ComponentFixture<TypewriterSpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypewriterSpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterSpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
