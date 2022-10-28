import { HealthIssue } from './health-issues';

export class Patient {
  constructor(
    public MRN: string,
    public Name: string,
    public DOB: string,
    public ScheduledDateTime: string,
    public Gender: string,
    public Weight: number,
    public HealthIssues: HealthIssue[]
  ) {}
}
