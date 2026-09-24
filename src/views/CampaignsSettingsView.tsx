import React, { useState } from 'react';
import { AuditRecord } from '../types';
import {
  CLINIC_LOGO_URL,
  CLINIC_BANNER_URL,
  INITIAL_AUDIT_LOGS
} from '../data/mockData';

interface CampaignsSettingsViewProps {
  initialTab?: 'broadcast' | 'scoring' | 'pdpa';
  onShowToast: (msg: string, sub?: string, type?: 'success' | 'info' | 'warning') => void;
}

export const CampaignsSettingsView: React.FC<CampaignsSettingsViewProps> = ({
  initialTab = 'broadcast',
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'broadcast' | 'scoring' | 'pdpa'>(initialTab);

  // Sync if initialTab prop changes
  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Campaign State
  const [selectedSegments, setSelectedSegments] = useState<string[]>(['Champions', 'At Risk']);
  const [campaignTitle, setCampaignTitle] = useState('Exclusive VIP Botox Retouch Reminder & Privilege');
  const [messageType, setMessageType] = useState<'flex' | 'rich' | 'text'>('flex');
  const [messageBody, setMessageBody] = useState(
    'สวัสดีค่ะ {{patient_name}} ทางคลินิกตรวจพบว่าครบกำหนดวงรอบเติม {{last_treatment}} ครบ 90 วันแล้วนะคะ เพื่อผลลัพธ์รูปหน้าที่กระชับต่อเนื่อง พญ. พิมพ์ชนก ขอมอบ Privilege Voucher มูลค่า ฿1,000 สำหรับการจองคิวในสัปดาห์นี้ค่ะ'
  );
  const [voucherCode, setVoucherCode] = useState('VIP-RETOUCH-1000');
  const [scheduleType, setScheduleType] = useState<'instant' | 'scheduled'>('instant');
  const [scheduledTime, setScheduledTime] = useState('วันนี้ 11:30 น.');
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  // Scoring Thresholds State
  const [scoringMode, setScoringMode] = useState<'rule' | 'quintile'>('rule');

  // Audit Logs State
  const [auditLogs] = useState<AuditRecord[]>(INITIAL_AUDIT_LOGS);
  const [auditSearch, setAuditSearch] = useState('');

  // Merge tag inserter
  const handleInsertTag = (tag: string) => {
    setMessageBody((prev) => prev + ' ' + tag);
    onShowToast(`แทรกตัวแปร ${tag} แล้ว`, 'ระบบจะแทนค่าจริงของคนไข้แต่ละรายอัตโนมัติ', 'info');
  };

  // Audience calculation
  const audienceCount = 
    (selectedSegments.includes('Champions') ? 312 : 0) +
    (selectedSegments.includes('At Risk') ? 428 : 0) +
    (selectedSegments.includes('Need Attention') ? 490 : 0) +
    (selectedSegments.includes('New Patients') ? 620 : 0);
  const antiFatigueDeduction = 28;
  const netAudience = Math.max(0, audienceCount - antiFatigueDeduction);

  const toggleSegment = (seg: string) => {
    if (selectedSegments.includes(seg)) {
      setSelectedSegments(selectedSegments.filter((s) => s !== seg));
    } else {
      setSelectedSegments([...selectedSegments, seg]);
    }
  };

  const handleTestSend = () => {
    onShowToast('ส่งข้อความทดสอบเข้า LINE Admin แล้ว', 'กรุณาตรวจสอบข้อความ Flex Message บนมือถือของท่าน', 'success');
  };

  const handleBroadcast = () => {
    setIsBroadcasting(true);
    onShowToast('กำลังจัดส่ง LINE OA Broadcast...', `ยิงข้อความไปยังคนไข้ ${netAudience} รายการ`, 'info');
    setTimeout(() => {
      setIsBroadcasting(false);
      onShowToast(`ยิง Broadcast สำเร็จเรียบร้อย!`, `จัดส่งถึง ${netAudience} คนไข้ (PDPA Compliant)`, 'success');
    }, 1200);
  };

  // Generate preview text substituting tags with demo values
  const previewText = messageBody
    .replace(/\{\{patient_name\}\}/g, 'คุณสมศรี มหานคร')
    .replace(/\{\{last_treatment\}\}/g, 'Botox Jawline & Retouch')
    .replace(/\{\{doctor_name\}\}/g, 'พญ. พิมพ์ชนก')
    .replace(/\{\{voucher_code\}\}/g, voucherCode);

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Top Header Ribbon with Metrics */}
      <section className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border border-surface-container-low">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#06C755]/15 text-[#06C755] flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">campaign</span>
          </div>
          <div>
            <h1 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              LINE OA Campaigns & RFM Engine Settings
            </h1>
            <p className="font-caption text-caption text-on-surface-variant">
              ระบบส่งข้อความเฉพาะบุคคลผ่าน LINE Official Account, ปรับเกณฑ์คะแนน RFM และบันทึก Audit PDPA
            </p>
          </div>
        </div>

        {/* Quota & Guard Metrics */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-surface-container-low px-3 py-2 rounded-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary text-[18px]">mark_chat_read</span>
            <div className="flex flex-col">
              <span className="font-caption text-[11px] text-on-surface-variant font-medium">โควตา LINE OA ประจำเดือน</span>
              <span className="font-label-sm text-label-sm font-bold text-on-surface">
                48,250 / 60,000 <span className="text-secondary font-medium">(เหลือ 11,750)</span>
              </span>
            </div>
          </div>

          <div className="bg-surface-container-low px-3 py-2 rounded-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[18px]">verified_user</span>
            <div className="flex flex-col">
              <span className="font-caption text-[11px] text-on-surface-variant font-medium">PDPA Consent Rate</span>
              <span className="font-label-sm text-label-sm font-bold text-secondary">96.8% (Verified)</span>
            </div>
          </div>

          <div className="bg-surface-container-low px-3 py-2 rounded-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-error text-[18px]">shield</span>
            <div className="flex flex-col">
              <span className="font-caption text-[11px] text-on-surface-variant font-medium">Anti-fatigue Guard</span>
              <span className="font-label-sm text-label-sm font-bold text-error">7 วัน / 1 ข้อความ</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tab Bar */}
      <section className="bg-surface-container-lowest rounded-xl shadow-sm p-1.5 flex flex-wrap gap-1 border border-surface-container-low">
        <button
          onClick={() => setActiveTab('broadcast')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
            activeTab === 'broadcast'
              ? 'bg-primary-container text-on-primary font-bold shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">send</span>
          <span>LINE OA Broadcast & Personalized Campaigns</span>
        </button>

        <button
          onClick={() => setActiveTab('scoring')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
            activeTab === 'scoring'
              ? 'bg-primary-container text-on-primary font-bold shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          <span>RFM Scoring Threshold Configuration</span>
        </button>

        <button
          onClick={() => setActiveTab('pdpa')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
            activeTab === 'pdpa'
              ? 'bg-primary-container text-on-primary font-bold shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">policy</span>
          <span>PDPA Consent & Audit Trail Logs</span>
        </button>
      </section>

      {/* TAB 1: LINE OA Broadcast Designer & Live Preview */}
      {activeTab === 'broadcast' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Target Selector & Message Designer (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Step 1: Segment Target Selector */}
            <section className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-surface-container-low flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary font-bold font-caption text-[12px] flex items-center justify-center">
                    1
                  </span>
                  <h3 className="font-title-md text-title-md text-on-surface font-bold">
                    กำหนดกลุ่มเป้าหมาย RFM (Segment Target Selector)
                  </h3>
                </div>
                <span className="font-caption text-caption text-secondary font-semibold">
                  เลือกแล้ว {selectedSegments.length} กลุ่ม
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: 'Champions', count: 312, color: 'border-tertiary-container text-tertiary' },
                  { name: 'At Risk', count: 428, color: 'border-error text-error' },
                  { name: 'Need Attention', count: 490, color: 'border-secondary text-secondary' },
                  { name: 'New Patients', count: 620, color: 'border-primary text-primary' }
                ].map((seg) => {
                  const isChecked = selectedSegments.includes(seg.name);
                  return (
                    <button
                      key={seg.name}
                      onClick={() => toggleSegment(seg.name)}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                        isChecked
                          ? `bg-primary-fixed/25 border-primary shadow-xs ring-1 ring-primary`
                          : 'bg-surface-container-low border-surface-container hover:bg-surface-container'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-sm text-label-sm font-bold text-on-surface">
                          {seg.name}
                        </span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="rounded text-primary pointer-events-none"
                        />
                      </div>
                      <span className="font-title-md text-title-md font-bold text-primary">
                        {seg.count} <span className="font-caption text-caption text-on-surface-variant font-normal">คน</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Real-time Audience Calculator box */}
              <div className="p-4 bg-surface-container-low rounded-xl border border-surface-container flex flex-col gap-2">
                <div className="flex items-center justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">ประเมินผู้รับข้อความทั้งหมด:</span>
                  <span className="font-bold text-on-surface">{audienceCount} คน</span>
                </div>
                <div className="flex items-center justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">ผ่านเงื่อนไขความยินยอม PDPA Consent:</span>
                  <span className="font-semibold text-tertiary">100% ({audienceCount} คน)</span>
                </div>
                <div className="flex items-center justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">ตัดคนไข้ที่เพิ่งได้รับ Broadcast ใน 7 วัน (Anti-fatigue):</span>
                  <span className="font-semibold text-error">-{antiFatigueDeduction} คน</span>
                </div>
                <div className="pt-2 border-t border-surface-container-high flex items-center justify-between">
                  <span className="font-label-md text-label-md font-bold text-primary">
                    ยอดส่งจริงสุทธิ (Net Reach):
                  </span>
                  <span className="font-headline-sm text-headline-sm font-bold text-primary">
                    {netAudience} <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">ข้อความ</span>
                  </span>
                </div>
              </div>
            </section>

            {/* Step 2: Campaign Message Designer */}
            <section className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-surface-container-low flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary font-bold font-caption text-[12px] flex items-center justify-center">
                    2
                  </span>
                  <h3 className="font-title-md text-title-md text-on-surface font-bold">
                    ออกแบบเนื้อหาและข้อความ (Campaign Message Designer)
                  </h3>
                </div>
                <span className="font-caption text-caption text-on-surface-variant">
                  รองรับ Dynamic Personalization
                </span>
              </div>

              {/* Campaign Title */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm font-semibold text-on-surface">
                  ชื่อแคมเปญ (Internal Name)
                </label>
                <input
                  value={campaignTitle}
                  onChange={(e) => setCampaignTitle(e.target.value)}
                  className="w-full h-10 px-3 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container"
                />
              </div>

              {/* Message Type Selector */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm font-semibold text-on-surface">
                  รูปแบบข้อความ (Message Type)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'flex', label: 'Flex Message (การ์ดคลินิก)', icon: 'dashboard_customize' },
                    { id: 'rich', label: 'Rich Message (รูปภาพ 1:1)', icon: 'image' },
                    { id: 'text', label: 'Text & Quick Reply', icon: 'short_text' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setMessageType(t.id as any)}
                      className={`py-2 px-2.5 rounded-lg border font-caption text-caption flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        messageType === t.id
                          ? 'bg-primary-container text-on-primary font-bold border-primary shadow-xs'
                          : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container border-transparent'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">{t.icon}</span>
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Merge Tags */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm font-semibold text-on-surface flex items-center justify-between">
                  <span>Dynamic Merge Tags (คลิกเพื่อแทรกลงในข้อความ)</span>
                  <span className="font-caption text-caption text-secondary font-normal">แทรกค่าจริงจากเวชระเบียน</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { tag: '{{patient_name}}', label: 'ชื่อคนไข้' },
                    { tag: '{{last_treatment}}', label: 'หัตถการล่าสุด' },
                    { tag: '{{doctor_name}}', label: 'แพทย์ผู้ดูแล' },
                    { tag: '{{voucher_code}}', label: 'รหัสคูปอง' }
                  ].map((m) => (
                    <button
                      key={m.tag}
                      onClick={() => handleInsertTag(m.tag)}
                      className="px-2.5 py-1 rounded-md bg-secondary-fixed text-on-secondary-fixed-variant font-mono font-caption text-[11px] font-semibold hover:bg-secondary-fixed-dim transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">add</span>
                      <span>{m.tag}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Body Textarea */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="font-label-sm text-label-sm font-semibold text-on-surface">
                    ข้อความบรอดแคสต์ (Message Copy)
                  </label>
                  <span className="font-caption text-caption text-on-surface-variant">
                    {messageBody.length} / 500 ตัวอักษร
                  </span>
                </div>
                <textarea
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  rows={4}
                  className="w-full p-3 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container resize-none"
                />
              </div>

              {/* Voucher Code */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm font-semibold text-on-surface">
                  รหัส Voucher สิทธิพิเศษ (Unique Promo Code)
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-secondary text-[18px]">
                    confirmation_number
                  </span>
                  <input
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 bg-surface-container-low rounded-lg font-mono font-body-sm text-body-sm text-primary font-bold focus:outline-none focus:ring-2 focus:ring-primary-container"
                  />
                </div>
              </div>

              {/* Schedule Type */}
              <div className="flex flex-col gap-2 pt-1">
                <label className="font-label-sm text-label-sm font-semibold text-on-surface">
                  กำหนดการส่ง (Delivery Schedule)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <label className={`p-3 rounded-lg border flex items-center gap-2.5 cursor-pointer transition-all ${
                    scheduleType === 'instant' ? 'bg-primary-fixed/20 border-primary' : 'bg-surface-container-low border-transparent'
                  }`}>
                    <input
                      type="radio"
                      name="schedule"
                      checked={scheduleType === 'instant'}
                      onChange={() => setScheduleType('instant')}
                      className="text-primary"
                    />
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm font-bold text-on-surface">ส่งทันทีเมื่อกดยืนยัน</span>
                      <span className="font-caption text-caption text-on-surface-variant">Instant Broadcast</span>
                    </div>
                  </label>

                  <label className={`p-3 rounded-lg border flex items-center gap-2.5 cursor-pointer transition-all ${
                    scheduleType === 'scheduled' ? 'bg-primary-fixed/20 border-primary' : 'bg-surface-container-low border-transparent'
                  }`}>
                    <input
                      type="radio"
                      name="schedule"
                      checked={scheduleType === 'scheduled'}
                      onChange={() => setScheduleType('scheduled')}
                      className="text-primary"
                    />
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm font-bold text-on-surface">ตั้งเวลาส่งล่วงหน้า (Peak Time)</span>
                      <span className="font-caption text-caption text-secondary font-medium">แนะนำ: วันนี้ 11:30 น.</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-surface-container">
                <button
                  onClick={handleTestSend}
                  className="flex items-center gap-1.5 h-10 px-4 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-md text-label-md font-semibold transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">cell_tower</span>
                  <span>ทดสอบส่งเข้า LINE ส่วนตัว</span>
                </button>

                <button
                  onClick={() => onShowToast('บันทึกฉบับร่างแคมเปญแล้ว', 'สามารถกลับมาแก้ไขหรือส่งในภายหลังได้', 'info')}
                  className="flex items-center gap-1.5 h-10 px-4 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">draft</span>
                  <span>บันทึกฉบับร่าง</span>
                </button>

                <button
                  onClick={handleBroadcast}
                  disabled={isBroadcasting || netAudience === 0}
                  className="flex-1 flex items-center justify-center gap-2 h-10 px-5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <span className={`material-symbols-outlined text-[18px] ${isBroadcasting ? 'animate-spin' : ''}`}>
                    rocket_launch
                  </span>
                  <span>ยืนยันยิง Broadcast ({netAudience} คน)</span>
                </button>
              </div>
            </section>
          </div>

          {/* Right Column: Live Mobile Preview (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3 sticky top-20">
            <div className="flex items-center justify-between px-2">
              <span className="font-title-md text-title-md font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">smartphone</span>
                <span>Live LINE OA Preview</span>
              </span>
              <span className="font-caption text-caption text-on-surface-variant">
                มุมมองบนสมาร์ทโฟนของคนไข้
              </span>
            </div>

            {/* Mobile Device Frame */}
            <div className="mx-auto w-full max-w-[360px] bg-[#222a36] rounded-[38px] p-3 shadow-2xl border-4 border-surface-container-high">
              {/* Speaker / Camera notch */}
              <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#111] mr-2"></div>
                <div className="w-8 h-1 rounded-full bg-[#333]"></div>
              </div>

              {/* LINE App Header */}
              <div className="bg-[#1f232b] text-white px-3 py-2.5 rounded-t-[24px] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-white/70">chevron_left</span>
                  <div className="flex items-center gap-1.5">
                    <img
                      src={CLINIC_LOGO_URL}
                      alt="Clinic"
                      className="w-6 h-6 rounded-full bg-white object-contain p-0.5"
                    />
                    <div className="flex items-center gap-1">
                      <span className="text-[13px] font-bold tracking-tight">Clinic RFM Engine</span>
                      <span className="w-3.5 h-3.5 rounded-full bg-[#06C755] flex items-center justify-center text-[9px]">
                        ✓
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <span className="material-symbols-outlined text-[18px]">search</span>
                  <span className="material-symbols-outlined text-[18px]">menu</span>
                </div>
              </div>

              {/* Chat Canvas Background */}
              <div className="bg-[#8c9daf] min-h-[460px] p-3 flex flex-col justify-start gap-2 overflow-hidden">
                {/* Timestamp */}
                <div className="text-center my-1">
                  <span className="px-2 py-0.5 rounded-full bg-black/20 text-white font-caption text-[10px]">
                    วันนี้ 11:30 น.
                  </span>
                </div>

                {/* LINE Flex Bubble */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 animate-in fade-in duration-300">
                  {/* Hero Banner */}
                  <div className="relative h-32 w-full overflow-hidden bg-gray-100">
                    <img
                      src={CLINIC_BANNER_URL}
                      alt="Clinic Atmosphere"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-primary text-on-primary font-caption text-[10px] font-bold shadow-xs">
                      EXCLUSIVE VIP PRIVILEGE
                    </div>
                  </div>

                  {/* Bubble Body */}
                  <div className="p-3.5 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                        Medical Aesthetic Care
                      </span>
                      <span className="text-[10px] text-gray-500 font-medium">พญ. พิมพ์ชนก</span>
                    </div>

                    <h4 className="text-[14px] font-bold text-gray-900 leading-snug">
                      {campaignTitle}
                    </h4>

                    {/* Live Preview Text */}
                    <p className="text-[12px] text-gray-700 leading-relaxed bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                      {previewText}
                    </p>

                    {/* Voucher Block */}
                    <div className="mt-1 p-2 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-blue-700 uppercase font-semibold">
                          Voucher Code ของคุณ
                        </span>
                        <span className="font-mono text-[13px] font-bold text-blue-900">
                          {voucherCode}
                        </span>
                      </div>
                      <span className="px-2 py-1 rounded bg-blue-600 text-white text-[10px] font-bold shadow-xs">
                        COPY
                      </span>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col gap-1.5 mt-2">
                      <button
                        onClick={() => onShowToast('กดปุ่มจำลองการจองคิวผ่าน LINE', 'ระบบจะเปิดหน้า Booking Form', 'info')}
                        className="w-full py-2 rounded-lg bg-[#06C755] hover:bg-[#05a847] text-white font-bold text-[12px] transition-colors shadow-xs"
                      >
                        จองคิวนัดหมายผ่าน LINE
                      </button>
                      <button
                        onClick={() => onShowToast('กดปุ่มจำลองการสอบถามแอดมิน', 'เปิดช่องแชท 1-on-1 กับแอดมินคลินิก', 'info')}
                        className="w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-[12px] transition-colors"
                      >
                        สอบถามแอดมินคลินิก
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Input Bar */}
              <div className="bg-[#1f232b] px-3 py-2 rounded-b-[24px] flex items-center gap-2 text-white/70">
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                <div className="flex-1 h-7 bg-[#2d323e] rounded-full px-3 text-[11px] flex items-center text-white/40">
                  พิมพ์ข้อความ...
                </div>
                <span className="material-symbols-outlined text-[18px] text-[#06C755]">mic</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RFM Scoring Threshold Configuration */}
      {activeTab === 'scoring' && (
        <div className="flex flex-col gap-6">
          <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-surface-container-low flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-surface-container">
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface font-bold">
                  RFM Scoring Engine & Clinical Threshold Calibration
                </h3>
                <p className="font-caption text-caption text-on-surface-variant">
                  ปรับตั้งค่าช่วงคะแนน Recency, Frequency, Monetary เพื่อให้สอดคล้องกับพฤติกรรมคนไข้คลินิก
                </p>
              </div>

              {/* Scoring Mode Switch */}
              <div className="flex items-center bg-surface-container-low p-1 rounded-lg">
                <button
                  onClick={() => setScoringMode('rule')}
                  className={`px-3 py-1.5 rounded-md font-label-sm text-label-sm font-semibold transition-all ${
                    scoringMode === 'rule'
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Rule-Based Clinical (แนะนำสำหรับคลินิก)
                </button>
                <button
                  onClick={() => setScoringMode('quintile')}
                  className={`px-3 py-1.5 rounded-md font-label-sm text-label-sm font-semibold transition-all ${
                    scoringMode === 'quintile'
                      ? 'bg-surface-container-lowest text-secondary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Quintile Distribution (คำนวณตามสัดส่วน 20%)
                </button>
              </div>
            </div>

            {/* Threshold Matrix Table */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Recency Scale */}
              <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-title-md text-title-md font-bold text-primary">Recency (R)</span>
                  <span className="font-caption text-caption text-on-surface-variant">ความสดใหม่การเข้าตรวจ</span>
                </div>
                <div className="flex flex-col gap-2 font-body-sm text-body-sm">
                  {[
                    { score: 5, range: '≤ 45 วัน', label: 'Fresh Visit', pct: 28 },
                    { score: 4, range: '46 - 90 วัน', label: 'Active Care', pct: 22 },
                    { score: 3, range: '91 - 180 วัน', label: 'Retouch Window', pct: 24 },
                    { score: 2, range: '181 - 365 วัน', label: 'Dormant Warning', pct: 16 },
                    { score: 1, range: '> 365 วัน', label: 'Lost / Churn', pct: 10 }
                  ].map((r) => (
                    <div key={r.score} className="p-2 bg-surface-container-lowest rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-primary-fixed text-primary font-bold font-caption flex items-center justify-center">
                          {r.score}
                        </span>
                        <span className="font-semibold text-on-surface">{r.range}</span>
                      </div>
                      <span className="font-caption text-caption text-on-surface-variant">{r.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frequency Scale */}
              <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-title-md text-title-md font-bold text-secondary">Frequency (F)</span>
                  <span className="font-caption text-caption text-on-surface-variant">ความถี่ในการรับบริการ</span>
                </div>
                <div className="flex flex-col gap-2 font-body-sm text-body-sm">
                  {[
                    { score: 5, range: '≥ 10 ครั้ง/ปี', label: 'VIP Regular', pct: 12 },
                    { score: 4, range: '6 - 9 ครั้ง/ปี', label: 'Frequent', pct: 18 },
                    { score: 3, range: '3 - 5 ครั้ง/ปี', label: 'Moderate', pct: 30 },
                    { score: 2, range: '2 ครั้ง/ปี', label: 'Occasional', pct: 22 },
                    { score: 1, range: '1 ครั้ง/ปี', label: 'Single Trial', pct: 18 }
                  ].map((f) => (
                    <div key={f.score} className="p-2 bg-surface-container-lowest rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-secondary-container text-secondary font-bold font-caption flex items-center justify-center">
                          {f.score}
                        </span>
                        <span className="font-semibold text-on-surface">{f.range}</span>
                      </div>
                      <span className="font-caption text-caption text-on-surface-variant">{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monetary Scale */}
              <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-title-md text-title-md font-bold text-tertiary">Monetary (M)</span>
                  <span className="font-caption text-caption text-on-surface-variant">ยอดใช้จ่ายสะสม (12 เดือน)</span>
                </div>
                <div className="flex flex-col gap-2 font-body-sm text-body-sm">
                  {[
                    { score: 5, range: '≥ ฿150,000', label: 'High Spender VIP', pct: 8 },
                    { score: 4, range: '฿80,000 - ฿149,999', label: 'Tier-A Premium', pct: 14 },
                    { score: 3, range: '฿35,000 - ฿79,999', label: 'Tier-B Standard', pct: 32 },
                    { score: 2, range: '฿12,000 - ฿34,999', label: 'Tier-C Basic', pct: 28 },
                    { score: 1, range: '< ฿12,000', label: 'Entry Trial', pct: 18 }
                  ].map((m) => (
                    <div key={m.score} className="p-2 bg-surface-container-lowest rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-tertiary-fixed text-tertiary font-bold font-caption flex items-center justify-center">
                          {m.score}
                        </span>
                        <span className="font-semibold text-on-surface">{m.range}</span>
                      </div>
                      <span className="font-caption text-caption text-on-surface-variant">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Impact Visualization Simulation */}
            <div className="p-4 bg-surface-container-low rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[28px]">insights</span>
                <div>
                  <h4 className="font-title-md text-title-md font-bold text-on-surface">
                    Simulation Impact Visualization
                  </h4>
                  <p className="font-caption text-caption text-on-surface-variant">
                    เกณฑ์นี้จะจัดกลุ่มคนไข้ 4,520 คน ออกเป็น Champions 312 คน (6.9%) และ At Risk 428 คน (9.4%)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onShowToast('จำลองผลลัพธ์การคำนวณเรียบร้อย', 'ไม่มีความผิดปกติของข้อมูล cohort distribution', 'info')}
                  className="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md font-semibold cursor-pointer"
                >
                  จำลองผลลัพธ์ (Simulate)
                </button>
                <button
                  onClick={() => onShowToast('บันทึกเกณฑ์การคำนวณเรียบร้อย', 'เกณฑ์ใหม่จะมีผลกับการ Sync ครั้งถัดไป', 'success')}
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow-xs cursor-pointer"
                >
                  บันทึกเกณฑ์การคำนวณ
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* TAB 3: PDPA Consent & Audit Trail Logs */}
      {activeTab === 'pdpa' && (
        <div className="flex flex-col gap-6">
          {/* 3 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-container-low flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[26px]">gavel</span>
              </div>
              <div>
                <span className="font-caption text-caption uppercase text-on-surface-variant font-bold">
                  PDPA Compliance
                </span>
                <h4 className="font-title-lg text-title-lg font-bold text-on-surface">100% Consent Logged</h4>
                <span className="font-caption text-caption text-tertiary">บันทึกความยินยอมครบถ้วน</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-container-low flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[26px]">key</span>
              </div>
              <div>
                <span className="font-caption text-caption uppercase text-on-surface-variant font-bold">
                  Role-Based Masking
                </span>
                <h4 className="font-title-lg text-title-lg font-bold text-on-surface">Active Enforced</h4>
                <span className="font-caption text-caption text-primary">ซ่อนเบอร์และยอดเงินตามสิทธิ์</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-container-low flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[26px]">history_edu</span>
              </div>
              <div>
                <span className="font-caption text-caption uppercase text-on-surface-variant font-bold">
                  Export Logs 30 วัน
                </span>
                <h4 className="font-title-lg text-title-lg font-bold text-on-surface">14 ครั้ง (All Verified)</h4>
                <span className="font-caption text-caption text-secondary">ผ่านการตรวจสอบ 2FA</span>
              </div>
            </div>
          </div>

          {/* Audit Log Table */}
          <section className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-surface-container-low flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-container">
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface font-bold">
                  Data Access & Export Audit Trail
                </h3>
                <p className="font-caption text-caption text-on-surface-variant">
                  ประวัติการเข้าถึง ค้นหา และส่งออกข้อมูลเวชระเบียนคนไข้ตามมาตรา พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2.5 top-2 text-on-surface-variant text-[16px]">
                    search
                  </span>
                  <input
                    value={auditSearch}
                    onChange={(e) => setAuditSearch(e.target.value)}
                    placeholder="ค้นหาเจ้าหน้าที่ / Dataset..."
                    className="h-8 pl-8 pr-3 bg-surface-container-low rounded-lg font-caption text-caption text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <button
                  onClick={() => onShowToast('ส่งออกรายงาน Audit Log สำเร็จ', 'ดาวน์โหลดไฟล์ PDPA_Audit_Trail_Report.pdf แล้ว', 'success')}
                  className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-caption text-caption font-semibold cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                  <span>ดาวน์โหลด Log PDF</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant font-caption text-caption uppercase tracking-wider">
                    <th className="py-2.5 px-3">Timestamp</th>
                    <th className="py-2.5 px-3">เจ้าหน้าที่ & ตำแหน่ง</th>
                    <th className="py-2.5 px-3">Dataset / รายการข้อมูล</th>
                    <th className="py-2.5 px-2 text-right">จำนวนระเบียน</th>
                    <th className="py-2.5 px-3">วัตถุประสงค์ (Purpose)</th>
                    <th className="py-2.5 px-3">IP & Device</th>
                    <th className="py-2.5 px-3 text-center">สถานะความปลอดภัย</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container font-body-sm text-body-sm">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-surface-container-low/60 transition-colors">
                      <td className="py-3 px-3 font-mono font-caption text-caption text-on-surface-variant">
                        {log.timestamp}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-primary-fixed text-primary font-bold font-caption text-[11px] flex items-center justify-center">
                            {log.staffInitials}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                              {log.staffName}
                            </span>
                            <span className="font-caption text-caption text-on-surface-variant">
                              {log.staffRole}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono font-caption text-caption text-primary font-medium">
                        {log.dataset}
                      </td>
                      <td className="py-3 px-2 text-right font-bold text-on-surface">
                        {log.recordsCount.toLocaleString('th-TH')}
                      </td>
                      <td className="py-3 px-3 text-on-surface-variant font-caption text-caption">
                        {log.purpose}
                      </td>
                      <td className="py-3 px-3 font-mono font-caption text-caption text-on-surface-variant">
                        {log.ipAddress} • {log.device}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-caption text-caption font-bold ${
                          log.securityType === '2fa'
                            ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                            : log.securityType === 'masked'
                            ? 'bg-secondary-container text-on-secondary-container'
                            : 'bg-primary-fixed text-on-primary-fixed'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {log.securityBadge}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
