import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorChartsDeploymentComponent } from './monitor-charts-deployment.component';

describe('MonitorChartsBarComponent', () => {
  let component: MonitorChartsDeploymentComponent;
  let fixture: ComponentFixture<MonitorChartsDeploymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorChartsDeploymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorChartsDeploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
