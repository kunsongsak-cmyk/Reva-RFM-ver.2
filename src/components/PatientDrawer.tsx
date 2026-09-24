import React, { useState } from 'react';
import { Patient } from '../types';

interface PatientDrawerProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveCallLog: (patientId: string, outcome: string, notes: string) => void;
  onOpenLineChat: (patient: Patient) => void;
  onBookAppointment: (patient: Patient) => void;
}

export const PatientDrawer: React.FC<PatientDrawerProps> = ({
  patient,
  isOpen,
  onClose,
  onSaveCallLog,
  onOpenLineChat,
  onBookAppointment
}) => {
  if (!isOpen || !patient) return null;

  const [callOutcome, setCallOutcome] = useState('นัดหมายสำเร็จ (Booked)');
  const [crmNotes, setCrmNotes] = useState(
    'คนไข้แจ้งสนใจโปรโมชันเติม Botox ริ้วรอยรอบดวงตาเพิ่ม สะดวกเข้าตรวจวันเสาร์ที่ 9 มี.ค. เวลา 14:00 น. พบ พญ. พิมพ์ชนก'
  );

  const handleSave = () => {
    onSaveCallLog(patient.id, callOutcome, crmNotes);
  };

  const segmentTagBg = 
    patient.segment === 'Champions' ? 'bg-tertiary-fixed text-on-tertiary-fixed' :
    patient.segment === 'At Risk' ? 'bg-error-container text-on-error-container' :
    patient.segment === 'New Patients' ? 'bg-secondary-fixed text-on-secondary-fixed-variant' :
    patient.segment === 'Need Attention' ? 'bg-secondary-container text-on-secondary-container' :
    'bg-primary-fixed text-on-primary-fixed-variant';

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 transition-opacity animate-in fade-in duration-200" 
      />

      {/* Slide-over Drawer Panel */}
      <aside 
        className="fixed top-0 right-0 bottom-0 w-full sm:w-[540px] bg-surface-container-lowest shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-out overflow-hidden animate-in slide-in-from-right duration-300 border-l border-surface-container-low"
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 bg-surface-container-lowest flex items-start justify-between border-b border-surface-container-low">
          <div className="flex items-center gap-4">
            {patient.avatarUrl ? (
              <img
                src={patient.avatarUrl}
                alt={patient.name}
                className="w-14 h-14 rounded-full object-cover shadow-sm ring-1 ring-outline-variant/30"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-secondary-container text-on-secondary-container font-bold text-lg flex items-center justify-center shadow-sm">
                {patient.avatarInitials}
              </div>
            )}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-headline-sm text-primary font-bold">
                  {patient.name}
                </span>
              </div>
              <span className="font-caption text-caption text-on-surface-variant font-medium">
                HN: {patient.hn} • เพศ: {patient.gender} • อายุ: {patient.age} ปี
              </span>
              <div className="mt-1 flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${segmentTagBg}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  {patient.segment} (VIP Top Tier)
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-caption text-caption font-mono">
                  Cell: {patient.rfmCell}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-6">
          {/* Component 1: RFM Score Meter */}
          <div className="bg-surface-container-low p-4 rounded-xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">analytics</span>
                <span className="font-title-md text-title-md text-on-surface font-semibold">RFM Score Breakdown</span>
              </div>
              <span className="font-caption text-caption text-tertiary font-bold px-2 py-0.5 rounded bg-tertiary-fixed">
                Overall: 98/100 (Elite)
              </span>
            </div>

            {/* Recency Bar */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between font-label-sm text-label-sm">
                <span className="font-semibold text-on-surface">Recency (R: {patient.recencyScore}/5)</span>
                <span className="text-tertiary font-medium">มาครั้งล่าสุด {patient.recencyDays} วันก่อน (ดีเยี่ยม)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div 
                  className="h-full rounded-full bg-tertiary transition-all duration-500" 
                  style={{ width: `${(patient.recencyScore / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Frequency Bar */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between font-label-sm text-label-sm">
                <span className="font-semibold text-on-surface">Frequency (F: {patient.frequencyScore}/5)</span>
                <span className="text-secondary font-medium">เข้ารับบริการ {patient.frequencyCount} ครั้งใน 12 เดือน</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div 
                  className="h-full rounded-full bg-secondary transition-all duration-500" 
                  style={{ width: `${(patient.frequencyScore / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Monetary Bar */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between font-label-sm text-label-sm">
                <span className="font-semibold text-on-surface">Monetary (M: {patient.monetaryScore}/5)</span>
                <span className="text-primary font-medium">฿{patient.monetaryValue.toLocaleString('th-TH')} (Top 2% ของคลินิก)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div 
                  className="h-full rounded-full bg-primary-container transition-all duration-500" 
                  style={{ width: `${(patient.monetaryScore / 5) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Component 2: Clinical Cycle Timeline */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">timelapse</span>
                <span className="font-title-md text-title-md text-on-surface font-semibold">
                  วงรอบหัตถการ (Clinical Cycle Tracker)
                </span>
              </div>
              <span className="font-caption text-caption text-on-surface-variant">
                อัปเดตจาก HIS แบบ Real-time
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {patient.treatmentTimeline && patient.treatmentTimeline.length > 0 ? (
                patient.treatmentTimeline.map((item) => (
                  <div key={item.id} className="p-3 bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-low flex flex-col gap-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span>
                        <span className="font-label-md text-label-md font-semibold text-on-surface">
                          {item.procedure}
                        </span>
                      </div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container text-on-secondary-fixed-variant font-caption text-caption font-semibold shrink-0">
                        {item.statusText}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pl-4 text-on-surface-variant font-caption text-caption">
                      <span>ทำไปเมื่อ {item.daysAgo} วันก่อน ({item.doctor})</span>
                      <span className="text-primary font-medium">{item.recommendation}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-low flex flex-col gap-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span>
                      <span className="font-label-md text-label-md font-semibold text-on-surface">
                        {patient.lastProcedure}
                      </span>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container text-on-secondary-fixed-variant font-caption text-caption font-semibold shrink-0">
                      {patient.clinicalCycleStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pl-4 text-on-surface-variant font-caption text-caption">
                    <span>ทำไปเมื่อ {patient.recencyDays} วันก่อน ({patient.lastDoctor})</span>
                    <span className="text-primary font-medium">แนะนำ: ติดตามผลการรักษาตามระยะ</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Component 3: Action & Call Log Form */}
          <div className="bg-surface-container-low p-4 rounded-xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">edit_note</span>
                <span className="font-title-md text-title-md text-on-surface font-semibold">
                  บันทึกผลการติดตาม (Call & Action Log)
                </span>
              </div>
              <span className="font-caption text-caption text-on-surface-variant">Logged by: พญ. พิมพ์ชนก</span>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant">ผลการติดต่อล่าสุด (Call Outcome)</label>
              <div className="relative">
                <select
                  value={callOutcome}
                  onChange={(e) => setCallOutcome(e.target.value)}
                  className="w-full h-10 px-3 pr-8 bg-surface-container-lowest rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container appearance-none shadow-xs border border-outline-variant/30"
                >
                  <option>นัดหมายสำเร็จ (Booked)</option>
                  <option>โทรติด - สนใจแต่ขอเช็กเวลา (Callback Requested)</option>
                  <option>โทรไม่ติด / ไม่รับสาย (No Answer)</option>
                  <option>ปฏิเสธ / ยังไม่พร้อมรับบริการ (Declined)</option>
                  <option>ส่งข้อมูลทาง LINE OA แล้ว (LINE Outreach Done)</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-on-surface-variant pointer-events-none text-[18px]">
                  expand_more
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant">รายละเอียดบันทึกการสนทนา (Clinical / CRM Notes)</label>
              <textarea
                value={crmNotes}
                onChange={(e) => setCrmNotes(e.target.value)}
                rows={3}
                className="w-full p-3 bg-surface-container-lowest rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container shadow-xs border border-outline-variant/30 resize-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-1.5 h-10 px-4 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-colors shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">save</span>
                <span>บันทึก Call Log</span>
              </button>
              <button
                onClick={() => onOpenLineChat(patient)}
                className="flex items-center justify-center gap-1.5 h-10 px-3.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container-high text-primary font-label-md text-label-md font-medium transition-colors shadow-xs border border-outline-variant/30 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-tertiary">chat</span>
                <span>LINE OA</span>
              </button>
              <button
                onClick={() => onBookAppointment(patient)}
                className="flex items-center justify-center gap-1.5 h-10 px-3.5 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-semibold hover:bg-on-secondary-container transition-colors shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">event_available</span>
                <span>บุ๊กกิ้งคิวนัดทันที</span>
              </button>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-surface-container-low flex items-center justify-between text-on-surface-variant font-caption text-caption border-t border-surface-container">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-tertiary">lock</span>
            <span>PDPA Audit ID: LOG-2024-0304-982</span>
          </div>
          <button 
            onClick={onClose}
            className="text-primary hover:underline font-medium cursor-pointer"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </aside>
    </>
  );
};
