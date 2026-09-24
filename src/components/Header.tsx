import React, { useState } from 'react';
import { CLINIC_LOGO_URL, DOCTOR_PROFILE_URL } from '../data/mockData';

interface HeaderProps {
  currentBranch: string;
  onSelectBranch: (branch: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onTriggerSync: () => void;
  isSyncing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentBranch,
  onSelectBranch,
  searchQuery,
  onSearchChange,
  onTriggerSync,
  isSyncing
}) => {
  const [showBranchDropdown, setShowBranchDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const branches = [
    'สาขาหลัก: สยามสแควร์',
    'สาขา: ทองหล่อ (Aesthetic Studio)',
    'สาขา: อารีย์ (Wellness Hub)'
  ];

  const notifications = [
    { id: 1, title: 'Alert คนไข้เสี่ยงหลุด (At Risk)', desc: '15 คนไข้ VIP ไม่มาเกิน 90 วัน เร่งส่งทีมโทรติดตาม', time: '10 นาทีที่แล้ว', unread: true },
    { id: 2, title: 'คิวโทรติดตามประจำวัน', desc: 'มี 16 เคสรอการติดต่อในรอบบ่ายนี้', time: '35 นาทีที่แล้ว', unread: true },
    { id: 3, title: 'HIS Synchronization สำเร็จ', desc: 'ดึงข้อมูลใบเสร็จและหัตถการล่าสุด 89 รายการ', time: '2 ชม. ที่แล้ว', unread: true },
    { id: 4, title: 'LINE OA Broadcast จัดส่งสำเร็จ', desc: 'ส่งแคมเปญ VIP Botox Retouch ไปยัง 312 คนไข้', time: 'เมื่อวาน', unread: false },
    { id: 5, title: 'PDPA Consent Audit ผ่านการตรวจ', desc: 'บันทึกความยินยอมครบถ้วน 100% ประจำเดือน', time: '2 วันที่แล้ว', unread: false }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-6 border-b border-surface-container-low">
      {/* Left: Brand & Branch */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2.5">
          <img
            alt="Clinic RFM Engine Logo"
            className="h-8 w-auto object-contain"
            src={CLINIC_LOGO_URL}
          />
          <div className="flex flex-col">
            <span className="font-title-md text-title-md text-primary leading-tight font-bold tracking-tight">
              Clinic RFM Engine
            </span>
            <span className="font-caption text-caption text-on-surface-variant leading-tight">
              CRM & Patient Analytics
            </span>
          </div>
        </div>

        <div className="h-6 w-px bg-outline-variant/40 hidden md:block"></div>

        {/* Branch Selector Dropdown */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setShowBranchDropdown(!showBranchDropdown)}
            className="flex items-center gap-1.5 bg-surface-container-low hover:bg-surface-container px-3.5 py-1.5 rounded-lg text-on-surface transition-colors text-left"
          >
            <span className="material-symbols-outlined text-secondary text-[18px]">store</span>
            <span className="font-label-md text-label-md font-medium">{currentBranch}</span>
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">arrow_drop_down</span>
          </button>

          {showBranchDropdown && (
            <div className="absolute left-0 mt-1.5 w-64 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1 text-caption text-on-surface-variant font-semibold uppercase">
                เลือกสาขาคลินิก
              </div>
              {branches.map((b) => (
                <button
                  key={b}
                  onClick={() => {
                    onSelectBranch(b);
                    setShowBranchDropdown(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 font-label-md text-label-md hover:bg-surface-container-low transition-colors flex items-center justify-between ${
                    currentBranch === b ? 'text-primary font-bold bg-primary-fixed/30' : 'text-on-surface'
                  }`}
                >
                  <span>{b}</span>
                  {currentBranch === b && (
                    <span className="material-symbols-outlined text-primary text-[16px]">check</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Middle: Global Search */}
      <div className="hidden lg:flex flex-1 max-w-md mx-6">
        <div className="relative w-full flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-10 pl-9 pr-4 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container transition-all"
            placeholder="ค้นหาชื่อ, HN, เบอร์โทร..."
            type="search"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Right: Sync, Notifications, Profile */}
      <div className="flex items-center gap-4">
        {/* Sync status pill */}
        <button
          onClick={onTriggerSync}
          disabled={isSyncing}
          title="คลิกเพื่อ Sync ข้อมูล HIS ล่าสุด"
          className="hidden xl:flex items-center gap-1.5 px-3 py-1 bg-surface-container-high hover:bg-surface-container rounded-full text-on-surface transition-all cursor-pointer group"
        >
          <span className={`w-2 h-2 rounded-full bg-secondary ${isSyncing ? 'animate-ping' : ''}`}></span>
          <span className="font-caption text-caption text-on-surface-variant group-hover:text-primary transition-colors">
            {isSyncing ? 'กำลัง Sync HIS Live...' : 'Sync ล่าสุด: วันนี้ 02:00 น. (HIS Batch: OK)'}
          </span>
          <span className={`material-symbols-outlined text-[15px] text-on-surface-variant ${isSyncing ? 'animate-spin text-primary' : ''}`}>
            sync
          </span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            aria-label="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-error text-on-error font-caption text-[10px] font-bold">
              5
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface-container-lowest rounded-xl shadow-2xl border border-outline-variant/30 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-surface-container flex items-center justify-between">
                <span className="font-title-md text-title-md text-primary font-bold">การแจ้งเตือนคลินิก</span>
                <span className="text-caption text-secondary font-semibold">5 รายการใหม่</span>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-surface-container">
                {notifications.map((n) => (
                  <div key={n.id} className={`p-3 hover:bg-surface-container-low transition-colors ${n.unread ? 'bg-primary-fixed/15' : ''}`}>
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-label-md text-label-md font-semibold text-on-surface">{n.title}</span>
                      <span className="font-caption text-[10px] text-on-surface-variant shrink-0">{n.time}</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-snug">{n.desc}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 text-center border-t border-surface-container">
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="text-primary font-label-sm text-label-sm font-semibold hover:underline"
                >
                  ปิดหน้าต่าง
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-outline-variant/40"></div>

        {/* Profile */}
        <div className="flex items-center gap-2.5 pl-1">
          <img
            alt="Profile Dr. Pimchanok"
            className="w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant/30"
            src={DOCTOR_PROFILE_URL}
          />
          <div className="hidden sm:flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                พญ. พิมพ์ชนก
              </span>
              <span className="px-1.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-caption text-[10px] font-medium leading-none">
                Full RBAC
              </span>
            </div>
            <span className="font-caption text-caption text-on-surface-variant">
              Clinic Manager
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
