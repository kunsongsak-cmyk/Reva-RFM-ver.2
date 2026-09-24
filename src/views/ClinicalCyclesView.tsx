import React, { useState } from 'react';
import { KanbanItem, ClinicalRule, Patient } from '../types';
import { INITIAL_KANBAN_ITEMS, INITIAL_CLINICAL_RULES } from '../data/mockData';

interface ClinicalCyclesViewProps {
  onShowToast: (msg: string, sub?: string, type?: 'success' | 'info' | 'warning') => void;
  onOpenPatientDrawerByName?: (name: string) => void;
  onOpenLineChatByName?: (name: string) => void;
}

export const ClinicalCyclesView: React.FC<ClinicalCyclesViewProps> = ({
  onShowToast,
  onOpenPatientDrawerByName,
  onOpenLineChatByName
}) => {
  const [activeTab, setActiveTab] = useState<'my-tasks' | 'botox' | 'lifting' | 'course' | 'rules'>('my-tasks');
  const [kanbanItems, setKanbanItems] = useState<KanbanItem[]>(INITIAL_KANBAN_ITEMS);
  const [rules, setRules] = useState<ClinicalRule[]>(INITIAL_CLINICAL_RULES);
  const [isSyncingHIS, setIsSyncingHIS] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Sync Cycle
  const handleRunSync = () => {
    setIsSyncingHIS(true);
    onShowToast('กำลังรันวงรอบติดตาม (Syncing with HIS Live)...', 'ดึงข้อมูลใบเสร็จและหัตถการย้อนหลัง', 'info');
    setTimeout(() => {
      setIsSyncingHIS(false);
      onShowToast('HIS Synchronization Completed', 'อัปเดตสถานะคิวติดตาม 28 เคสประจำวันเรียบร้อย', 'success');
    }, 1200);
  };

  // Move kanban card status
  const handleMoveCard = (id: string, newStatus: 'pending' | 'booked' | 'followup') => {
    setKanbanItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    const item = kanbanItems.find((k) => k.id === id);
    const statusThai = newStatus === 'booked' ? 'นัดหมายสำเร็จ' : newStatus === 'followup' ? 'ติดตามซ้ำ' : 'รอการติดต่อ';
    onShowToast(`ย้ายเคส ${item?.patientName || ''} ไปที่ "${statusThai}"`, 'อัปเดตสถานะคิวงานเรียบร้อย', 'success');
  };

  // Toggle rule
  const handleToggleRule = (ruleId: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === ruleId ? { ...r, enabled: !r.enabled } : r))
    );
    const rule = rules.find((r) => r.id === ruleId);
    onShowToast(`${rule?.title} ${!rule?.enabled ? 'เปิดการใช้งานแล้ว' : 'ปิดการใช้งานแล้ว'}`, 'บันทึกการเปลี่ยนแปลงเงื่อนไข Automation Rule', 'info');
  };

  const pendingItems = kanbanItems.filter((i) => i.status === 'pending');
  const bookedItems = kanbanItems.filter((i) => i.status === 'booked');
  const followupItems = kanbanItems.filter((i) => i.status === 'followup');

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Top Header Controls */}
      <section className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border border-surface-container-low">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[24px]">event_repeat</span>
          </div>
          <div>
            <h1 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Clinical Cycles & Follow-up Automation
            </h1>
            <p className="font-caption text-caption text-on-surface-variant">
              ระบบตรวจจับและติดตามวงรอบหัตถการคลินิกความงาม พร้อมกระบวนการอัตโนมัติอัจฉริยะ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHistoryModal(true)}
            className="flex items-center gap-1.5 h-10 px-3.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">history</span>
            <span>ประวัติการส่งอัตโนมัติ</span>
          </button>
          <button
            onClick={handleRunSync}
            disabled={isSyncingHIS}
            className="flex items-center gap-2 h-10 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <span className={`material-symbols-outlined text-[18px] ${isSyncingHIS ? 'animate-spin' : ''}`}>
              autorenew
            </span>
            <span>Run Sync Cycle (HIS Live)</span>
          </button>
        </div>
      </section>

      {/* 4 Metric Summary Quad */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col justify-between border-l-4 border-primary border-y border-r border-surface-container-low">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-caption text-caption uppercase text-on-surface-variant tracking-wider font-semibold">
                คิวที่ต้องติดตามวันนี้
              </span>
              <h3 className="font-display-lg text-display-lg text-primary mt-1 font-bold">
                28 <span className="font-title-md text-title-md font-normal text-on-surface-variant">เคส</span>
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary-fixed/40 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[22px]">assignment_turned_in</span>
            </div>
          </div>
          <div className="mt-3 pt-2 flex items-center justify-between text-caption font-caption text-on-surface-variant border-t border-surface-container-low">
            <span className="text-tertiary-container font-semibold">นัดหมายแล้ว 12 เคส</span>
            <span className="text-secondary font-semibold">รอโทร 16 เคส</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col justify-between border-l-4 border-secondary border-y border-r border-surface-container-low">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-caption text-caption uppercase text-on-surface-variant tracking-wider font-semibold">
                Botox Maintenance Cycle
              </span>
              <h3 className="font-display-lg text-display-lg text-secondary mt-1 font-bold">
                45 <span className="font-title-md text-title-md font-normal text-on-surface-variant">เคส</span>
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[22px]">face</span>
            </div>
          </div>
          <div className="mt-3 pt-2 flex items-center justify-between text-caption font-caption text-on-surface-variant border-t border-surface-container-low">
            <span>ถึงกำหนดเติมริ้วรอย / กราม</span>
            <span className="font-semibold text-secondary">90 - 120 วัน</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col justify-between border-l-4 border-tertiary border-y border-r border-surface-container-low">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-caption text-caption uppercase text-on-surface-variant tracking-wider font-semibold">
                Lifting & Skin Booster
              </span>
              <h3 className="font-display-lg text-display-lg text-tertiary mt-1 font-bold">
                32 <span className="font-title-md text-title-md font-normal text-on-surface-variant">เคส</span>
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary-container">
              <span className="material-symbols-outlined text-[22px]">vital_signs</span>
            </div>
          </div>
          <div className="mt-3 pt-2 flex items-center justify-between text-caption font-caption text-on-surface-variant border-t border-surface-container-low">
            <span>HIFU / Ultraformer / Rejuran</span>
            <span className="font-semibold text-tertiary">180 - 300 วัน</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col justify-between border-l-4 border-error border-y border-r border-surface-container-low">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-caption text-caption uppercase text-on-surface-variant tracking-wider font-semibold">
                คอร์สคงค้างที่ถูกทิ้งร้าง
              </span>
              <h3 className="font-display-lg text-display-lg text-error mt-1 font-bold">
                18 <span className="font-title-md text-title-md font-normal text-on-surface-variant">เคส</span>
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-error-container flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-[22px]">hourglass_disabled</span>
            </div>
          </div>
          <div className="mt-3 pt-2 flex items-center justify-between text-caption font-caption text-on-surface-variant border-t border-surface-container-low">
            <span>ไม่ได้เข้าคลินิก &gt; 45 วัน</span>
            <span className="font-bold text-error">มูลค่า ฿320,000</span>
          </div>
        </div>
      </section>

      {/* Sub-Tabs Selector */}
      <section className="bg-surface-container-lowest rounded-xl shadow-sm p-1.5 flex flex-wrap gap-1 border border-surface-container-low">
        <button
          onClick={() => setActiveTab('my-tasks')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
            activeTab === 'my-tasks'
              ? 'bg-primary-container text-on-primary font-semibold shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">view_kanban</span>
          <span>ทาสก์คิวของฉันวันนี้ (My Tasks)</span>
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-caption font-bold">
            {pendingItems.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('botox')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
            activeTab === 'botox'
              ? 'bg-primary-container text-on-primary font-semibold shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">face</span>
          <span>วงรอบ Botox (90-120 วัน)</span>
          <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-caption font-bold text-on-surface">
            45
          </span>
        </button>

        <button
          onClick={() => setActiveTab('lifting')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
            activeTab === 'lifting'
              ? 'bg-primary-container text-on-primary font-semibold shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">airline_seat_recline_extra</span>
          <span>วงรอบ Lifting & Energy Devices</span>
          <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-caption font-bold text-on-surface">
            32
          </span>
        </button>

        <button
          onClick={() => setActiveTab('course')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
            activeTab === 'course'
              ? 'bg-primary-container text-on-primary font-semibold shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">inventory_2</span>
          <span>แจ้งเตือนคอร์สคงเหลือ</span>
          <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-caption font-bold text-on-surface">
            18
          </span>
        </button>

        <button
          onClick={() => setActiveTab('rules')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-label-md text-label-md transition-all cursor-pointer ml-auto ${
            activeTab === 'rules'
              ? 'bg-primary text-on-primary font-semibold shadow-xs'
              : 'bg-surface-container-low text-primary hover:bg-surface-container font-semibold'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">rule_settings</span>
          <span>ตั้งค่าเงื่อนไข Automation Rule ({rules.filter((r) => r.enabled).length} Active)</span>
        </button>
      </section>

      {/* Main Kanban Workflow View */}
      {activeTab !== 'rules' && (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: รอการติดต่อ (Pending) */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-container-low flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-secondary"></span>
                <h3 className="font-title-md text-title-md text-on-surface font-bold">
                  รอการติดต่อ (Pending)
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                {pendingItems.length} เคส
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {pendingItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface-container-low p-4 rounded-xl border border-surface-container hover:shadow-md transition-all flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {item.avatarUrl ? (
                        <img
                          src={item.avatarUrl}
                          alt={item.patientName}
                          className="w-10 h-10 rounded-full object-cover ring-1 ring-outline-variant/30"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary font-bold flex items-center justify-center">
                          {item.initials}
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md font-bold text-primary">
                          {item.patientName}
                        </span>
                        <span className="font-caption text-caption text-on-surface-variant">
                          HN: {item.hn} • {item.assignedStaff}
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-caption text-caption font-semibold">
                      {item.overdueText}
                    </span>
                  </div>

                  <div className="p-2.5 bg-surface-container-lowest rounded-lg border border-surface-container-high text-on-surface font-body-sm text-body-sm">
                    <div className="flex items-center justify-between font-label-sm text-label-sm font-semibold text-secondary mb-1">
                      <span>{item.procedureTag}</span>
                      <span className="text-on-surface-variant font-caption text-caption">{item.lastDaysAgo} วันก่อน</span>
                    </div>
                    <p className="text-on-surface-variant font-caption text-caption">{item.notes}</p>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onOpenLineChatByName && onOpenLineChatByName(item.patientName)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-tertiary font-caption text-caption font-semibold border border-outline-variant/30 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">chat</span>
                        <span>Flex Message</span>
                      </button>
                      <button
                        onClick={() => onShowToast(`กำลังกดโทรออกหา ${item.patientName}`, 'ต่อสายผ่านระบบ Softphone', 'info')}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-primary font-caption text-caption font-semibold border border-outline-variant/30 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">call</span>
                        <span>กดโทรออก</span>
                      </button>
                    </div>

                    <button
                      onClick={() => handleMoveCard(item.id, 'booked')}
                      className="px-2.5 py-1.5 rounded-lg bg-tertiary-container hover:bg-tertiary text-on-tertiary font-caption text-caption font-semibold transition-colors cursor-pointer"
                    >
                      นัดสำเร็จ →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: ติดต่อแล้ว / นัดหมายสำเร็จ (Booked) */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-container-low flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-tertiary"></span>
                <h3 className="font-title-md text-title-md text-on-surface font-bold">
                  ติดต่อแล้ว / นัดหมายสำเร็จ (Booked)
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                {bookedItems.length} เคส
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {bookedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface-container-low p-4 rounded-xl border border-surface-container hover:shadow-md transition-all flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {item.avatarUrl ? (
                        <img
                          src={item.avatarUrl}
                          alt={item.patientName}
                          className="w-10 h-10 rounded-full object-cover ring-1 ring-outline-variant/30"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-secondary-container text-secondary font-bold flex items-center justify-center">
                          {item.initials}
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md font-bold text-primary">
                          {item.patientName}
                        </span>
                        <span className="font-caption text-caption text-on-surface-variant">
                          HN: {item.hn}
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-caption text-caption font-semibold">
                      {item.overdueText}
                    </span>
                  </div>

                  <div className="p-2.5 bg-surface-container-lowest rounded-lg border border-surface-container-high text-on-surface font-body-sm text-body-sm">
                    <div className="flex items-center gap-1.5 font-label-sm text-label-sm font-bold text-tertiary mb-1">
                      <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                      <span>{item.bookingDate}</span>
                    </div>
                    <p className="text-on-surface-variant font-caption text-caption">{item.notes}</p>
                    {item.bookingDoctor && (
                      <span className="mt-1 block font-caption text-caption font-medium text-primary">
                        แพทย์ผู้ตรวจ: {item.bookingDoctor}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-caption text-caption text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
                      <span>ยืนยันเข้าตรวจแล้ว</span>
                    </span>
                    <button
                      onClick={() => handleMoveCard(item.id, 'pending')}
                      className="text-caption text-on-surface-variant hover:text-error hover:underline cursor-pointer"
                    >
                      ยกเลิกนัด / ย้อนกลับ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: ติดต่อไม่ได้ / ติดตามซ้ำ (Follow-up Again) */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-container-low flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-error"></span>
                <h3 className="font-title-md text-title-md text-on-surface font-bold">
                  ติดต่อไม่ได้ / ติดตามซ้ำ (Follow-up)
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                {followupItems.length} เคส
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {followupItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface-container-low p-4 rounded-xl border border-surface-container hover:shadow-md transition-all flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-error-container text-error font-bold flex items-center justify-center">
                        {item.initials}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md font-bold text-primary">
                          {item.patientName}
                        </span>
                        <span className="font-caption text-caption text-on-surface-variant">
                          HN: {item.hn} • {item.assignedStaff}
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-error text-on-error font-caption text-caption font-semibold">
                      {item.procedureTag}
                    </span>
                  </div>

                  <div className="p-2.5 bg-surface-container-lowest rounded-lg border border-surface-container-high text-on-surface font-body-sm text-body-sm">
                    <div className="flex items-center justify-between font-label-sm text-label-sm font-bold text-error mb-1">
                      <span>โทรครั้งล่าสุด: {item.lastCallTime}</span>
                      <span className="font-caption text-caption text-on-surface-variant">{item.lastDaysAgo} วันก่อน</span>
                    </div>
                    <p className="text-on-surface-variant font-caption text-caption">{item.notes}</p>
                    {item.autoFallbackActive && (
                      <div className="mt-2 p-2 rounded bg-tertiary-fixed/30 text-tertiary font-caption text-caption font-semibold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                        <span>Auto Fallback: ส่ง LINE Voucher ส่วนลดอัตโนมัติแล้ว</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      onClick={() => onShowToast(`กำลังโทรซ้ำหา ${item.patientName}`, 'บันทึกการพยายามติดต่อครั้งที่ 3', 'info')}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-primary font-caption text-caption font-semibold border border-outline-variant/30 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">phone_forwarded</span>
                      <span>แทรกแซงโทรซ้ำ</span>
                    </button>
                    <button
                      onClick={() => handleMoveCard(item.id, 'booked')}
                      className="px-2.5 py-1.5 rounded-lg bg-tertiary-container hover:bg-tertiary text-on-tertiary font-caption text-caption font-semibold transition-colors cursor-pointer"
                    >
                      นัดสำเร็จ →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Automation Trigger Rules Section */}
      <section className="bg-surface-container-lowest rounded-xl shadow-sm p-6 flex flex-col gap-5 border border-surface-container-low">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-container">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed/40 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[22px]">smart_toy</span>
            </div>
            <div>
              <h3 className="font-title-lg text-title-lg text-on-surface font-bold">
                Automation Trigger Rules & Clinical Logic
              </h3>
              <p className="font-caption text-caption text-on-surface-variant">
                เงื่อนไขการสร้างงานอัตโนมัติ การส่งแจ้งเตือน และการจำกัดความถี่ตามกฎระเบียบคลินิก
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onShowToast('เปิดหน้าต่างสร้างเงื่อนไขใหม่', 'ระบุเกณฑ์ Clinical Rule และเงื่อนไข IF/THEN', 'info')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-sm text-label-sm font-semibold transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>เพิ่มเงื่อนไขใหม่</span>
            </button>
            <button
              onClick={() => onShowToast('บันทึกกฎทั้งหมดเรียบร้อย', 'กฎการทำงานมีผลทันทีกับรอบ Batch ถัดไป', 'success')}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              <span>บันทึกกฎทั้งหมด</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rules.map((rule) => {
            const typeBadgeBg =
              rule.type === 'Active'
                ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                : rule.type === 'Critical'
                ? 'bg-error-container text-on-error-container'
                : 'bg-secondary-container text-on-secondary-container';

            return (
              <div
                key={rule.id}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between gap-4 ${
                  rule.enabled
                    ? 'bg-surface-container-low border-surface-container-high'
                    : 'bg-surface-container-low/50 border-outline-variant/20 opacity-60'
                }`}
              >
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded font-caption text-caption font-bold ${typeBadgeBg}`}>
                      {rule.ruleNumber}
                    </span>
                    {/* Toggle switch */}
                    <button
                      onClick={() => handleToggleRule(rule.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                        rule.enabled ? 'bg-primary' : 'bg-outline-variant'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          rule.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <h4 className="font-title-md text-title-md font-bold text-on-surface">
                    {rule.title}
                  </h4>

                  {/* Conditions pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {rule.conditions.map((cond, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-surface-container-lowest font-mono font-caption text-[11px] text-on-surface-variant border border-outline-variant/20"
                      >
                        {cond}
                      </span>
                    ))}
                  </div>

                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {rule.actionDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-surface-container flex items-center justify-between font-caption text-caption text-on-surface-variant">
                  <span>{rule.statsLabel}: <strong className="text-primary font-semibold">{rule.statsValue}</strong></span>
                  <button
                    onClick={() => onShowToast(`แก้ไข Parameter ของ ${rule.title}`, 'เปิดหน้าต่างปรับแต่งเกณฑ์เวลาและกลุ่มเป้าหมาย', 'info')}
                    className="text-primary hover:underline font-semibold cursor-pointer"
                  >
                    แก้ไข Parameter
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl p-6 max-w-xl w-full shadow-2xl border border-surface-container animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">history</span>
                <h3 className="font-title-lg text-title-lg font-bold text-primary">ประวัติการทำงานอัตโนมัติ (HIS Automation Log)</h3>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="py-4 flex flex-col gap-3 font-body-sm text-body-sm max-h-80 overflow-y-auto">
              <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between">
                <div>
                  <strong className="block text-on-surface">Daily Botox Follow-up Batch #441</strong>
                  <span className="text-caption text-on-surface-variant">24 ก.พ. 2025 02:00 น. • สร้าง 16 ทาสก์สำหรับทีมโทร</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-caption text-caption font-bold">สำเร็จ</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between">
                <div>
                  <strong className="block text-on-surface">Auto LINE Reminder T-24hr</strong>
                  <span className="text-caption text-on-surface-variant">24 ก.พ. 2025 09:00 น. • ส่งเตือน 12 นัดหมาย</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-caption text-caption font-bold">สำเร็จ</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between">
                <div>
                  <strong className="block text-on-surface">High Value At-Risk Churn Alert</strong>
                  <span className="text-caption text-error">23 ก.พ. 2025 14:15 น. • แจ้งเตือนด่วน พญ. พิมพ์ชนก (1 เคส)</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-caption text-caption font-bold">ส่งแล้ว</span>
              </div>
            </div>
            <div className="pt-3 border-t border-surface-container text-right">
              <button
                onClick={() => setShowHistoryModal(false)}
                className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
