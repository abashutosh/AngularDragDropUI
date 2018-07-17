import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorChartsBuildComponent } from './monitor-charts-build.component';

describe('MonitorChartsBarComponent', () => {
  let component: MonitorChartsBuildComponent;
  let fixture: ComponentFixture<MonitorChartsBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorChartsBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorChartsBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

