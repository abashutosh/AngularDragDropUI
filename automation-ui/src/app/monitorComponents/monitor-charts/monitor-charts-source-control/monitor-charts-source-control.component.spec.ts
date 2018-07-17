import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorChartsSourceControlComponent } from './monitor-charts-source-control.component';

describe('MonitorChartsBarComponent', () => {
  let component: MonitorChartsSourceControlComponent;
  let fixture: ComponentFixture<MonitorChartsSourceControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorChartsSourceControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorChartsSourceControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
