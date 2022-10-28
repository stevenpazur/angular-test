export class HealthIssue {
  public Name: string = '';
  public NoProblem: boolean = false;
  public MedicalProblem: boolean = false;
  public Surgery: boolean = false;
  constructor(
    Name: string = 'Eyes (cataracts, glaucoma)',
    NoProblem: boolean = false,
    MedicalProblem: boolean = false,
    Surgery: boolean = false
  ) {
    Name = Name;
    NoProblem = NoProblem;
    MedicalProblem = MedicalProblem;
    Surgery = Surgery;
  }
}
