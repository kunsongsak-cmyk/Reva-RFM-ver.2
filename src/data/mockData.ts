import { Patient, RFMCellData, KanbanItem, AuditRecord, ClinicalRule } from '../types';

export const CLINIC_LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1UrpdxmC_s5aZDjX1ZSdUwdXGyObQyq29hgk5UE-5LNAjYmPqNiIvxILWg7jaCDgVcZnEXQGzhR04OJBCuDwpPj8ErhZ6-eU91T5kngz0eHTtIXI7fSP5BShO7Pi96VITDVB1847JB1R0hRItfN0ODAQ4RQ4dYp0F-km2ook22rrXZ96vnS36yTp8fooksidhrlaGfUSNw6bz79jgnir163Z7VDeT9rhUwe9YfafGZoQNORCMhxhSMnAQ';
export const DOCTOR_PROFILE_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzVy8uQ9gX5LY_qzyrBHGS4xJRQZbtKJKd8q3u9gZgLFa9e2n_dJSifOHCk7yQ7PZPkbJA183onJVD-JS1wHkSjCyUSUbU_8CzUjBsh0sLA-viCMekkFEaW4UuVjFTRBSMj92vnrHiL1BbmObqb0f91n8hNQjbD-cT4J2wHSGQq2fuGNJgHHkz8E2j3p6hlBvuwu1NsXR9Bo-fWk8c04d9xH3yM8vMJ-xVZ9e2_EMQkoA3DQykWnIm';
export const CLINIC_BANNER_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ6zBrmQcBEkJwPB4GprDI118b3nXEXhKPTSOofHxw5kNfxJ0gEEywdBPRFiPiJMALYzaJ0W_fGkLiSi3rv90tGlOsPckQvX-1BI9Ex-S0Gdp2tlETJX40NTW066YH8f9oOD_GUzWF8qH5uBXl9zHcX7ceiK4-cuqzKqrcCLrcpxYoHEbTUkKmyPv18eXOnYr68cHMPr8N9yPInFZ6BaqE2G4VEyWTQCRCnB_mYAT8buuDwQLu3xEs';

