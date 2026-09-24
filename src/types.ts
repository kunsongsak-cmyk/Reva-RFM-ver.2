export type NavScreen = 
  | 'rfm-matrix-dashboard'
  | 'patient-action-queue'
  | 'clinical-cycles-follow-ups'
  | 'line-oa-campaigns-broadcast'
  | 'rfm-scoring-settings';

export type RFMSegment = 
  | 'Champions'
  | 'Loyal Customers'
  | 'Potential Loyalist'
  | 'New Patients'
  | 'Need Attention'
  | 'At Risk'
  | 'Hibernating'
  | 'Lost';

export interface Patient {
  id: string;
  hn: string;
  name: string;
  phone: string;
  maskedPhone: string;
  age: number;
  gender: 'หญิง' | 'ชาย';
  avatarUrl?: string;
  avatarInitials: string;
  segment: RFMSegment;
  rfmCell: string; // e.g. '5-5-5'
  recencyScore: number; // 1-5
  frequencyScore: number; // 1-5
  monetaryScore: number; // 1-5
  recencyDays: number;
  lastVisitDate: string;
  frequencyCount: number;
  monetaryValue: number;
  lastProcedure: string;
  lastDoctor: string;
  clinicalCycleStatus: string;
  clinicalCycleType: 'botox' | 'lifting' | 'course' | 'laser' | 'post-care';
  lineConnected: boolean;
  pdpaConsent: boolean;
  antiFatigueBlocked?: boolean;
  treatmentTimeline?: {
    id: string;
    procedure: string;
    doctor: string;
    daysAgo: number;
    cycleDays: string;
    statusText: string;
    recommendation: string;
    tagColor: 'tertiary' | 'secondary' | 'error' | 'primary';
  }[];
  callLogs?: {
    id: string;
    date: string;
    outcome: string;
    notes: string;
    loggedBy: string;
  }[];
}

export interface RFMCellData {
  cell: string; // e.g. 'R5-F5'
  recency: number; // 1-5
  frequency: number; // 1-5
  title: string;
  segment: RFMSegment;
  patientCount: number;
  monetaryThb: number;
  monetaryFormatted: string;
  bookedThisMonth: number;
  bgColorClass: string;
  textColorClass: string;
}

export interface KanbanItem {
  id: string;
  patientName: string;
  hn: string;
  avatarUrl?: string;
  initials: string;
  segment: RFMSegment;
  procedureTag: string;
  lastDaysAgo: number;
  overdueText: string;
  notes: string;
  assignedStaff: string;
  status: 'pending' | 'booked' | 'followup';
  bookingDate?: string;
  bookingDoctor?: string;
  room?: string;
  followupAttempts?: string;
  lastCallTime?: string;
  autoFallbackActive?: boolean;
}

export interface AuditRecord {
  id: string;
  timestamp: string;
  staffName: string;
  staffRole: string;
  staffInitials: string;
  dataset: string;
  recordsCount: number;
  purpose: string;
  ipAddress: string;
  device: string;
  securityBadge: string;
  securityType: '2fa' | 'masked' | 'encrypted';
}

export interface ClinicalRule {
  id: string;
  ruleNumber: string;
  title: string;
  type: 'Active' | 'Critical' | 'Compliance';
  enabled: boolean;
  conditions: string[];
  actionDescription: string;
  statsLabel: string;
  statsValue: string;
  triggersText: string;
}
