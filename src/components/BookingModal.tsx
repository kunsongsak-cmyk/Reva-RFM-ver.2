import React, { useState } from 'react';
import { Patient } from '../types';

interface BookingModalProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (patientName: string, date: string, doctor: string, procedure: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  patient,
  isOpen,
  onClose,
  onConfirmBooking
}) => {
  if (!isOpen || !patient) return null;

  const [date, setDate] = useState('2024-03-09');
  const [time, setTime] = useState('14:00');
  const [doctor, setDoctor] = useState('พญ. พิมพ์ชนก สิทธิเวช');
  const [procedure, setProcedure] = useState('Botox Retouch & Ultraformer Maintenance');
  const [room, setRoom] = useState('Treatment Suite 01 (VIP)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmBooking(patient.name, `${date} ${time} น.`, doctor, procedure);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-inverse-surface/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-surface-container animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-surface-container">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
            </div>
            <div>
              <h3 className="font-title-lg text-title-lg font-bold text-on-surface">บุ๊กกิ้งคิวนัดหมายทันที</h3>
              <span className="font-caption text-caption text-on-surface-variant">คนไข้: {patient.name} (HN: {patient.hn})</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-4 flex flex-col gap-3 font-body-sm text-body-sm">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm font-semibold text-on-surface">วันที่นัดหมาย</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-10 px-3 bg-surface-container-low rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm font-semibold text-on-surface">เวลา</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="h-10 px-3 bg-surface-container-low rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm font-semibold text-on-surface">แพทย์ประจำเคส</label>
            <select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className="h-10 px-3 bg-surface-container-low rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>พญ. พิมพ์ชนก สิทธิเวช (Clinic Manager)</option>
              <option>นพ. กิตติศักดิ์ เจริญดี (Aesthetic Specialist)</option>
              <option>นพ. วริทธิ์ ธาราทรัพย์ (Laser & Skin)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm font-semibold text-on-surface">รายการหัตถการ</label>
            <input
              type="text"
              value={procedure}
              onChange={(e) => setProcedure(e.target.value)}
              className="h-10 px-3 bg-surface-container-low rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm font-semibold text-on-surface">ห้องหัตถการ (Suite)</label>
            <select
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="h-10 px-3 bg-surface-container-low rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>Treatment Suite 01 (VIP Dedicated)</option>
              <option>Treatment Suite 02 (Injectable)</option>
              <option>Skin Suite 03 (Energy Devices)</option>
              <option>Laser Suite 04</option>
            </select>
          </div>

          <div className="pt-3 border-t border-surface-container flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md font-semibold cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow-sm cursor-pointer"
            >
              ยืนยันการจองคิวนัด
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