export const PATIENT_PORTRAIT_SOMSREE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8x8UVU8K8aAz3OrpWrjZcdx_JPN3HWtCF4PlCslei6x_lxwzEWNBMRWD9KjUDOJ7VZDKvYJbgkUYW_uN-t0R5DTXdcjkQOxdTdQvGBwF1Kwo3cfuJRLX_6bmQ3Q6cMpl5qfSYb1t0Lfm9pegdLrBtItjGWH0mZnKxdJzkNiWUv5vD0Jvj0l3RGrdfEnntjrM4ubZSRzs9RMrGpEyHRZZKiFkmfmt6OatIKeZEH8yz3qU-TQo86Vme';
export const PATIENT_PORTRAIT_ARANYA = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA05HM9KprEjBQxPxcNyMFh3MifUcrpLR3DO3xhFBlZZkRuTrGt-aSlq_hcxxrQYng7Mgzja1TOFE73eBiGrG5nVD-yAuJ2z3ih999WOj4XP07NLK35KkGH2WCh7m79Z4FxK-JSIcTeMdlFVu2Q_qkQDn_WOoapd_-03-JPwmpvyejWBfw72GTWWwuBLCMTYZbm__jir5GW6q0NMivormpEFegLzOzVTeihmXzTLUaepn1YQk4grPAH';
export const PATIENT_PORTRAIT_THANAPHAT = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJW5r14k1jnpaX5G--mSQmwr6lbwrBk_iuHojroIOdjzQp2JaZkhyZjLhGJl4x__yDgrEi2mOLBEzx4MXRez4xX3XoxDt27Zg3Brv0iOHPLTh5lBrvpWfFMsixxPDDwuWEf-kxCWsu8uT-kH1e0qljMAV5RG3NNuCwcMqTyXcUkbPOOW4yRFFgYa0opSAVVwlinYxzbv1Db_WLwAukBoqAuAWKnjD4lWnBRzH6ftdiLsuUxiE6iy-F';
export const PATIENT_PORTRAIT_SOMSREE_M = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAz0VatTQylGEdUlNYlX_by1y0225MkgPqSavCUT-uv1mL9FsLdECIHa5J9fa3U7cP6NlURKHOFqKV7ue1dhsPss2l0Rn9tWrtScu7Grylvs7WFx5dLP2gAzjnJOgSuBqThB5VAx3Z3TzpuZUddgftanSDlMjmY5s0zN-sNKdVo48BTjbdvp0fr_QXWndRMrwl8uoET0XjBlczLfHYjZYTdrttaaSG5rTXIIB7iK6k6rDPWdc9Y8O-l';

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'p-1',
    hn: '660892',
    name: 'คุณสมศรี มหานคร',
    phone: '089-456-7890',
    maskedPhone: '089-456-XXXX',
    age: 42,
    gender: 'หญิง',
    avatarUrl: PATIENT_PORTRAIT_SOMSREE,
    avatarInitials: 'สม',
    segment: 'Champions',
    rfmCell: '5-5-5',
    recencyScore: 5,
    frequencyScore: 5,
    monetaryScore: 5,
    recencyDays: 14,
    lastVisitDate: '14/02/2024',
    frequencyCount: 12,
    monetaryValue: 245000,
    lastProcedure: 'Botox Jawline + Ultraformer MPT',
    lastDoctor: 'พญ. พิมพ์ชนก สิทธิเวช',
    clinicalCycleStatus: 'คอร์สคงเหลือ 2 ครั้ง',
    clinicalCycleType: 'course',
    lineConnected: true,
    pdpaConsent: true,
    antiFatigueBlocked: false,
    treatmentTimeline: [
      {
        id: 't-1',
        procedure: "Botox (Glabella & Crow's feet 50u)",
        doctor: 'นพ. กิตติศักดิ์ เจริญดี',
        daysAgo: 110,
        cycleDays: 'รอบ 90-120 วัน',
        statusText: 'ถึงรอบ Retouch (รอบ 90-120 วัน)',
        recommendation: 'แนะนำ: เติมริ้วรอยรอบดวงตา',
        tagColor: 'secondary'
      },
      {
        id: 't-2',
        procedure: 'Ultraformer MPT (Full Face 600 Shots)',
        doctor: 'พญ. พิมพ์ชนก สิทธิเวช',
        daysAgo: 80,
        cycleDays: 'รอบ 180-365 วัน',
        statusText: 'อยู่ในช่วงเห็นผลเต็มที่ (รอบ 180-365 วัน)',
        recommendation: 'สถานะ: คอลลาเจนยกกระชับสมบูรณ์',
        tagColor: 'tertiary'
      },
      {
        id: 't-3',
        procedure: 'Meso Brightening Course (คงเหลือ 2/5 ครั้ง)',
        doctor: 'พญ. พิมพ์ชนก สิทธิเวช',
        daysAgo: 45,
        cycleDays: 'คอร์สต่อเนื่อง',
        statusText: 'มีคอร์สคงค้าง ไม่ได้มา 45 วัน',
        recommendation: 'คอร์สหมดอายุ 30 พ.ย. 2024 (ชวนมาเก็บสิทธิ)',
        tagColor: 'primary'
      }
    ],
    callLogs: [
      {
        id: 'cl-1',
        date: '2024-03-04 14:20',
        outcome: 'นัดหมายสำเร็จ (Booked)',
        notes: 'คนไข้แจ้งสนใจโปรโมชันเติม Botox ริ้วรอยรอบดวงตาเพิ่ม สะดวกเข้าตรวจวันเสาร์ที่ 9 มี.ค. เวลา 14:00 น. พบ พญ. พิมพ์ชนก',
        loggedBy: 'พญ. พิมพ์ชนก สิทธิเวช'
      }
    ]
  },
  {
    id: 'p-2',
    hn: '651204',
    name: 'คุณวิชัย สุวรรณภูมิ',
    phone: '081-789-3456',
    maskedPhone: '081-789-XXXX',
    age: 48,
    gender: 'ชาย',
    avatarInitials: 'วิ',
    segment: 'At Risk',
    rfmCell: '2-4-4',
    recencyScore: 2,
    frequencyScore: 4,
    monetaryScore: 4,
    recencyDays: 210,
    lastVisitDate: '28/07/2023',
    frequencyCount: 7,
    monetaryValue: 130000,
    lastProcedure: 'Filler Under-eye 2 cc',
    lastDoctor: 'นพ. กิตติศักดิ์ เจริญดี',
    clinicalCycleStatus: 'ถึงรอบเติม Filler (>180 วัน)',
    clinicalCycleType: 'botox',
    lineConnected: true,
    pdpaConsent: true,
    antiFatigueBlocked: false,
    treatmentTimeline: [
      {
        id: 't-4',
        procedure: 'Filler Under-eye (Restylane Kysse 2 cc)',
        doctor: 'นพ. กิตติศักดิ์ เจริญดี',
        daysAgo: 210,
        cycleDays: 'รอบ 180-365 วัน',
        statusText: 'ขาดการติดต่อเกิน 6 เดือน',
        recommendation: 'แนะนำ: ติดตามผลฟิลเลอร์ใต้ตาและร่องแก้ม',
        tagColor: 'error'
      }
    ]
  },
  {
    id: 'p-3',
    hn: '670115',
    name: 'คุณปิยะดา นพรัตน์',
    phone: '092-114-8899',
    maskedPhone: '092-114-XXXX',
    age: 29,
    gender: 'หญิง',
    avatarInitials: 'ปิ',
    segment: 'New Patients',
    rfmCell: '4-1-2',
    recencyScore: 4,
    frequencyScore: 1,
    monetaryScore: 2,
    recencyDays: 25,
    lastVisitDate: '02/02/2024',
    frequencyCount: 1,
    monetaryValue: 15000,
    lastProcedure: 'Pico Laser Discovery',
    lastDoctor: 'พญ. พิมพ์ชนก สิทธิเวช',
    clinicalCycleStatus: 'Post-Care (ครบ 30 วัน)',
    clinicalCycleType: 'post-care',
    lineConnected: true,
    pdpaConsent: true,
    antiFatigueBlocked: false
  },
  {
    id: 'p-4',
    hn: '658931',
    name: 'คุณธนากร เลิศวิริยะ',
    phone: '086-339-4455',
    maskedPhone: '086-339-XXXX',
    age: 38,
    gender: 'ชาย',
    avatarInitials: 'ธน',
    segment: 'Loyal Customers',
    rfmCell: '3-4-4',
    recencyScore: 3,
    frequencyScore: 4,
    monetaryScore: 4,
    recencyDays: 95,
    lastVisitDate: '24/11/2023',
    frequencyCount: 8,
    monetaryValue: 88500,
    lastProcedure: 'Botox Dermo-lift',
    lastDoctor: 'พญ. พิมพ์ชนก สิทธิเวช',
    clinicalCycleStatus: 'Botox Maintenance',
    clinicalCycleType: 'botox',
    lineConnected: true,
    pdpaConsent: true,
    antiFatigueBlocked: true
  },
  {
    id: 'p-5',
    hn: '641098',
    name: 'คุณนภัสสร อัครเดช',
    phone: '085-901-2233',
    maskedPhone: '085-901-XXXX',
    age: 34,
    gender: 'หญิง',
    avatarInitials: 'นภ',
    segment: 'Need Attention',
    rfmCell: '2-3-3',
    recencyScore: 2,
    frequencyScore: 3,
    monetaryScore: 3,
    recencyDays: 185,
    lastVisitDate: '26/08/2023',
    frequencyCount: 4,
    monetaryValue: 42000,
    lastProcedure: 'Meso Fat หน้าเรียว',
    lastDoctor: 'นพ. วริทธิ์ ธาราทรัพย์',
    clinicalCycleStatus: 'คอร์สหมดอายุ > 3 เดือน',
    clinicalCycleType: 'course',
    lineConnected: true,
    pdpaConsent: true,
    antiFatigueBlocked: false
  },
  {
    id: 'p-6',
    hn: '6604-00129',
    name: 'คุณอรัญญา วชิรนนท์',
    phone: '084-551-9922',
    maskedPhone: '084-551-XXXX',
    age: 36,
    gender: 'หญิง',
    avatarUrl: PATIENT_PORTRAIT_ARANYA,
    avatarInitials: 'อร',
    segment: 'Champions',
    rfmCell: '4-5-5',
    recencyScore: 4,
    frequencyScore: 5,
    monetaryScore: 5,
    recencyDays: 115,
    lastVisitDate: '10/11/2023',
    frequencyCount: 11,
    monetaryValue: 198000,
    lastProcedure: "Botox Crow's feet (Dysport 50U)",
    lastDoctor: 'นพ. กิตติศักดิ์ เจริญดี',
    clinicalCycleStatus: 'เกินกำหนดรอบ Retouch',
    clinicalCycleType: 'botox',
    lineConnected: true,
    pdpaConsent: true,
    antiFatigueBlocked: false
  },
  {
    id: 'p-7',
    hn: '6511-00843',
    name: 'คุณธนภัทร รุ่งเรืองกิจ',
    phone: '081-332-9011',
    maskedPhone: '081-332-XXXX',
    age: 51,
    gender: 'ชาย',
    avatarUrl: PATIENT_PORTRAIT_THANAPHAT,
    avatarInitials: 'ธภ',
    segment: 'Champions',
    rfmCell: '3-5-5',
    recencyScore: 3,
    frequencyScore: 5,
    monetaryScore: 5,
    recencyDays: 270,
    lastVisitDate: '01/06/2023',
    frequencyCount: 10,
    monetaryValue: 180000,
    lastProcedure: 'Ultraformer MPT Full Face',
    lastDoctor: 'พญ. พิมพ์ชนก สิทธิเวช',
    clinicalCycleStatus: 'ถึงรอบกระตุ้นคอลลาเจนรายปี',
    clinicalCycleType: 'lifting',
    lineConnected: true,
    pdpaConsent: true,
    antiFatigueBlocked: false
  },
  {
    id: 'p-8',
    hn: '6610-00351',
    name: 'คุณเมทินี กิตติวัฒน์',
    phone: '087-445-1212',
    maskedPhone: '087-445-XXXX',
    age: 27,
    gender: 'หญิง',
    avatarInitials: 'มก',
    segment: 'Need Attention',
    rfmCell: '2-2-2',
    recencyScore: 2,
    frequencyScore: 2,
    monetaryScore: 2,
    recencyDays: 60,
    lastVisitDate: '25/12/2023',
    frequencyCount: 2,
    monetaryValue: 18000,
    lastProcedure: 'Diode Laser รักแร้',
    lastDoctor: 'พญ. พิมพ์ชนก สิทธิเวช',
    clinicalCycleStatus: 'คอร์สคงเหลือ 4 ครั้ง (ขาดติดต่อ >60 วัน)',
    clinicalCycleType: 'course',
    lineConnected: true,
    pdpaConsent: true,
    antiFatigueBlocked: false
  },
  {
    id: 'p-9',
    hn: '6602-00512',
    name: 'คุณวิภาดา ตุลยเดช',
    phone: '089-887-2234',
    maskedPhone: '089-887-XXXX',
    age: 32,
    gender: 'หญิง',
    avatarInitials: 'วต',
    segment: 'Potential Loyalist',
    rfmCell: '4-3-3',
    recencyScore: 4,
    frequencyScore: 3,
    monetaryScore: 3,
    recencyDays: 18,
    lastVisitDate: '05/02/2024',
    frequencyCount: 5,
    monetaryValue: 48000,
    lastProcedure: 'Meso Brightening 3/5',
    lastDoctor: 'พญ. พิมพ์ชนก สิทธิเวช',
    clinicalCycleStatus: 'คอนเฟิร์มแล้ว นัด 10 มี.ค.',
    clinicalCycleType: 'course',
    lineConnected: true,
    pdpaConsent: true,
    antiFatigueBlocked: false
  }
];

