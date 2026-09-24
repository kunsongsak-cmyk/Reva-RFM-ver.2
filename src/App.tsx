import { useState } from 'react';
import { NavScreen, RFMSegment, Patient } from './types';
import { INITIAL_PATIENTS } from './data/mockData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Toast } from './components/Toast';
import { PatientDrawer } from './components/PatientDrawer';
import { BookingModal } from './components/BookingModal';
import { LineChatModal } from './components/LineChatModal';
import { DashboardView } from './views/DashboardView';
import { PatientQueueView } from './views/PatientQueueView';
import { ClinicalCyclesView } from './views/ClinicalCyclesView';
import { CampaignsSettingsView } from './views/CampaignsSettingsView';

export default function App() {
  // Navigation
  const [currentScreen, setCurrentScreen] = useState<NavScreen>('rfm-matrix-dashboard');
  const [currentBranch, setCurrentBranch] = useState('สาขาหลัก: สยามสแควร์');
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  // Patients Data State
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [filterSegment, setFilterSegment] = useState<RFMSegment | null>(null);

  // Modals & Drawers
  const [drawerPatient, setDrawerPatient] = useState<Patient | null>(null);
  const [lineChatPatient, setLineChatPatient] = useState<Patient | null>(null);
  const [bookingPatient, setBookingPatient] = useState<Patient | null>(null);

  // Toast System
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    subMessage?: string;
    type?: 'success' | 'info' | 'warning' | 'error';
  }>({
    visible: false,
    message: '',
    subMessage: '',
    type: 'success'
  });

  const showToast = (
    message: string,
    subMessage?: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'success'
  ) => {
    setToast({
      visible: true,
      message,
      subMessage,
      type
    });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 4000);
  };

  // HIS Live Sync Handler
  const handleTriggerSync = () => {
    setIsSyncing(true);
    showToast('กำลังเชื่อมต่อระบบ HIS Live Database...', 'ดึงประวัติใบเสร็จและบันทึกหัตถการคลินิก 3 สาขา', 'info');
    setTimeout(() => {
      setIsSyncing(false);
      showToast('HIS Synchronization เสร็จสมบูรณ์ (OK)', 'อัปเดตข้อมูลคนไข้ 4,520 รายการ และคิวติดตาม 28 เคสล่าสุด', 'success');
    }, 1200);
  };

  // Navigate with optional segment filter
  const handleNavigateWithFilter = (screen: NavScreen, segment?: RFMSegment) => {
    if (segment) {
      setFilterSegment(segment);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save Call Log from Drawer
  const handleSaveCallLog = (patientId: string, outcome: string, notes: string) => {
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id === patientId) {
          const newLog = {
            id: `log-${Date.now()}`,
            date: new Date().toLocaleString('th-TH', { hour12: false }),
            outcome,
            notes,
            loggedBy: 'พญ. พิมพ์ชนก สิทธิเวช'
          };
          return {
            ...p,
            callLogs: [newLog, ...(p.callLogs || [])]
          };
        }
        return p;
      })
    );
    showToast('บันทึก Call Log สำเร็จแล้ว', `ผลการติดต่อ: ${outcome} (PDPA Audit Logged)`, 'success');
    setDrawerPatient(null);
  };

  // Book appointment
  const handleConfirmBooking = (
    patientName: string,
    dateTime: string,
    doctor: string,
    procedure: string
  ) => {
    showToast(
      `จองคิวนัดหมาย ${patientName} สำเร็จ!`,
      `วันเวลา: ${dateTime} • แพทย์: ${doctor} (${procedure})`,
      'success'
    );
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-sm selection:bg-primary-fixed selection:text-primary">
      {/* Toast Notification */}
      <Toast
        visible={toast.visible}
        message={toast.message}
        subMessage={toast.subMessage}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
      />

      {/* Global Top Navigation Header */}
      <Header
        currentBranch={currentBranch}
        onSelectBranch={(branch) => {
          setCurrentBranch(branch);
          showToast(`เปลี่ยนสาขาเป็น ${branch}`, 'โหลดข้อมูลเวชระเบียนและอัตราส่วน RFM ประจำสาขา', 'info');
        }}
        searchQuery={globalSearchQuery}
        onSearchChange={(q) => {
          setGlobalSearchQuery(q);
          if (q && currentScreen !== 'patient-action-queue') {
            setCurrentScreen('patient-action-queue');
          }
        }}
        onTriggerSync={handleTriggerSync}
        isSyncing={isSyncing}
      />

      {/* Main Layout Body */}
      <div className="flex pt-16 min-h-screen">
        {/* Left Sidebar */}
        <Sidebar
          currentScreen={currentScreen}
          onNavigate={(screen) => {
            setCurrentScreen(screen);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          actionQueueBadgeCount={16}
        />

        {/* Content Canvas */}
        <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full transition-all">
          {/* SCREEN 1: RFM Matrix & Dashboard */}
          {currentScreen === 'rfm-matrix-dashboard' && (
            <DashboardView
              onNavigate={handleNavigateWithFilter}
              onShowToast={showToast}
            />
          )}

          {/* SCREEN 2: Patient Action Queue */}
          {currentScreen === 'patient-action-queue' && (
            <PatientQueueView
              patients={patients}
              filterSegment={filterSegment}
              onClearSegmentFilter={() => setFilterSegment(null)}
              onOpenPatientDrawer={(patient) => setDrawerPatient(patient)}
              onShowToast={showToast}
              onOpenLineChat={(patient) => setLineChatPatient(patient)}
            />
          )}

          {/* SCREEN 3: Clinical Cycles & Follow-ups */}
          {currentScreen === 'clinical-cycles-follow-ups' && (
            <ClinicalCyclesView
              onShowToast={showToast}
              onOpenPatientDrawerByName={(name) => {
                const found = patients.find((p) => p.name.includes(name) || name.includes(p.name.split(' ')[0]));
                if (found) setDrawerPatient(found);
                else setDrawerPatient(patients[0]);
              }}
              onOpenLineChatByName={(name) => {
                const found = patients.find((p) => p.name.includes(name) || name.includes(p.name.split(' ')[0]));
                if (found) setLineChatPatient(found);
                else setLineChatPatient(patients[0]);
              }}
            />
          )}

          {/* SCREEN 4: LINE OA Campaigns & Broadcast */}
          {currentScreen === 'line-oa-campaigns-broadcast' && (
            <CampaignsSettingsView
              initialTab="broadcast"
              onShowToast={showToast}
            />
          )}

          {/* SCREEN 5: RFM Scoring Settings */}
          {currentScreen === 'rfm-scoring-settings' && (
            <CampaignsSettingsView
              initialTab="scoring"
              onShowToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Slide-over Patient Profile Drawer (540px width) */}
      <PatientDrawer
        patient={drawerPatient}
        isOpen={!!drawerPatient}
        onClose={() => setDrawerPatient(null)}
        onSaveCallLog={handleSaveCallLog}
        onOpenLineChat={(patient) => {
          setDrawerPatient(null);
          setLineChatPatient(patient);
        }}
        onBookAppointment={(patient) => {
          setDrawerPatient(null);
          setBookingPatient(patient);
        }}
      />

      {/* 1-on-1 LINE Official Account Chat Simulation Modal */}
      <LineChatModal
        patient={lineChatPatient}
        isOpen={!!lineChatPatient}
        onClose={() => setLineChatPatient(null)}
        onSendMessage={(text) => {
          showToast(`ส่งข้อความผ่าน LINE OA ถึง ${lineChatPatient?.name} แล้ว`, text.slice(0, 50) + '...', 'success');
        }}
      />

      {/* Booking Appointment Modal */}
      <BookingModal
        patient={bookingPatient}
        isOpen={!!bookingPatient}
        onClose={() => setBookingPatient(null)}
        onConfirmBooking={handleConfirmBooking}
      />
    </div>
  );
}
