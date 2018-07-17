import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignOptionsComponent } from './design-options.component';

describe('DesignOptionsComponent', () => {
  let component: DesignOptionsComponent;
  let fixture: ComponentFixture<DesignOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
