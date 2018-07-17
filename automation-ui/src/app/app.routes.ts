import { Routes } from '@angular/router';
import { MonitorComponent } from './monitor/monitor.component';
import { DesignComponent } from './design/design.component';
import { EnvironmentsComponent } from './environments/environments.component';
import { AssessComponent } from './assess/assess.component';
import { EnvironmentComponent } from './environment/environment.component';


export const rootRouterConfig: Routes = [
  { path: '', component: DesignComponent },
  { path: 'monitor', component: MonitorComponent },
  // { path: 'environments', component: EnvironmentsComponent },
  // { path: 'assess', component: AssessComponent },
  { path: '**', component: DesignComponent }
];
