import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EnvironmentService } from '../Services/environment.service';


@Component({
  selector: 'nextdev-comp-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.css']
})
export class EnvironmentComponent implements OnInit {


  constructor( private fb:FormBuilder, private _environmentService: EnvironmentService ) { }

  environmentTeamDetailDataResult: any[];
  environmentProjectOwnerDataResult: any[];
  // environmentMainTechnologyDataResult: any[];
  // environmentBuildToolDataResult: any[];
  errorMessage: string;
  ngOnInit() {
    // this.environmentForm = this.fb.group({
    //   DevopsEnvironment: ['', [Validators.required, Validators.minLength(2)]],
    //   ProjectName: ['', [Validators.required, Validators.minLength(5)]],
    //   ProjectId: ['', [Validators.required, Validators.minLength(2)]],
    //   ProjectOwner: ['', [Validators.required, Validators.minLength(50)]]
    // });
    this.getEnvironmentTeamDetailData();
    this.getEnvironmentProjectOwner();
    // this.getEnvironmentMainTechnology();
    // this.getEnvironmentBuildTool();
  }

  DevopsEnvironment = new FormControl('');
  ProjectName = new FormControl('', [Validators.required]);
  ProjectId = new FormControl('');
  ProjectOwner= new FormControl('');
  // MainTechinology= new FormControl('');
  // Buildtools= new FormControl('');
  Name= new FormControl('');
  Email = new FormControl('');
  Role= new FormControl('');
  Status = new FormControl('');

  environmentForm: FormGroup = this.fb.group({
    DevopsEnvironment: this.DevopsEnvironment,
    ProjectName: this.ProjectName,
    ProjectId: this.ProjectId,
    ProjectOwner: this.ProjectOwner
    // MainTechinology:this.MainTechinology,
    // Buildtools:this.Buildtools
  });

  ProjectTeamForm: FormGroup = this.fb.group({
      Name: this.Name,
       Email: this.Email,
       Role: this.Role,
       Status:  this.Status
     });

  getEnvironmentTeamDetailData() {
    this._environmentService.getAllEnvironmentTeamDetailData().subscribe(
      response => { this.environmentTeamDetailDataResult = response['ProjectTeam'];

    },
  error =>this.errorMessage = <any>error);
  }

  getEnvironmentProjectOwner() {
    this._environmentService.getAllEnvironmentProjectOwner().subscribe(
      response => { this.environmentProjectOwnerDataResult = response['ProjectOwner'];
    },
  error =>this.errorMessage = <any>error);
  }

  // getEnvironmentMainTechnology() {
  //   this._environmentService.getAllEnvironmentMainTechnology().subscribe(
  //     response => { this.environmentMainTechnologyDataResult = response['MainTechnology'];
  //   },
  // error =>this.errorMessage = <any>error);
  // }

  // getEnvironmentBuildTool() {
  //   this._environmentService.getAllEnvironmentBuildTool().subscribe(
  //     response => { this.environmentBuildToolDataResult = response['BuildTool'];
  //   },
  // error =>this.errorMessage = <any>error);
  // }

  SubmitOnBoardingProjectFormData(){
    //   const OnBoardingData = {
    //   ProjectName: this.environmentForm.get('ProjectName').value,
    //   ProjectID : this.environmentForm.get('ProjectId').value,
    //   ProjectOwner: this.environmentForm.get('ProjectOwner').value,
    //   MainTechnology: this.environmentForm.get('MainTechinology').value,
    //   BuildTool: this.environmentForm.get('Buildtools').value
    // };

    // this._environmentService.SubmitOnBoardingProjectFormData(OnBoardingData).subscribe(
    //     () => console.log('completed successfully!'),
    //     (error:any) => console.log(error)
    // );
  //  console.log(this.environmentForm.value);
  }

 cancel() {
  this.environmentForm.reset();
 }
 searchDevOpsEnvironment(){
//  console.log('value is -',this.DevopsEnvironment.value);
 }

 clear() {
 this.environmentForm.reset();
 }

 SubmitTeamProject(){
   console.log(this.ProjectTeamForm.value);
 }
}
