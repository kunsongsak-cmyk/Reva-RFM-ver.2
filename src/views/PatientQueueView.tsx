import React, { useState, useMemo } from 'react';
import { Patient, RFMSegment } from '../types';

interface PatientQueueViewProps {
  patients: Patient[];
  filterSegment?: RFMSegment | null;
  onClearSegmentFilter?: () => void;
  onOpenPatientDrawer: (patient: Patient) => void;
  onShowToast: (msg: string, sub?: string, type?: 'success' | 'info' | 'warning') => void;
  onOpenLineChat: (patient: Patient) => void;
}

export const PatientQueueView: React.FC<PatientQueueViewProps> = ({
  patients,
  filterSegment,
  onClearSegmentFilter,
  onOpenPatientDrawer,
  onShowToast,
  onOpenLineChat
}) => {
  // Privacy view toggle: Medical Manager (Full) vs Reception (Masked)
  const [isMaskedView, setIsMaskedView] = useState(false);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [segmentFilter, setSegmentFilter] = useState<string>(filterSegment || 'ทั้งหมด');
  const [procedureCategory, setProcedureCategory] = useState('ทั้งหมด');
  const [courseFilter, setCourseFilter] = useState('ทั้งหมด');
  const [sortBy, setSortBy] = useState<'priority' | 'recency' | 'monetary'>('priority');

  // Selected patient IDs for batch actions
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Update segment filter if prop changes
  React.useEffect(() => {
    if (filterSegment) {
      setSegmentFilter(filterSegment);
    }
  }, [filterSegment]);

  // Filter & Sort Logic
  const filteredPatients = useMemo(() => {
    return patients
      .filter((p) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchHn = p.hn.toLowerCase().includes(q);
          const matchPhone = p.phone.includes(q);
          if (!matchName && !matchHn && !matchPhone) return false;
        }

        // Segment filter
        if (segmentFilter !== 'ทั้งหมด' && p.segment !== segmentFilter) {
          return false;
        }

        // Course filter
        if (courseFilter === 'มีคอร์สคงค้าง' && !p.clinicalCycleStatus.includes('คอร์ส')) {
          return false;
        }
        if (courseFilter === 'ถึงรอบ Retouch' && !p.clinicalCycleStatus.includes('รอบ')) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'recency') {
          return b.recencyDays - a.recencyDays;
        }
        if (sortBy === 'monetary') {
          return b.monetaryValue - a.monetaryValue;
        }
        // AI Priority default
        return (b.recencyScore * 10 + b.monetaryScore) - (a.recencyScore * 10 + a.monetaryScore);
      });
  }, [patients, searchQuery, segmentFilter, courseFilter, sortBy]);

  // Handle select all
  const handleSelectAll = () => {
    if (selectedIds.length === filteredPatients.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredPatients.map((p) => p.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedPatients = patients.filter((p) => selectedIds.includes(p.id));
  const selectedTotalMonetary = selectedPatients.reduce((sum, p) => sum + p.monetaryValue, 0);

  const handleBatchAssign = () => {
    onShowToast(`มอบหมาย ${selectedIds.length} คนไข้ให้แอดมินแล้ว`, 'ส่งเข้าคิวโทรติดตามของทีมเรียบร้อย', 'success');
    setSelectedIds([]);
  };

  const handleBatchVoucher = () => {
    onShowToast(`ส่งคูปองผ่าน LINE OA สำเร็จ`, `ส่งคูปอง Privilege Care ให้ ${selectedIds.length} คนไข้แล้ว`, 'success');
    setSelectedIds([]);
  };

  const handleBatchExport = () => {
    onShowToast(`Export คนไข้ที่เลือกแล้ว`, `ส่งออกไฟล์ ${selectedIds.length} รายการ (PDPA Logged)`, 'info');
  };

  const handleQuickCall = (patient: Patient, e: React.MouseEvent) => {
    e.stopPropagation();
    onShowToast(`กำลังโทรออกหา ${patient.name}`, `เบอร์ ${isMaskedView ? patient.maskedPhone : patient.phone} (Softphone Connected)`, 'info');
  };

  const handleQuickLine = (patient: Patient, e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenLineChat(patient);
  };

  return (
    <div className="flex flex-col w-full gap-5 relative pb-20">
      {/* Top Controls: Role Switcher & Privacy View */}
      <section className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border border-surface-container-low">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">patient_list</span>
            <div>
              <h1 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Patient Action Queue
              </h1>
              <p className="font-caption text-caption text-on-surface-variant">
                ตารางรายชื่อและคิวติดตามคนไข้ตามสถานะวงรอบ RFM และประวัติการรักษา
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Privacy View Switcher */}
          <div className="flex items-center bg-surface-container-low p-1 rounded-lg">
            <button
              onClick={() => setIsMaskedView(false)}
              className={`px-3 py-1.5 rounded-md font-label-sm text-label-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                !isMaskedView
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              <span>แพทย์/Manager (ยอดเต็ม)</span>
            </button>
            <button
              onClick={() => setIsMaskedView(true)}
              className={`px-3 py-1.5 rounded-md font-label-sm text-label-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                isMaskedView
                  ? 'bg-surface-container-lowest text-secondary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">visibility_off</span>
              <span>Staff/Reception (Mask ยอด)</span>
            </button>
          </div>

          <button
            onClick={() => onShowToast('Export รายชื่อสำเร็จ', 'ดาวน์โหลดไฟล์ Patient_Queue_Action.csv แล้ว', 'success')}
            className="flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-3 border border-surface-container-low">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]">
              search
            </span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่อ, HN, เบอร์โทร..."
              className="w-full h-10 pl-9 pr-8 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          {/* Segment Filter */}
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]">
              group
            </span>
            <select
              value={segmentFilter}
              onChange={(e) => setSegmentFilter(e.target.value)}
              className="w-full h-10 pl-9 pr-8 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface appearance-none cursor-pointer focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container"
            >
              <option value="ทั้งหมด">Segment: ทั้งหมด</option>
              <option value="Champions">Champions (VIP Top Tier)</option>
              <option value="Loyal Customers">Loyal Customers</option>
              <option value="Potential Loyalist">Potential Loyalist</option>
              <option value="New Patients">New Patients</option>
              <option value="Need Attention">Need Attention</option>
              <option value="At Risk">At Risk (High Value)</option>
              <option value="Hibernating">Hibernating</option>
              <option value="Lost">Lost</option>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 text-on-surface-variant pointer-events-none text-[18px]">
              expand_more
            </span>
          </div>

          {/* Procedure Category */}
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]">
              medical_services
            </span>
            <select
              value={procedureCategory}
              onChange={(e) => setProcedureCategory(e.target.value)}
              className="w-full h-10 pl-9 pr-8 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface appearance-none cursor-pointer focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container"
            >
              <option value="ทั้งหมด">หัตถการ: ทั้งหมด</option>
              <option value="botox">Botox & Filler</option>
              <option value="lifting">Lifting & Skin Booster</option>
              <option value="laser">Laser & Acne Care</option>
              <option value="course">คอร์สคงค้าง</option>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 text-on-surface-variant pointer-events-none text-[18px]">
              expand_more
            </span>
          </div>

          {/* Course Balance Filter */}
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]">
              timelapse
            </span>
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="w-full h-10 pl-9 pr-8 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface appearance-none cursor-pointer focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container"
            >
              <option value="ทั้งหมด">สถานะวงรอบ: ทั้งหมด</option>
              <option value="มีคอร์สคงค้าง">มีคอร์สคงค้าง</option>
              <option value="ถึงรอบ Retouch">ถึงรอบ Retouch</option>
              <option value="ขาดการติดต่อ">ขาดการติดต่อ &gt; 90 วัน</option>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 text-on-surface-variant pointer-events-none text-[18px]">
              expand_more
            </span>
          </div>
        </div>

        {/* Active Filter Tags & Sort Control */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-caption text-caption text-on-surface-variant">ตัวกรองใช้งาน:</span>
            {segmentFilter !== 'ทั้งหมด' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-primary-fixed text-primary font-caption text-caption font-semibold">
                Segment: {segmentFilter}
                <button
                  onClick={() => {
                    setSegmentFilter('ทั้งหมด');
                    if (onClearSegmentFilter) onClearSegmentFilter();
                  }}
                  className="hover:text-error"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-secondary-fixed text-secondary font-caption text-caption font-semibold">
                คำค้น: {searchQuery}
                <button onClick={() => setSearchQuery('')} className="hover:text-error">
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </span>
            )}
            {segmentFilter === 'ทั้งหมด' && !searchQuery && (
              <span className="font-caption text-caption text-on-surface-variant italic">
                แสดงคนไข้ทั้งหมด ({filteredPatients.length} คน)
              </span>
            )}
            {(segmentFilter !== 'ทั้งหมด' || searchQuery) && (
              <button
                onClick={() => {
                  setSegmentFilter('ทั้งหมด');
                  setSearchQuery('');
                  setProcedureCategory('ทั้งหมด');
                  setCourseFilter('ทั้งหมด');
                  if (onClearSegmentFilter) onClearSegmentFilter();
                }}
                className="font-caption text-caption text-error hover:underline ml-1"
              >
                ล้างตัวกรองทั้งหมด
              </button>
            )}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2">
            <span className="font-caption text-caption text-on-surface-variant">จัดเรียง:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="h-8 px-2.5 bg-surface-container-low rounded-md font-caption text-caption text-on-surface cursor-pointer focus:outline-none"
            >
              <option value="priority">เรียงตาม AI Priority (ด่วนสุด)</option>
              <option value="recency">Recency (ไม่ได้มานานสุด)</option>
              <option value="monetary">Monetary (ยอดใช้จ่ายสูงสุด)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Patients Action Queue Table */}
      <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container-low overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-caption text-caption uppercase tracking-wider border-b border-surface-container">
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length > 0 && selectedIds.length === filteredPatients.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded text-primary focus:ring-primary-container cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4">คนไข้ (HN / ชื่อ / โทร)</th>
                <th className="py-3 px-3">RFM Cell</th>
                <th className="py-3 px-3">Segment</th>
                <th className="py-3 px-4">หัตถการล่าสุด & แพทย์</th>
                <th className="py-3 px-3">Recency (ล่าสุด)</th>
                <th className="py-3 px-4 text-right">ยอดสะสม (THB)</th>
                <th className="py-3 px-4">วงรอบการรักษา (Cycle)</th>
                <th className="py-3 px-4 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container font-body-sm text-body-sm">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-[36px] text-outline-variant mb-2">person_search</span>
                    <p className="font-label-md text-label-md">ไม่พบรายชื่อคนไข้ตามเงื่อนไขที่ระบุ</p>
                    <button
                      onClick={() => {
                        setSegmentFilter('ทั้งหมด');
                        setSearchQuery('');
                        if (onClearSegmentFilter) onClearSegmentFilter();
                      }}
                      className="mt-2 text-primary font-caption text-caption underline"
                    >
                      ล้างตัวกรองและแสดงทั้งหมด
                    </button>
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => {
                  const isSelected = selectedIds.includes(patient.id);
                  const segmentBadgeBg =
                    patient.segment === 'Champions'
                      ? 'bg-tertiary-fixed text-on-tertiary-fixed font-bold'
                      : patient.segment === 'At Risk'
                      ? 'bg-error-container text-on-error-container font-bold'
                      : patient.segment === 'New Patients'
                      ? 'bg-secondary-fixed text-on-secondary-fixed-variant'
                      : patient.segment === 'Need Attention'
                      ? 'bg-secondary-container text-on-secondary-container'
                      : 'bg-primary-fixed text-on-primary-fixed-variant';

                  return (
                    <tr
                      key={patient.id}
                      onClick={() => onOpenPatientDrawer(patient)}
                      className={`hover:bg-surface-container-low/70 transition-colors cursor-pointer ${
                        isSelected ? 'bg-primary-fixed/20' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(patient.id)}
                          className="w-4 h-4 rounded text-primary focus:ring-primary-container cursor-pointer"
                        />
                      </td>

                      {/* Patient Details */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {patient.avatarUrl ? (
                            <img
                              src={patient.avatarUrl}
                              alt={patient.name}
                              className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-outline-variant/30"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container font-bold flex items-center justify-center shrink-0">
                              {patient.avatarInitials}
                            </div>
                          )}
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                              <span className="font-label-md text-label-md font-semibold text-primary">
                                {patient.name}
                              </span>
                              {patient.lineConnected && (
                                <span className="inline-flex items-center px-1 rounded bg-[#06C755]/15 text-[#06C755] font-caption text-[10px] font-bold" title="เชื่อมต่อ LINE OA แล้ว">
                                  LINE
                                </span>
                              )}
                            </div>
                            <span className="font-caption text-caption text-on-surface-variant">
                              HN: {patient.hn} • {isMaskedView ? patient.maskedPhone : patient.phone}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* RFM Cell */}
                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded bg-surface-container font-mono font-caption text-caption font-bold text-on-surface">
                          {patient.rfmCell}
                        </span>
                      </td>

                      {/* Segment */}
                      <td className="py-3.5 px-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm ${segmentBadgeBg}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {patient.segment}
                        </span>
                      </td>

                      {/* Procedure & Doctor */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col">
                          <span className="font-body-sm text-body-sm font-medium text-on-surface">
                            {patient.lastProcedure}
                          </span>
                          <span className="font-caption text-caption text-on-surface-variant">
                            {patient.lastDoctor}
                          </span>
                        </div>
                      </td>

                      {/* Recency */}
                      <td className="py-3.5 px-3">
                        <div className="flex flex-col">
                          <span className={`font-label-sm text-label-sm font-semibold ${patient.recencyDays > 120 ? 'text-error' : 'text-on-surface'}`}>
                            {patient.recencyDays} วันก่อน
                          </span>
                          <span className="font-caption text-caption text-on-surface-variant">
                            {patient.lastVisitDate}
                          </span>
                        </div>
                      </td>

                      {/* Monetary (Sensitive Privacy View) */}
                      <td className="py-3.5 px-4 text-right">
                        <span className="font-label-md text-label-md font-bold text-primary">
                          {isMaskedView ? '฿•••,•••' : `฿${patient.monetaryValue.toLocaleString('th-TH')}`}
                        </span>
                        <span className="block font-caption text-caption text-on-surface-variant">
                          {patient.frequencyCount} ครั้ง/ปี
                        </span>
                      </td>

                      {/* Clinical Cycle Status */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-caption font-semibold ${
                          patient.clinicalCycleStatus.includes('เกิน') || patient.clinicalCycleStatus.includes('>180')
                            ? 'bg-error-container text-on-error-container'
                            : 'bg-surface-container text-secondary'
                        }`}>
                          {patient.clinicalCycleStatus}
                        </span>
                      </td>

                      {/* Quick Action Buttons */}
                      <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1">
                          <button
                            title="โทรออกหาคนไข้"
                            onClick={(e) => handleQuickCall(patient, e)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px]">call</span>
                          </button>
                          <button
                            title="ส่งข้อความ LINE OA"
                            onClick={(e) => handleQuickLine(patient, e)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-tertiary hover:bg-surface-container transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px]">chat</span>
                          </button>
                          <button
                            title="ดูโปรไฟล์คนไข้และวงรอบ"
                            onClick={() => onOpenPatientDrawer(patient)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="p-4 bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-3 text-on-surface-variant font-caption text-caption border-t border-surface-container">
          <span>
            แสดง {filteredPatients.length} จากทั้งหมด {patients.length} คนไข้ (ตามกฎสิทธิการเข้าถึงข้อมูลคนไข้ PDPA)
          </span>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 rounded bg-surface-container text-on-surface-variant disabled:opacity-40" disabled>
              ก่อนหน้า
            </button>
            <button className="px-2.5 py-1 rounded bg-primary text-on-primary font-bold">1</button>
            <button className="px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface">2</button>
            <button className="px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface">3</button>
            <button className="px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface">ถัดไป</button>
          </div>
        </div>
      </section>

      {/* Floating Sticky Batch Action Bar (Appears when 1 or more patients are checked) */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-6 right-6 md:left-72 z-40 bg-inverse-surface text-inverse-on-surface p-4 rounded-xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-outline/30 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary font-bold font-caption">
              {selectedIds.length}
            </div>
            <div>
              <span className="font-label-md text-label-md font-bold text-inverse-on-surface">
                เลือกแล้ว {selectedIds.length} คนไข้
              </span>
              <span className="block font-caption text-caption text-inverse-on-surface/70">
                รวมมูลค่าใช้จ่าย: {isMaskedView ? '฿•••,•••' : `฿${selectedTotalMonetary.toLocaleString('th-TH')}`}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleBatchAssign}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold transition-colors cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
              <span>มอบหมายแอดมินโทร</span>
            </button>
            <button
              onClick={handleBatchVoucher}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-tertiary-container hover:bg-tertiary text-on-tertiary font-label-md text-label-md font-semibold transition-colors cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">confirmation_number</span>
              <span>ส่งคูปองผ่าน LINE OA</span>
            </button>
            <button
              onClick={handleBatchExport}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-high/30 hover:bg-surface-container-high text-inverse-on-surface font-label-md text-label-md transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Export เฉพาะที่เลือก</span>
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="p-2 rounded-lg text-inverse-on-surface/70 hover:text-inverse-on-surface cursor-pointer"
              title="ยกเลิกการเลือก"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