export const INITIAL_RFM_MATRIX_CELLS: RFMCellData[] = [
  // ROW 5 (F5)
  { cell: 'R1-F5', recency: 1, frequency: 5, title: 'R1-F5: At Risk (High Value)', segment: 'At Risk', patientCount: 84, monetaryThb: 4200000, monetaryFormatted: '฿4.2M', bookedThisMonth: 12, bgColorClass: 'bg-error/15 text-error', textColorClass: 'text-error' },
  { cell: 'R2-F5', recency: 2, frequency: 5, title: 'R2-F5: At Risk (High Value)', segment: 'At Risk', patientCount: 96, monetaryThb: 4800000, monetaryFormatted: '฿4.8M', bookedThisMonth: 18, bgColorClass: 'bg-error/15 text-error', textColorClass: 'text-error' },
  { cell: 'R3-F5', recency: 3, frequency: 5, title: 'R3-F5: Loyal Customers', segment: 'Loyal Customers', patientCount: 110, monetaryThb: 7200000, monetaryFormatted: '฿7.2M', bookedThisMonth: 35, bgColorClass: 'bg-primary-container/20 text-primary', textColorClass: 'text-primary' },
  { cell: 'R4-F5', recency: 4, frequency: 5, title: 'R4-F5: Champions VIP', segment: 'Champions', patientCount: 128, monetaryThb: 14200000, monetaryFormatted: '฿14.2M', bookedThisMonth: 54, bgColorClass: 'bg-tertiary-fixed/60 text-tertiary-container', textColorClass: 'text-tertiary-container' },
  { cell: 'R5-F5', recency: 5, frequency: 5, title: 'R5-F5: Champions (VIP Top Tier)', segment: 'Champions', patientCount: 98, monetaryThb: 14300000, monetaryFormatted: '฿14.3M', bookedThisMonth: 42, bgColorClass: 'bg-tertiary-container text-on-tertiary', textColorClass: 'text-on-tertiary' },

  // ROW 4 (F4)
  { cell: 'R1-F4', recency: 1, frequency: 4, title: 'R1-F4: At Risk', segment: 'At Risk', patientCount: 118, monetaryThb: 4100000, monetaryFormatted: '฿4.1M', bookedThisMonth: 8, bgColorClass: 'bg-error/15 text-error', textColorClass: 'text-error' },
  { cell: 'R2-F4', recency: 2, frequency: 4, title: 'R2-F4: At Risk', segment: 'At Risk', patientCount: 130, monetaryThb: 5100000, monetaryFormatted: '฿5.1M', bookedThisMonth: 14, bgColorClass: 'bg-error/15 text-error', textColorClass: 'text-error' },
  { cell: 'R3-F4', recency: 3, frequency: 4, title: 'R3-F4: Loyal Customers', segment: 'Loyal Customers', patientCount: 115, monetaryThb: 6000000, monetaryFormatted: '฿6.0M', bookedThisMonth: 29, bgColorClass: 'bg-primary-container/20 text-primary', textColorClass: 'text-primary' },
  { cell: 'R4-F4', recency: 4, frequency: 4, title: 'R4-F4: Loyal Customers', segment: 'Loyal Customers', patientCount: 115, monetaryThb: 6200000, monetaryFormatted: '฿6.2M', bookedThisMonth: 33, bgColorClass: 'bg-primary-container/20 text-primary', textColorClass: 'text-primary' },
  { cell: 'R5-F4', recency: 5, frequency: 4, title: 'R5-F4: Champions VIP', segment: 'Champions', patientCount: 86, monetaryThb: 9500000, monetaryFormatted: '฿9.5M', bookedThisMonth: 38, bgColorClass: 'bg-tertiary-fixed/60 text-tertiary-container', textColorClass: 'text-tertiary-container' },

  // ROW 3 (F3)
  { cell: 'R1-F3', recency: 1, frequency: 3, title: 'R1-F3: Hibernating', segment: 'Hibernating', patientCount: 145, monetaryThb: 3100000, monetaryFormatted: '฿3.1M', bookedThisMonth: 5, bgColorClass: 'bg-surface-container-high text-on-surface-variant', textColorClass: 'text-on-surface' },
  { cell: 'R2-F3', recency: 2, frequency: 3, title: 'R2-F3: Need Attention', segment: 'Need Attention', patientCount: 160, monetaryThb: 4300000, monetaryFormatted: '฿4.3M', bookedThisMonth: 21, bgColorClass: 'bg-secondary-container/40 text-secondary', textColorClass: 'text-secondary' },
  { cell: 'R3-F3', recency: 3, frequency: 3, title: 'R3-F3: Need Attention', segment: 'Need Attention', patientCount: 170, monetaryThb: 4800000, monetaryFormatted: '฿4.8M', bookedThisMonth: 31, bgColorClass: 'bg-secondary-container/40 text-secondary', textColorClass: 'text-secondary' },
  { cell: 'R4-F3', recency: 4, frequency: 3, title: 'R4-F3: Potential Loyalist', segment: 'Potential Loyalist', patientCount: 150, monetaryThb: 4600000, monetaryFormatted: '฿4.6M', bookedThisMonth: 40, bgColorClass: 'bg-surface-container-high text-primary', textColorClass: 'text-primary' },
  { cell: 'R5-F3', recency: 5, frequency: 3, title: 'R5-F3: Potential Loyalist', segment: 'Potential Loyalist', patientCount: 160, monetaryThb: 5100000, monetaryFormatted: '฿5.1M', bookedThisMonth: 52, bgColorClass: 'bg-surface-container-high text-primary', textColorClass: 'text-primary' },

  // ROW 2 (F2)
  { cell: 'R1-F2', recency: 1, frequency: 2, title: 'R1-F2: Hibernating', segment: 'Hibernating', patientCount: 240, monetaryThb: 3800000, monetaryFormatted: '฿3.8M', bookedThisMonth: 6, bgColorClass: 'bg-surface-container text-on-surface-variant', textColorClass: 'text-on-surface' },
  { cell: 'R2-F2', recency: 2, frequency: 2, title: 'R2-F2: Hibernating', segment: 'Hibernating', patientCount: 185, monetaryThb: 3200000, monetaryFormatted: '฿3.2M', bookedThisMonth: 11, bgColorClass: 'bg-surface-container text-on-surface-variant', textColorClass: 'text-on-surface' },
  { cell: 'R3-F2', recency: 3, frequency: 2, title: 'R3-F2: Need Attention', segment: 'Need Attention', patientCount: 160, monetaryThb: 3700000, monetaryFormatted: '฿3.7M', bookedThisMonth: 25, bgColorClass: 'bg-secondary-container/40 text-secondary', textColorClass: 'text-secondary' },
  { cell: 'R4-F2', recency: 4, frequency: 2, title: 'R4-F2: Potential Loyalist', segment: 'Potential Loyalist', patientCount: 130, monetaryThb: 3400000, monetaryFormatted: '฿3.4M', bookedThisMonth: 30, bgColorClass: 'bg-surface-container-high text-primary', textColorClass: 'text-primary' },
  { cell: 'R5-F2', recency: 5, frequency: 2, title: 'R5-F2: Potential Loyalist', segment: 'Potential Loyalist', patientCount: 140, monetaryThb: 3900000, monetaryFormatted: '฿3.9M', bookedThisMonth: 41, bgColorClass: 'bg-surface-container-high text-primary', textColorClass: 'text-primary' },

  // ROW 1 (F1)
  { cell: 'R1-F1', recency: 1, frequency: 1, title: 'R1-F1: Lost (ไม่มา > 1 ปี)', segment: 'Lost', patientCount: 1098, monetaryThb: 9800000, monetaryFormatted: '฿9.8M', bookedThisMonth: 2, bgColorClass: 'bg-surface-container-high text-outline', textColorClass: 'text-outline' },
  { cell: 'R2-F1', recency: 2, frequency: 1, title: 'R2-F1: Hibernating', segment: 'Hibernating', patientCount: 210, monetaryThb: 2200000, monetaryFormatted: '฿2.2M', bookedThisMonth: 4, bgColorClass: 'bg-surface-container text-on-surface-variant', textColorClass: 'text-on-surface' },
  { cell: 'R3-F1', recency: 3, frequency: 1, title: 'R3-F1: Promising', segment: 'New Patients', patientCount: 190, monetaryThb: 2800000, monetaryFormatted: '฿2.8M', bookedThisMonth: 15, bgColorClass: 'bg-surface-container-high text-on-surface', textColorClass: 'text-on-surface' },
  { cell: 'R4-F1', recency: 4, frequency: 1, title: 'R4-F1: New Patients', segment: 'New Patients', patientCount: 290, monetaryThb: 4100000, monetaryFormatted: '฿4.1M', bookedThisMonth: 48, bgColorClass: 'bg-secondary-fixed/50 text-secondary', textColorClass: 'text-secondary' },
  { cell: 'R5-F1', recency: 5, frequency: 1, title: 'R5-F1: New Patients (Fresh)', segment: 'New Patients', patientCount: 330, monetaryThb: 5400000, monetaryFormatted: '฿5.4M', bookedThisMonth: 92, bgColorClass: 'bg-secondary-fixed/50 text-secondary', textColorClass: 'text-secondary' }
];

