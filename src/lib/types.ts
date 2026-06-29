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
  membershipStatus: "active" | "inactive" | "pending";
  joinDate: string;
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
