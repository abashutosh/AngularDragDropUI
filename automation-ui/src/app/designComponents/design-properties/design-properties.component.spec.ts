import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignPropertiesComponent } from './design-properties.component';

describe('DesignPropertiesComponent', () => {
  let component: DesignPropertiesComponent;
  let fixture: ComponentFixture<DesignPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
