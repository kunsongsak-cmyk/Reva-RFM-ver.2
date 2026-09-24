import React, { useState } from 'react';
import { RFMSegment, NavScreen } from '../types';
import { INITIAL_RFM_MATRIX_CELLS } from '../data/mockData';

interface DashboardViewProps {
  onNavigate: (screen: NavScreen, filterSegment?: RFMSegment) => void;
  onShowToast: (msg: string, sub?: string, type?: 'success' | 'info' | 'warning') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onShowToast
}) => {
  const [selectedCellCode, setSelectedCellCode] = useState('R5-F5');
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [procedureFilter, setProcedureFilter] = useState('ทั้งหมด (Injectable, Lifting, Laser, Wellness)');
  const [branchFilter, setBranchFilter] = useState('ทั้งหมด (3 สาขา)');
  const [dateFilter, setDateFilter] = useState('12 เดือนล่าสุด (1 มี.ค. 2023 - 28 ก.พ. 2024)');

  const matrixCells = INITIAL_RFM_MATRIX_CELLS;
  const activeCell = matrixCells.find((c) => c.cell === selectedCellCode) || matrixCells[4];

  const handleRecalculate = () => {
    setIsRecalculating(true);
    onShowToast('กำลังประมวลผลคะแนน RFM จาก HIS Database...', 'คำนวณ 4,520 คนไข้ตามเกณฑ์ล่าสุด', 'info');
    setTimeout(() => {
      setIsRecalculating(false);
      onShowToast('คำนวณคะแนน RFM เสร็จสมบูรณ์แล้ว', 'อัปเดตสถานะ Segment ล่าสุดเรียบร้อย', 'success');
    }, 1000);
  };

  const handleExportCSV = () => {
    onShowToast('Export CSV รายงาน RFM สำเร็จ', 'ดาวน์โหลดไฟล์ RFM_Cohort_Report_2024.csv แล้ว (Audit Logged)', 'success');
  };

  const segmentBreakdown = [
    { name: 'Champions' as RFMSegment, count: 312, share: '6.9%', thb: '฿46.8M', dotColor: 'bg-tertiary-container', isAtRisk: false },
    { name: 'Loyal Customers' as RFMSegment, count: 340, share: '7.5%', thb: '฿19.4M', dotColor: 'bg-primary-container', isAtRisk: false },
    { name: 'Potential Loyalist' as RFMSegment, count: 580, share: '12.8%', thb: '฿17.0M', dotColor: 'bg-secondary', isAtRisk: false },
    { name: 'New Patients' as RFMSegment, count: 620, share: '13.7%', thb: '฿9.5M', dotColor: 'bg-secondary-fixed', isAtRisk: false },
    { name: 'Need Attention' as RFMSegment, count: 490, share: '10.8%', thb: '฿12.8M', dotColor: 'bg-secondary-container', isAtRisk: false },
    { name: 'At Risk' as RFMSegment, count: 428, share: '9.4%', thb: '฿18.2M', dotColor: 'bg-error', isAtRisk: true },
    { name: 'Hibernating' as RFMSegment, count: 780, share: '17.3%', thb: '฿9.1M', dotColor: 'bg-outline-variant', isAtRisk: false },
    { name: 'Lost' as RFMSegment, count: 1098, share: '24.3%', thb: '฿9.8M', dotColor: 'bg-outline', isAtRisk: false }
  ];

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Top Filter & Action Bar */}
      <section className="bg-surface-container-lowest rounded-xl shadow-sm p-4 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4 border border-surface-container-low">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Procedure Category Filter */}
          <div className="relative min-w-[210px] flex-1 sm:flex-none">
            <label className="block font-caption text-caption text-on-surface-variant uppercase tracking-wider mb-1">
              หมวดหัตถการ
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]">
                medical_services
              </span>
              <select
                value={procedureFilter}
                onChange={(e) => setProcedureFilter(e.target.value)}
                className="w-full h-10 pl-9 pr-8 bg-surface-container-low text-on-surface font-body-sm text-body-sm rounded-lg appearance-none cursor-pointer focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container"
              >
                <option>ทั้งหมด (Injectable, Lifting, Laser, Wellness)</option>
                <option>Injectable (Botox & Filler)</option>
                <option>Lifting (Ulthera, Thermage, Ultraformer)</option>
                <option>Laser & Acne Care</option>
                <option>Anti-Aging & IV Wellness</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 text-on-surface-variant pointer-events-none text-[18px]">
                expand_more
              </span>
            </div>
          </div>

          {/* Branch Filter */}
          <div className="relative min-w-[170px] flex-1 sm:flex-none">
            <label className="block font-caption text-caption text-on-surface-variant uppercase tracking-wider mb-1">
              สาขาคลินิก
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]">
                domain
              </span>
              <select
                value={branchFilter}
                onChange={(e) => setBranchFilter(e.target.value)}
                className="w-full h-10 pl-9 pr-8 bg-surface-container-low text-on-surface font-body-sm text-body-sm rounded-lg appearance-none cursor-pointer focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container"
              >
                <option>ทั้งหมด (3 สาขา)</option>
                <option>สาขา สยามสแควร์ (Main Flagship)</option>
                <option>สาขา ทองหล่อ (Aesthetic Studio)</option>
                <option>สาขา อารีย์ (Wellness Hub)</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 text-on-surface-variant pointer-events-none text-[18px]">
                expand_more
              </span>
            </div>
          </div>

          {/* Calculation Window */}
          <div className="relative min-w-[240px] flex-1 sm:flex-none">
            <label className="block font-caption text-caption text-on-surface-variant uppercase tracking-wider mb-1">
              ช่วงเวลาคำนวณคะแนน
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]">
                calendar_today
              </span>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full h-10 pl-9 pr-8 bg-surface-container-low text-on-surface font-body-sm text-body-sm rounded-lg appearance-none cursor-pointer focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container"
              >
                <option>12 เดือนล่าสุด (1 มี.ค. 2023 - 28 ก.พ. 2024)</option>
                <option>6 เดือนล่าสุด (1 ก.ย. 2023 - 28 ก.พ. 2024)</option>
                <option>ปีงบประมาณ 2023 (1 ม.ค. - 31 ธ.ค. 2023)</option>
                <option>กำหนดช่วงเวลาเอง (Custom Range)</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 text-on-surface-variant pointer-events-none text-[18px]">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 self-end xl:self-center mt-2 xl:mt-0">
          <button
            onClick={handleRecalculate}
            disabled={isRecalculating}
            className="flex items-center gap-2 h-10 px-4 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-all active:scale-95 cursor-pointer"
          >
            <span className={`material-symbols-outlined text-[18px] text-primary ${isRecalculating ? 'animate-spin' : ''}`}>
              refresh
            </span>
            <span>คำนวณคะแนนใหม่</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 h-10 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            <span>Export CSV รายงาน RFM</span>
          </button>
        </div>
      </section>

      {/* 4 Primary Clinical KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Patients */}
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col justify-between border border-surface-container-low">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-caption text-caption uppercase text-on-surface-variant tracking-wider font-semibold">
                Total Active Patients
              </span>
              <h3 className="font-display-lg text-display-lg text-on-surface mt-1 font-bold tracking-tight">
                4,520 <span className="font-title-md text-title-md font-normal text-on-surface-variant">คน</span>
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[22px]">badge</span>
            </div>
          </div>
          <div className="mt-4 pt-3 flex items-center justify-between bg-surface-container-low px-3 py-2 rounded-lg">
            <div className="flex items-center gap-1 text-tertiary-container font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
              <span>+5.2% vs เดือนก่อน</span>
            </div>
            <span className="font-caption text-caption text-on-surface-variant">เฉลี่ย ฿38,400 /คน</span>
          </div>
        </div>

        {/* KPI 2: Champions VIP */}
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col justify-between relative overflow-hidden border border-surface-container-low">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-tertiary-fixed/30 blur-2xl pointer-events-none"></div>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
                <span className="font-caption text-caption uppercase text-tertiary-container tracking-wider font-bold">
                  Champions (VIP Top Tier)
                </span>
              </div>
              <h3 className="font-display-lg text-display-lg text-on-surface mt-1 font-bold tracking-tight">
                312 <span className="font-title-md text-title-md font-normal text-on-surface-variant">(6.9%)</span>
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed/40 flex items-center justify-center text-tertiary-container">
              <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                stars
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 flex items-center justify-between bg-surface-container-low px-3 py-2 rounded-lg">
            <div className="flex items-center gap-1 text-tertiary-container font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
              <span>+12 คน เดือนนี้</span>
            </div>
            <span className="font-caption text-caption font-semibold text-primary">
              ฿46.8M <span className="text-on-surface-variant font-normal">(34.2%)</span>
            </span>
          </div>
        </div>

        {/* KPI 3: At Risk */}
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col justify-between relative overflow-hidden border border-surface-container-low">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-error-container/40 blur-2xl pointer-events-none"></div>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                <span className="font-caption text-caption uppercase text-error tracking-wider font-bold">
                  At Risk Patients
                </span>
              </div>
              <h3 className="font-display-lg text-display-lg text-error mt-1 font-bold tracking-tight">
                428 <span className="font-title-md text-title-md font-normal text-on-surface-variant">(9.4%)</span>
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-error-container flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-[22px]">warning</span>
            </div>
          </div>
          <div className="mt-4 pt-3 flex items-center justify-between bg-surface-container-low px-3 py-2 rounded-lg">
            <div className="flex items-center gap-1 text-error font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              <span>Churn Alert +15.3%</span>
            </div>
            <span className="font-caption text-caption font-semibold text-error">เสี่ยงหลุด ฿18.2M</span>
          </div>
        </div>

        {/* KPI 4: Re-activation Rate */}
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col justify-between border border-surface-container-low">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-caption text-caption uppercase text-on-surface-variant tracking-wider font-semibold">
                Monthly Re-activation
              </span>
              <h3 className="font-display-lg text-display-lg text-secondary mt-1 font-bold tracking-tight">
                24.5% <span className="font-caption text-caption text-tertiary-container font-semibold">Goal &gt;20%</span>
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[22px]">sync</span>
            </div>
          </div>
          <div className="mt-4 pt-3 flex items-center justify-between bg-surface-container-low px-3 py-2 rounded-lg">
            <div className="flex items-center gap-1 text-secondary font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>ผ่านเกณฑ์ KPI คลินิก</span>
            </div>
            <span className="font-caption text-caption font-medium text-on-surface">ดึงกลับได้ 105 คน</span>
          </div>
        </div>
      </section>

      {/* Main Grid: 2-Column Analytical Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Column 1: Interactive 5x5 RFM Grid Heatmap (7 cols) */}
        <section className="xl:col-span-7 bg-surface-container-lowest rounded-xl shadow-sm p-4 flex flex-col gap-4 border border-surface-container-low">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 bg-surface-container-low p-3 rounded-lg">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">grid_4x4</span>
                <h2 className="font-title-lg text-title-lg text-on-surface font-semibold">
                  RFM Matrix Distribution
                </h2>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                แกนตั้ง Frequency (ความถี่รับบริการ) × แกนนอน Recency (ความสดใหม่ของการเข้าตรวจ)
              </p>
            </div>
            <div className="flex items-center gap-1 self-start sm:self-center">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="font-caption text-caption text-on-surface-variant">คลิก Cell เพื่อกรองคนไข้</span>
            </div>
          </div>

          {/* Active Cell Tooltip Floating Banner */}
          <div className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-primary text-on-primary shadow-sm transition-all duration-300">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span className="font-label-md text-label-md font-semibold">
                {activeCell.title}
              </span>
            </div>
            <div className="flex items-center gap-4 text-on-primary">
              <span className="font-caption text-caption">
                คนไข้: <strong className="text-secondary-fixed">{activeCell.patientCount} คน</strong>
              </span>
              <span className="font-caption text-caption">
                นัดหมายเดือนนี้: <strong className="text-tertiary-fixed">{activeCell.bookedThisMonth} นัด</strong>
              </span>
              <button
                onClick={() => onNavigate('patient-action-queue', activeCell.segment)}
                className="font-caption text-caption px-2.5 py-1 rounded bg-on-primary/15 hover:bg-on-primary/25 text-on-primary uppercase tracking-wider font-semibold transition-colors cursor-pointer"
              >
                ดูรายชื่อ →
              </button>
            </div>
          </div>

          {/* 5x5 Matrix Layout with Axis Labels */}
          <div className="relative w-full flex gap-3 pt-2">
            {/* Y-Axis Label & Ticks */}
            <div className="flex flex-col items-center justify-between py-2 select-none">
              <div className="[writing-mode:vertical-rl] rotate-180 text-center font-caption text-caption text-on-surface-variant uppercase tracking-widest font-bold mb-2">
                ▲ Frequency (ความถี่รับบริการ)
              </div>
              <div className="flex flex-col justify-between h-[420px] text-right pr-2">
                <div className="flex flex-col justify-center h-[76px]">
                  <span className="font-label-md text-label-md font-bold text-on-surface">F5</span>
                  <span className="font-caption text-caption text-on-surface-variant">≥10 ครั้ง</span>
                </div>
                <div className="flex flex-col justify-center h-[76px]">
                  <span className="font-label-md text-label-md font-bold text-on-surface">F4</span>
                  <span className="font-caption text-caption text-on-surface-variant">6-9 ครั้ง</span>
                </div>
                <div className="flex flex-col justify-center h-[76px]">
                  <span className="font-label-md text-label-md font-bold text-on-surface">F3</span>
                  <span className="font-caption text-caption text-on-surface-variant">3-5 ครั้ง</span>
                </div>
                <div className="flex flex-col justify-center h-[76px]">
                  <span className="font-label-md text-label-md font-bold text-on-surface">F2</span>
                  <span className="font-caption text-caption text-on-surface-variant">2 ครั้ง</span>
                </div>
                <div className="flex flex-col justify-center h-[76px]">
                  <span className="font-label-md text-label-md font-bold text-on-surface">F1</span>
                  <span className="font-caption text-caption text-on-surface-variant">1 ครั้ง</span>
                </div>
              </div>
            </div>

            {/* Matrix Grid Container */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="grid grid-cols-5 gap-2 h-[420px]">
                {matrixCells.map((cell) => {
                  const isSelected = selectedCellCode === cell.cell;
                  return (
                    <button
                      key={cell.cell}
                      onClick={() => setSelectedCellCode(cell.cell)}
                      className={`p-2 rounded-lg text-left flex flex-col justify-between transition-all hover:scale-[1.02] cursor-pointer ${
                        cell.bgColorClass
                      } ${
                        isSelected ? 'ring-2 ring-secondary ring-offset-2 scale-[1.02] shadow-md z-10' : ''
                      }`}
                    >
                      <span className={`font-caption text-caption font-semibold ${cell.textColorClass}`}>
                        {cell.segment === 'Champions' ? 'Champions ★' :
                         cell.segment === 'At Risk' ? 'At Risk' :
                         cell.segment === 'Loyal Customers' ? 'Loyal' :
                         cell.segment === 'Potential Loyalist' ? 'Potential' :
                         cell.segment === 'New Patients' ? 'New' :
                         cell.segment === 'Need Attention' ? 'Attention' :
                         cell.segment === 'Lost' ? 'Lost' : 'Dormant'}
                      </span>
                      <div className="text-right">
                        <span className={`font-title-md text-title-md font-bold ${cell.textColorClass}`}>
                          {cell.patientCount}
                        </span>
                        <span className="block font-caption text-[10px] opacity-80">
                          {cell.monetaryFormatted}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* X-Axis Labels (Recency) */}
              <div className="grid grid-cols-5 gap-2 text-center pt-2">
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold text-on-surface">R1</span>
                  <span className="font-caption text-caption text-on-surface-variant">&gt;365 วัน</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold text-on-surface">R2</span>
                  <span className="font-caption text-caption text-on-surface-variant">181-365 วัน</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold text-on-surface">R3</span>
                  <span className="font-caption text-caption text-on-surface-variant">91-180 วัน</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold text-on-surface">R4</span>
                  <span className="font-caption text-caption text-on-surface-variant">46-90 วัน</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold text-on-surface">R5</span>
                  <span className="font-caption text-caption text-on-surface-variant">≤45 วัน</span>
                </div>
              </div>
              <div className="text-center font-caption text-caption text-on-surface-variant uppercase tracking-widest font-bold mt-1">
                Recency (ความสดใหม่ของการเข้าตรวจครั้งล่าสุด) ►
              </div>
            </div>
          </div>

          {/* Heatmap Color Legend */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 bg-surface-container-low px-4 py-2.5 rounded-lg font-caption text-caption">
            <span className="font-semibold text-on-surface">Segment Color Key:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-tertiary-container"></span>
              <span className="text-on-surface-variant">Champions (VIP)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-primary-container"></span>
              <span className="text-on-surface-variant">Loyal Customers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-secondary-fixed"></span>
              <span className="text-on-surface-variant">New Patients</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-secondary-container"></span>
              <span className="text-on-surface-variant">Need Attention</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-error-container"></span>
              <span className="text-error font-medium">At Risk (High Value)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-outline-variant"></span>
              <span className="text-on-surface-variant">Lost</span>
            </div>
          </div>
        </section>

        {/* Column 2: Segment Movement Tracking & Segment Breakdown (5 cols) */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          {/* Card 1: Segment Movement Trend */}
          <section className="bg-surface-container-lowest rounded-xl shadow-sm p-4 flex flex-col gap-4 border border-surface-container-low">
            <div className="flex items-center justify-between pb-1">
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">
                  Segment Movement Trend
                </h3>
                <span className="font-caption text-caption text-on-surface-variant">
                  การย้ายกลุ่มคนไข้ในรอบ 30 วัน (Sankey Behavioral Tracking)
                </span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">moving</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {/* Movement Item 1 */}
              <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary font-bold">
                    <span className="material-symbols-outlined text-[18px]">trending_up</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-md text-label-md font-semibold text-on-surface">42 New Patients</span>
                      <span className="material-symbols-outlined text-[14px] text-on-surface-variant">arrow_forward</span>
                      <span className="font-label-md text-label-md font-semibold text-primary">Potential Loyalist</span>
                    </div>
                    <span className="font-caption text-caption text-on-surface-variant">
                      เข้าคอร์สต่อเนื่องตาม Clinical Plan ครั้งที่ 2
                    </span>
                  </div>
                </div>
                <span className="px-2 py-1 rounded bg-tertiary-fixed text-on-tertiary-fixed font-caption text-caption font-bold">
                  +6.8%
                </span>
              </div>

              {/* Movement Item 2 */}
              <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary font-bold">
                    <span className="material-symbols-outlined text-[18px]">military_tech</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-md text-label-md font-semibold text-on-surface">28 Potential Loyalist</span>
                      <span className="material-symbols-outlined text-[14px] text-on-surface-variant">arrow_forward</span>
                      <span className="font-label-md text-label-md font-semibold text-primary-container">Loyal Customers</span>
                    </div>
                    <span className="font-caption text-caption text-on-surface-variant">
                      ยอดสะสมเกิน ฿100k + มาซ้ำเกิน 6 ครั้ง
                    </span>
                  </div>
                </div>
                <span className="px-2 py-1 rounded bg-tertiary-fixed text-on-tertiary-fixed font-caption text-caption font-bold">
                  +4.5%
                </span>
              </div>

              {/* Movement Item 3 (Alert) */}
              <div className="p-3 rounded-lg bg-error-container/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-error-container flex items-center justify-center text-error font-bold">
                    <span className="material-symbols-outlined text-[18px]">priority_high</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-md text-label-md font-semibold text-error">15 Champions VIP</span>
                      <span className="material-symbols-outlined text-[14px] text-error">arrow_forward</span>
                      <span className="font-label-md text-label-md font-bold text-error">At Risk Tier</span>
                    </div>
                    <span className="font-caption text-caption text-error">
                      Alert! ไม่มาเกิน 90 วัน เร่งส่งทีมโทรติดตาม
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('patient-action-queue', 'At Risk')}
                  className="px-2 py-1 rounded bg-error text-on-error font-caption text-caption font-bold hover:bg-error/90 cursor-pointer"
                >
                  Action Needed
                </button>
              </div>

              {/* Movement Item 4 (Success Re-activation) */}
              <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary-container font-bold">
                    <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-md text-label-md font-semibold text-on-surface">38 At Risk Patients</span>
                      <span className="material-symbols-outlined text-[14px] text-on-surface-variant">arrow_forward</span>
                      <span className="font-label-md text-label-md font-semibold text-tertiary-container">Re-activated</span>
                    </div>
                    <span className="font-caption text-caption text-on-surface-variant">
                      สำเร็จจากการยิง LINE OA Laser Re-check
                    </span>
                  </div>
                </div>
                <span className="px-2 py-1 rounded bg-tertiary-container text-on-tertiary font-caption text-caption font-bold">
                  ฿1.45M Rev
                </span>
              </div>
            </div>
          </section>

          {/* Card 2: RFM Segment Breakdown Table */}
          <section className="bg-surface-container-lowest rounded-xl shadow-sm p-4 flex flex-col gap-2 border border-surface-container-low">
            <div className="flex items-center justify-between pb-1">
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">
                  RFM Segment Breakdown
                </h3>
                <span className="font-caption text-caption text-on-surface-variant">
                  สัดส่วนคนไข้ 8 กลุ่มหลักและมูลค่ารวมตาม HIS Sync
                </span>
              </div>
              <button 
                onClick={handleExportCSV}
                className="font-label-sm text-label-sm text-primary font-semibold hover:underline flex items-center cursor-pointer"
              >
                ส่งออกวิเคราะห์ →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant font-caption text-caption uppercase tracking-wider">
                    <th className="py-2.5 px-3 rounded-l-lg">Segment</th>
                    <th className="py-2.5 px-2 text-right">คนไข้</th>
                    <th className="py-2.5 px-2 text-right">% Share</th>
                    <th className="py-2.5 px-3 text-right">ยอดรวม (THB)</th>
                    <th className="py-2.5 px-2 text-center rounded-r-lg">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-high/40 font-body-sm text-body-sm">
                  {segmentBreakdown.map((seg) => (
                    <tr 
                      key={seg.name} 
                      className={`hover:bg-surface-container-low/50 transition-colors ${
                        seg.isAtRisk ? 'bg-error-container/10 hover:bg-error-container/20' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${seg.dotColor}`}></span>
                        <span className={`font-semibold ${seg.isAtRisk ? 'text-error' : 'text-on-surface'}`}>
                          {seg.name}
                        </span>
                      </td>
                      <td className={`py-2.5 px-2 text-right ${seg.isAtRisk ? 'font-bold text-error' : 'font-medium'}`}>
                        {seg.count.toLocaleString('th-TH')}
                      </td>
                      <td className={`py-2.5 px-2 text-right font-medium ${seg.isAtRisk ? 'text-error' : 'text-on-surface-variant'}`}>
                        {seg.share}
                      </td>
                      <td className={`py-2.5 px-3 text-right font-semibold ${seg.isAtRisk ? 'text-error font-bold' : 'text-primary'}`}>
                        {seg.thb}
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <button
                          onClick={() => onNavigate('patient-action-queue', seg.name)}
                          className={`px-2 py-1 rounded font-caption text-caption font-semibold cursor-pointer transition-colors ${
                            seg.isAtRisk
                              ? 'bg-error text-on-error hover:bg-error/90 shadow-xs'
                              : 'bg-surface-container hover:bg-surface-container-high text-primary'
                          }`}
                        >
                          ดูคิวงาน
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Quick-Action Banner (Targeting At Risk segment) */}
      <section className="bg-surface-container-lowest rounded-xl shadow-sm p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-l-4 border-error border-y border-r border-surface-container-low">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-error-container flex items-center justify-center text-error shrink-0">
            <span className="material-symbols-outlined text-[28px]">notification_important</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-error text-on-error font-caption text-caption font-bold">
                Urgent Retention
              </span>
              <h4 className="font-title-lg text-title-lg text-on-surface font-bold">
                มีคนไข้กลุ่ม At Risk (High Value) 428 คน
              </h4>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              คนไข้เคยใช้บริการเฉลี่ย &gt;฿42,500 แต่ไม่ได้เข้าคลินิกเกิน 180 วัน มูลค่าเสี่ยงสูญเสียกว่า{' '}
              <strong className="text-error font-semibold">฿18.2 ล้านบาท</strong>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => onNavigate('patient-action-queue', 'At Risk')}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 h-10 px-5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-error">phone_forwarded</span>
            <span>ส่งเข้าคิวโทรติดตาม (Create 428 Tasks)</span>
          </button>
          <button
            onClick={() => onNavigate('line-oa-campaigns-broadcast')}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 h-10 px-5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md shadow-sm transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>สร้าง Broadcast LINE OA</span>
          </button>
        </div>
      </section>
    </div>
  );
};