export const INITIAL_KANBAN_ITEMS: KanbanItem[] = [
  // Column 1: Pending
  {
    id: 'k-1',
    patientName: 'คุณอรัญญา ว.',
    hn: '6604-00129',
    avatarUrl: PATIENT_PORTRAIT_ARANYA,
    initials: 'อร',
    segment: 'Champions',
    procedureTag: "Botox Crow's feet",
    lastDaysAgo: 115,
    overdueText: 'เกินกำหนดวงรอบ',
    notes: 'โทรเตือนรอบ Retouch ริ้วรอยหางตา (เคยทำ Dysport 50U)',
    assignedStaff: 'น้องแนน',
    status: 'pending'
  },
  {
    id: 'k-2',
    patientName: 'คุณธนภัทร ร.',
    hn: '6511-00843',
    avatarUrl: PATIENT_PORTRAIT_THANAPHAT,
    initials: 'ธภ',
    segment: 'Champions',
    procedureTag: 'Ultraformer MPT',
    lastDaysAgo: 270,
    overdueText: 'Annual Maintenance',
    notes: 'ถึงรอบกระตุ้นคอลลาเจนรายปี ยอดใช้จ่ายสะสม ฿180,000',
    assignedStaff: 'CRM VIP Assigned',
    status: 'pending'
  },
  {
    id: 'k-3',
    patientName: 'คุณเมทินี ก.',
    hn: '6610-00351',
    initials: 'มก',
    segment: 'Need Attention',
    procedureTag: 'คอร์สคงเหลือ 4 ครั้ง',
    lastDaysAgo: 60,
    overdueText: 'ขาดการติดต่อ > 60 วัน',
    notes: 'คอร์ส Diode Laser คงเหลือ 4 ครั้ง (ไม่ได้มารับบริการ 60 วัน)',
    assignedStaff: 'พี่ก้อย',
    status: 'pending'
  },

  // Column 2: Booked
  {
    id: 'k-4',
    patientName: 'คุณสมศรี ม.',
    hn: '6508-00441',
    avatarUrl: PATIENT_PORTRAIT_SOMSREE_M,
    initials: 'สม',
    segment: 'Champions',
    procedureTag: 'นัดสำเร็จ',
    lastDaysAgo: 14,
    overdueText: 'คอนเฟิร์มแล้ว',
    notes: 'นัดตรวจติดตาม Botox กราม + Retouch ริ้วรอยหน้าผาก',
    assignedStaff: 'พญ. พิมพ์ชนก',
    status: 'booked',
    bookingDate: 'เสาร์ 9 มี.ค. 14:00 น.',
    bookingDoctor: 'พญ. พิมพ์ชนก'
  },
  {
    id: 'k-5',
    patientName: 'คุณวิภาดา ต.',
    hn: '6602-00512',
    initials: 'วต',
    segment: 'Potential Loyalist',
    procedureTag: 'คอนเฟิร์มแล้ว',
    lastDaysAgo: 18,
    overdueText: 'เตือนอัตโนมัติ T-24hr',
    notes: 'นัดทำ Meso Brightening คอร์สต่อเนื่อง ครั้งที่ 3/5',
    assignedStaff: 'Skin Suite 02',
    status: 'booked',
    bookingDate: 'อาทิตย์ 10 มี.ค. 11:30 น.',
    room: 'Skin Suite 02'
  },

  // Column 3: Follow-up Again
  {
    id: 'k-6',
    patientName: 'คุณวิชัย ส.',
    hn: '6412-00918',
    initials: 'วส',
    segment: 'At Risk',
    procedureTag: 'ไม่รับสาย (2/3 ครั้ง)',
    lastDaysAgo: 210,
    overdueText: 'โทรไม่ติด',
    notes: 'ไม่รับสายรอบที่ 2 ระบบตั้งเวลากระตุ้นผ่าน LINE Voucher ส่วนลดอัตโนมัติ (อีก 24 ชม.)',
    assignedStaff: 'Call Center',
    status: 'followup',
    followupAttempts: '2/3 ครั้ง',
    lastCallTime: 'วันนี้ 10:15 น.',
    autoFallbackActive: true
  }
];

