import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumForLessionComponent } from './album-for-lession.component';

describe('AlbumForLessionComponent', () => {
  let component: AlbumForLessionComponent;
  let fixture: ComponentFixture<AlbumForLessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumForLessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumForLessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
