import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorProjectSourceControlChartsComponent } from './monitor-project-source-control-charts.component';

describe('MonitorProjectSourceControlChartsComponent', () => {
  let component: MonitorProjectSourceControlChartsComponent;
  let fixture: ComponentFixture<MonitorProjectSourceControlChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorProjectSourceControlChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorProjectSourceControlChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
