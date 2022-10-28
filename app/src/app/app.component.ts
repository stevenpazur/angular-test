import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import data from './sampleData.json';
import { Patient } from 'src/assets/models/patient';
import { SelectionModel } from '@angular/cdk/collections';
import { HealthIssue } from 'src/assets/models/health-issues';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private dataStore: any;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.dataStore = data;
    console.log('selected', this.selection.selected);
  }
  jsonResults: any;
  resultArray: {
    MRN: string;
    Name: string;
    DOB: string;
    ScheduleDateTime: string;
    Gender: string;
    Weight: number;
    HealthIssues: {
      Name: string;
      NoProblem: boolean;
      MedicalProblem: boolean;
      Surgery: boolean;
    }[];
  }[] = [];
  nameSearch = '';
  public searchFN: string = '';
  public searchLN: string = '';
  public searchMRN: string = '';
  public mrnResult: string = '';
  public nameResult: string = '';
  public dobResult: string = '';
  public scheduledDateTimeResult: string = '';
  public genderResult: string = '';
  public weightResult: string = '';
  public caseSensitiveSearch: boolean = false;
  public displayedColumns = ['fname', 'lname', 'mrn'];
  public allergyDisplayedColumns = [
    'allergy',
    'No Problem',
    'Medical Problem',
    'Surgery',
  ];
  public allergyResults: HealthIssue[] = [];
  allergiesCopy: HealthIssue[] = [];
  selection = new SelectionModel<{
    MRN: string;
    Name: string;
    DOB: string;
    ScheduleDateTime: string;
    Gender: string;
    Weight: number;
    HealthIssues: {
      Name: string;
      NoProblem: boolean;
      MedicalProblem: boolean;
      Surgery: boolean;
    }[];
  }>(false, []);
  public submit: boolean = false;

  search(): void {
    console.log(this.nameSearch);
    let listOfResults: any = data.results;
    let listOfPatients: {
      MRN: string;
      Name: string;
      DOB: string;
      ScheduleDateTime: string;
      Gender: string;
      Weight: number;
      HealthIssues: {
        Name: string;
        NoProblem: boolean;
        MedicalProblem: boolean;
        Surgery: boolean;
      }[];
    }[] = listOfResults;
    let patientMatch: {
      MRN: string;
      Name: string;
      DOB: string;
      ScheduleDateTime: string;
      Gender: string;
      Weight: number;
      HealthIssues: {
        Name: string;
        NoProblem: boolean;
        MedicalProblem: boolean;
        Surgery: boolean;
      }[];
    }[];
    console.log(listOfResults);
    if (this.caseSensitiveSearch) {
      patientMatch = listOfPatients.filter(
        (p) =>
          p.Name.toUpperCase() === this.nameSearch.toUpperCase() ||
          p.Name.split(' ')[0].toUpperCase() ===
            this.nameSearch.toUpperCase() ||
          p.Name.substring(p.Name.indexOf(' ') + 1).toUpperCase() ===
            this.nameSearch.toUpperCase() ||
          p.MRN === this.nameSearch
      );
    } else {
      patientMatch = listOfPatients.filter(
        (p) =>
          p.Name === this.nameSearch ||
          p.Name.split(' ')[0] === this.nameSearch ||
          p.Name.substring(p.Name.indexOf(' ') + 1) === this.nameSearch ||
          p.MRN === this.nameSearch
      );
    }
    console.log(
      listOfPatients[0].Name === this.nameSearch,
      listOfPatients[0].Name,
      this.nameSearch
    );
    if (patientMatch.length > 0) {
      this.resultArray = patientMatch;
      console.log(patientMatch[0]);
      let matchedPatient: {
        MRN: string;
        Name: string;
        DOB: string;
        ScheduleDateTime: string;
        Gender: string;
        Weight: number;
        HealthIssues: {
          Name: string;
          NoProblem: boolean;
          MedicalProblem: boolean;
          Surgery: boolean;
        }[];
      } = patientMatch[0];
      this.searchFN = matchedPatient.Name.split(' ')[0];
      this.searchLN = matchedPatient.Name.substring(
        matchedPatient.Name.indexOf(' ') + 1
      );
      this.searchMRN = matchedPatient.MRN.toString();
    }
  }

  selectRow(row: any): void {
    this.selection.toggle(row);
    console.log(this.selection.selected[0]);
    let selectedPatient = new Patient(
      this.selection.selected[0].MRN,
      this.selection.selected[0].Name,
      this.selection.selected[0].DOB,
      this.selection.selected[0].ScheduleDateTime,
      this.selection.selected[0].Gender,
      this.selection.selected[0].Weight,
      this.selection.selected[0].HealthIssues
    );
    this.mrnResult = selectedPatient.MRN;
    this.nameResult = selectedPatient.Name;
    this.dobResult = selectedPatient.DOB;
    this.scheduledDateTimeResult = selectedPatient.ScheduledDateTime;
    this.genderResult = selectedPatient.Gender;
    this.weightResult = selectedPatient.Weight.toString();
    this.allergyResults = selectedPatient.HealthIssues;
    this.allergiesCopy = selectedPatient.HealthIssues;
  }

  updateAllergyResults(resultType: number, element: HealthIssue): void {
    var issueInArr = this.allergiesCopy.filter(
      (a) => a.Name === element.Name
    )[0];
    switch (resultType) {
      case 0:
        issueInArr.NoProblem = !issueInArr.NoProblem;
        break;
      case 1:
        issueInArr.MedicalProblem = !issueInArr.MedicalProblem;
        break;
      case 2:
        issueInArr.Surgery = !issueInArr.Surgery;
        break;
      default:
        break;
    }
    this.allergiesCopy.splice(
      this.allergiesCopy.findIndex((a) => a.Name === element.Name),
      1,
      issueInArr
    );
  }

  saveData(): void {
    let newResult: Patient = new Patient(
      this.mrnResult,
      this.nameResult,
      this.dobResult,
      this.scheduledDateTimeResult,
      this.genderResult,
      parseInt(this.weightResult),
      this.allergiesCopy
    );
    
    // update data in results array
    this.resultArray.splice(this.resultArray.findIndex(r => r.MRN === newResult.MRN), 1);
    let finalResults: Patient[] = [];
    this.resultArray.forEach(r => {
      finalResults.push(new Patient(r.MRN, r.Name, r.DOB, r.ScheduleDateTime, r.Gender, r.Weight, r.HealthIssues));
    })
    finalResults.push(newResult);
    var patientDTO = {
      results: finalResults
    };

    console.log(patientDTO);
    var uri = 'http://localhost:3000';

    this.http.post(uri, patientDTO).subscribe((res) => {
      console.log('file successfully written', this.dataStore);
      this.submit = true;
    });
  }
}