export const INITIAL_AUDIT_LOGS: AuditRecord[] = [
  {
    id: 'log-1',
    timestamp: '2025-02-24 14:28:11',
    staffName: 'พญ. พิมพ์ชนก (Admin)',
    staffRole: 'Clinic Manager',
    staffInitials: 'พพ',
    dataset: 'Champions_VIP_Cohort_Q1.xlsx',
    recordsCount: 312,
    purpose: 'โทรนัดหมายโปรแกรม Exclusive Care ประจำปี',
    ipAddress: '192.168.1.104',
    device: 'Clinic Mac-01',
    securityBadge: 'Verified 2FA',
    securityType: '2fa'
  },
  {
    id: 'log-2',
    timestamp: '2025-02-23 18:05:40',
    staffName: 'คุณ ชญาดา (Staff)',
    staffRole: 'CRM Coordinator',
    staffInitials: 'ชญ',
    dataset: 'AtRisk_FollowUp_List.csv',
    recordsCount: 428,
    purpose: 'ประสานงาน LINE Official Call Center',
    ipAddress: '192.168.1.118',
    device: 'CRM Win-PC',
    securityBadge: 'Masked Export',
    securityType: 'masked'
  },
  {
    id: 'log-3',
    timestamp: '2025-02-21 11:12:03',
    staffName: 'พญ. พิมพ์ชนก (Admin)',
    staffRole: 'Clinic Manager',
    staffInitials: 'พพ',
    dataset: 'Annual_Audit_PDPA_Consents.xlsx',
    recordsCount: 3840,
    purpose: 'ส่งตรวจประเมินรับรองมาตรฐานคลินิกประจำปี',
    ipAddress: '192.168.1.104',
    device: 'Clinic Mac-01',
    securityBadge: 'Verified 2FA',
    securityType: '2fa'
  },
  {
    id: 'log-4',
    timestamp: '2025-02-18 09:44:22',
    staffName: 'System HIS Sync (Automated)',
    staffRole: 'Cron Background Batch',
    staffInitials: 'SYS',
    dataset: 'HIS_Daily_Reconciliation.json',
    recordsCount: 89,
    purpose: 'ซิงค์ประวัติใบเสร็จและหัตถการเข้า RFM Engine',
    ipAddress: '127.0.0.1',
    device: 'Localhost API',
    securityBadge: 'System Encrypted',
    securityType: 'encrypted'
  }
];

