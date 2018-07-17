import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignJsonComponent } from './design-json.component';

describe('DesignJsonComponent', () => {
  let component: DesignJsonComponent;
  let fixture: ComponentFixture<DesignJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
