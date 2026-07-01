export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  studentId: string;
  level: 100 | 200 | 300 | 400;
  program: string;
  department: string;
  college: string;
  university: string;
  membershipStatus: "active" | "inactive" | "pending";
  joinDate: string;
  gpa?: number;
  profileImage?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  creditHours: number;
  level: 100 | 200 | 300 | 400;
  semester: 1 | 2;
  department: string;
  lecturer: string;
}

export interface ClassSchedule {
  id: string;
  courseCode: string;
  courseName: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  venue: string;
  lecturer: string;
}

export interface AcademicSchedule {
  id: string;
  title: string;
  type: "semester" | "midterm" | "finals" | "vacation";
  startDate: string;
  endDate: string;
  description: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
}

export interface FinancialAidRecord {
  id: string;
  studentId: string;
  type: "scholarship" | "grant" | "tuition-waiver" | "book-allowance";
  status: "approved" | "pending" | "under-review" | "denied";
  amount: number;
  currency: string;
  semester: string;
  appliedDate: string;
  decisionDate?: string;
  criteria: string;
  notes?: string;
}

export interface AdvisingSession {
  id: string;
  studentId: string;
  advisorName: string;
  advisorRole: string;
  date: string;
  time: string;
  type: "course-planning" | "registration" | "academic-support" | "career-guidance";
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
  location: string;
}

export interface MentorshipMatch {
  id: string;
  mentorName: string;
  mentorTitle: string;
  mentorOrganization: string;
  mentorExpertise: string[];
  menteeId: string;
  programName: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "upcoming";
  meetingFrequency: string;
  nextMeeting?: string;
}

export interface OutreachEvent {
  id: string;
  title: string;
  description: string;
  type: "workshop" | "seminar" | "community-service" | "research" | "networking";
  date: string;
  time: string;
  location: string;
  organizer: string;
  capacity: number;
  enrolled: number;
  status: "upcoming" | "ongoing" | "completed";
}