export const INITIAL_CLINICAL_RULES: ClinicalRule[] = [
  {
    id: 'rule-1',
    ruleNumber: 'Rule 01 • Active',
    title: 'Toxin / Botox Cycle',
    type: 'Active',
    enabled: true,
    conditions: [
      'IF last_treatment_days >= 90',
      'AND rfm_segment IN',
      "['Champions', 'Loyal', 'Potential']"
    ],
    actionDescription: 'มอบหมายงานเซลส์ประจำเคสอัตโนมัติ + ส่ง LINE Care Reminder ชวนประเมินความกระชับ',
    statsLabel: 'Success Rate',
    statsValue: '68.4%',
    triggersText: 'ประมวลผลทุกวัน 02:00 น.'
  },
  {
    id: 'rule-2',
    ruleNumber: 'Rule 02 • Critical',
    title: 'High Value At-Risk Churn Alert',
    type: 'Critical',
    enabled: true,
    conditions: [
      'IF R_score <= 2',
      'AND M_score >= 4',
      '(High Spender Churning)'
    ],
    actionDescription: 'ส่งการแจ้งเตือนระดับ High Priority ด่วนพิเศษถึง Clinic Manager (พญ. พิมพ์ชนก) ทันที',
    statsLabel: 'Triggers',
    statsValue: '14 เคส/เดือน',
    triggersText: 'แจ้งเตือน Real-time ทาง LINE Notify & Dashboard'
  },
  {
    id: 'rule-3',
    ruleNumber: 'Rule 03 • Compliance',
    title: 'Anti-fatigue Frequency Cap',
    type: 'Compliance',
    enabled: true,
    conditions: [
      'IF broadcast_count_7d >= 2',
      'THEN Suppress All Automated Pushes',
      'PDPA & LINE Policy OK'
    ],
    actionDescription: 'จำกัดการส่ง LINE Broadcast ไม่เกิน 2 ข้อความ/สัปดาห์/คนไข้ ป้องกันการบล็อกและรบกวนคนไข้',
    statsLabel: 'Block Rate',
    statsValue: '< 0.8% (Optimal)',
    triggersText: 'ตรวจเช็คก่อนบรอดแคสต์ทุกรอบ'
  }
];
