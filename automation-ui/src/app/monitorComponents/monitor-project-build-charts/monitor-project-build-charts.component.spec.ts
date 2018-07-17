import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorProjectBuildChartComponent } from './monitor-project-build-charts.component';

describe('MonitorProjectSourceControlChartsComponent', () => {
  let component: MonitorProjectBuildChartComponent;
  let fixture: ComponentFixture<MonitorProjectBuildChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorProjectBuildChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorProjectBuildChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
