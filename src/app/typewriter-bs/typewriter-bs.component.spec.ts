import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterBsComponent } from './typewriter-bs.component';

describe('TypewriterBsComponent', () => {
  let component: TypewriterBsComponent;
  let fixture: ComponentFixture<TypewriterBsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypewriterBsComponent ]
    })
    .compileComponents();
  }));
  

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterBsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
