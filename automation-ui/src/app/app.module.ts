import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule, ChartModule, GrowlModule } from 'primeng/primeng';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabMenuModule } from 'primeng/tabmenu';
import { MonitorComponent } from './monitor/monitor.component';
import { MonitorBuildComponent } from './monitorComponents/monitor-build/monitor-build.component';
import { MonitorSrcControlComponent } from './monitorComponents/monitor-srcControl/monitor-srcControl.component';
import { MonitorOperationsComponent } from './monitorComponents/monitor-operations/monitor-operations.component';
import { MonitorDeploymentComponent } from './monitorComponents/monitor-deployment/monitor-deployment.component';

import { TabViewModule } from 'primeng/tabview';

import { DesignComponent } from './design/design.component';
import { EnvironmentsComponent } from './environments/environments.component';
import { AssessComponent } from './assess/assess.component';

import { SvcTreeDataService } from './Services/svc-tree-data.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { DesignService } from './Services/design.service';
import { PushNotificationModule } from 'ng-push-notification';
import { ModalLoaderComponent } from './Shared/modal.loader.component';

import { MessageService } from './Services/message.service';
import { AccordionDataService } from './Services/accordionData.service';

import { rootRouterConfig } from './app.routes';
import { AppHeaderComponent } from './Shared/app-header/app-header.component';
import { AppFooterComponent } from './Shared/app-footer/app-footer.component';
import { UserProfileComponent } from './Shared/user-profile/user-profile.component';
import { NotificationComponent } from './Shared/app-notification/app-notification.component';
import { SlideMenuModule } from 'primeng/slidemenu';
import { DesignOptionsComponent } from './designComponents/design-options/design-options.component';
import { DesignPropertiesComponent } from './designComponents/design-properties/design-properties.component';
import { DesignJsonComponent } from './designComponents/design-json/design-json.component';
import { CommonService } from './Services/common.service';
import { AccordionPropService } from './Services/accordionProps.service';
import { TemplateDataService } from './Services/template-data.service';
import {ContextMenuModule} from 'primeng/contextmenu';
import { EnvironmentComponent } from './environment/environment.component';
import {EnvironmentService} from './Services/environment.service';

import { MonitorChartsSourceControlComponent } from './monitorComponents/monitor-charts/monitor-charts-source-control/monitor-charts-source-control.component';
import { MonitorChartsBuildComponent } from './monitorComponents/monitor-charts/monitor-charts-build/monitor-charts-build.component';
import { MonitorChartsDeploymentComponent } from './monitorComponents/monitor-charts/monitor-charts-deployment/monitor-charts-deployment.component';
import { MonitorProjectSourceControlChartsComponent } from './monitorComponents/monitor-project-source-control-charts/monitor-project-source-control-charts.component';
import { MonitorProjectBuildChartComponent } from './monitorComponents/monitor-project-build-charts/monitor-project-build-charts.component';
import { MonitorProjectDeploymentChartComponent } from './monitorComponents/monitor-project-deployment-charts/monitor-project-deployment-charts.component';

import {ProgressSpinnerModule} from 'primeng/progressspinner';


@NgModule({
  declarations: [
    AppComponent,
    ModalLoaderComponent,
    MonitorComponent,
    MonitorBuildComponent,
    MonitorSrcControlComponent,
    MonitorOperationsComponent,
    MonitorDeploymentComponent,
    DesignComponent,
    EnvironmentsComponent,
    AssessComponent,
    AppHeaderComponent,
    AppFooterComponent,
    UserProfileComponent,
    NotificationComponent,
    DesignOptionsComponent,
    DesignPropertiesComponent,
    DesignJsonComponent,
    EnvironmentComponent,
    MonitorChartsBuildComponent,
    MonitorChartsSourceControlComponent,
    MonitorChartsDeploymentComponent,
    MonitorProjectSourceControlChartsComponent,
    MonitorProjectBuildChartComponent,
    MonitorProjectDeploymentChartComponent
  ],
  imports: [
    BrowserModule,
    SlideMenuModule,
    BrowserAnimationsModule,
    AccordionModule,
    ProgressSpinnerModule,
    ChartsModule,
    ChartModule,
    GrowlModule,
    ScrollPanelModule,
    TabMenuModule,
    TabViewModule,
    ContextMenuModule,
    FormsModule,
    TreeModule,
    ColorPickerModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig),
    PushNotificationModule.forRoot(),
    NgbModule.forRoot()

  ],
  exports: [RouterModule],
  providers: [
    SvcTreeDataService,
    AccordionDataService,
    DesignService,
    AccordionPropService,
    EnvironmentService,
    TemplateDataService,
    EnvironmentService,
    { provide: 'IMessageService', useClass: MessageService },
    { provide: 'ICommonService', useClass: CommonService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
