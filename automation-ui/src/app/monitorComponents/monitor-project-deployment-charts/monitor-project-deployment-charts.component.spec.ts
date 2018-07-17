import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorProjectDeploymentChartComponent } from './monitor-project-deployment-charts.component';

describe('MonitorProjectSourceControlChartsComponent', () => {
  let component: MonitorProjectDeploymentChartComponent;
  let fixture: ComponentFixture<MonitorProjectDeploymentChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorProjectDeploymentChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorProjectDeploymentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
