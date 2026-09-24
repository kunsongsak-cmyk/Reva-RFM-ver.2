import React, { useState } from 'react';
import { Patient } from '../types';
import { CLINIC_LOGO_URL } from '../data/mockData';

interface LineChatModalProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (text: string) => void;
}

export const LineChatModal: React.FC<LineChatModalProps> = ({
  patient,
  isOpen,
  onClose,
  onSendMessage
}) => {
  if (!isOpen || !patient) return null;

  const [inputMessage, setInputMessage] = useState(
    `เรียน ${patient.name} คลินิกขอส่งข้อมูลรอบการดูแล ${patient.lastProcedure} พร้อมสิทธิพิเศษค่ะ`
  );
  const [messages, setMessages] = useState([
    { id: '1', sender: 'clinic', text: `สวัสดีค่ะ ${patient.name} พญ. พิมพ์ชนก และทีมงานยินดีให้บริการค่ะ`, time: '10:00 น.' },
    { id: '2', sender: 'patient', text: 'สวัสดีค่ะ กำลังสนใจจะเข้ามาปรึกษาเรื่องเติมริ้วรอยเพิ่มพอดีเลยค่ะ', time: '10:05 น.' }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const newMsg = {
      id: String(Date.now()),
      sender: 'clinic',
      text: inputMessage,
      time: 'เมื่อสักครู่'
    };
    setMessages((prev) => [...prev, newMsg]);
    onSendMessage(inputMessage);
    setInputMessage('');
  };

  return (
    <div className="fixed inset-0 bg-inverse-surface/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1f232b] text-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-gray-700 animate-in zoom-in-95 duration-150 flex flex-col h-[560px]">
        {/* Header */}
        <div className="bg-[#262c37] px-4 py-3 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1">
              <img src={CLINIC_LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-bold text-[13px]">{patient.name}</span>
                <span className="px-1.5 py-0.2 rounded bg-[#06C755] text-[9px] font-bold text-black">LINE</span>
              </div>
              <span className="text-[10px] text-gray-400">HN: {patient.hn} • {patient.segment}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-white">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-[#8c9daf] p-4 overflow-y-auto flex flex-col gap-2.5">
          <div className="text-center my-1">
            <span className="px-2 py-0.5 rounded-full bg-black/20 text-white font-caption text-[10px]">
              แชทสดผ่าน LINE Official Account API
            </span>
          </div>

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'clinic' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-[13px] shadow-sm leading-relaxed ${
                  m.sender === 'clinic'
                    ? 'bg-[#06C755] text-white rounded-tr-none'
                    : 'bg-white text-gray-800 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-gray-700 font-medium mt-0.5 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="bg-[#1f232b] p-3 flex items-center gap-2 border-t border-gray-700">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="พิมพ์ข้อความตอบกลับคนไข้..."
            className="flex-1 h-10 px-3 bg-[#2b313d] text-white text-[13px] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06C755]"
          />
          <button
            type="submit"
            className="h-10 px-4 bg-[#06C755] hover:bg-[#05a847] text-white font-bold rounded-xl text-[13px] transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>ส่ง</span>
            <span className="material-symbols-outlined text-[16px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
