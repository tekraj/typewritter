import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterDzComponent } from './typewriter-dz.component';

describe('TypewriterDzComponent', () => {
  let component: TypewriterDzComponent;
  let fixture: ComponentFixture<TypewriterDzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypewriterDzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypewriterDzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
