import React from 'react';
import { NavScreen } from '../types';

interface SidebarProps {
  currentScreen: NavScreen;
  onNavigate: (screen: NavScreen) => void;
  actionQueueBadgeCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  actionQueueBadgeCount = 16
}) => {
  const navItems = [
    {
      id: 'rfm-matrix-dashboard' as NavScreen,
      label: 'RFM Matrix & Dashboard',
      icon: 'grid_view'
    },
    {
      id: 'patient-action-queue' as NavScreen,
      label: 'Patient Action Queue',
      icon: 'group',
      badge: actionQueueBadgeCount
    },
    {
      id: 'clinical-cycles-follow-ups' as NavScreen,
      label: 'Clinical Cycles & Follow-ups',
      icon: 'event_repeat'
    },
    {
      id: 'line-oa-campaigns-broadcast' as NavScreen,
      label: 'LINE OA Campaigns & Broadcast',
      icon: 'campaign'
    },
    {
      id: 'rfm-scoring-settings' as NavScreen,
      label: 'RFM Scoring Settings',
      icon: 'tune'
    }
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-30 flex flex-col justify-between py-4 border-r border-surface-container-low">
      <div className="flex flex-col gap-4">
        <div className="px-6">
          <span className="font-caption text-caption uppercase text-on-surface-variant tracking-wider font-semibold">
            Navigation Core
          </span>
        </div>

        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-all font-body-sm text-body-sm text-left ${
                  isActive
                    ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-on-primary' : 'text-on-surface-variant'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && !isActive && (
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-caption text-[11px] font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="px-4">
        <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">RFM Engine v2.4</span>
              <span className="font-caption text-caption text-on-surface-variant">HIPAA & PDPA Secure</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
