
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// --- Icons (Inline SVGs for performance and zero-dependency) ---
const Icons = {
  Home: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
  ),
  Chart: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
  ),
  Settings: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
  ),
  Refresh: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
  ),
  Wind: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path></svg>
  ),
  Check: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
  ),
  CheckCircle: () => (
     <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
  ),
  Plus: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
  ),
  Trash: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
  ),
  Help: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
  ),
  Info: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
  ),
  Maximize: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"></path><path d="M9 21H3v-6"></path><path d="M21 3l-7 7"></path><path d="M3 21l7-7"></path></svg>
  ),
  Minimize: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14h6v6"></path><path d="M20 10h-6V4"></path><path d="M14 10l7-7"></path><path d="M3 21l7-7"></path></svg>
  )
};

// --- Constants ---

const DEFAULT_DHIKRS = [
  { id: 'salawat', name: 'اللهم صل علی محمد و آل محمد', target: 100 },
  { id: 'zahra_34', name: 'الله اکبر (تسبیحات حضرت زهرا)', target: 34 },
  { id: 'zahra_33_alhamd', name: 'الحمدلله (تسبیحات حضرت زهرا)', target: 33 },
  { id: 'zahra_33_subhan', name: 'سبحان الله (تسبیحات حضرت زهرا)', target: 33 },
  { id: 'custom', name: 'ذکر آزاد (سریع)', target: 0 },
];

const DEFAULT_BREATHING_CONFIG = {
  inhale: 4,
  hold: 0,
  exhale: 4
};

// --- Utils ---

const vibrate = (pattern = [10]) => {
  if (navigator.vibrate) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {
      // Ignore vibration errors
    }
  }
};

const getTodayDate = () => new Date().toLocaleDateString('fa-IR');

// --- Neumorphic Components ---

const NeuButton = ({ onClick, children, active = false, className = '', style = {} }) => (
  <button
    onClick={onClick}
    style={{
      background: '#E0E5EC',
      boxShadow: active
        ? 'inset 3px 3px 7px #a3b1c6, inset -3px -3px 7px #ffffff'
        : '5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff',
      border: 'none',
      borderRadius: '15px',
      padding: '12px 20px',
      color: active ? '#667EEA' : '#4A5568',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      outline: 'none',
      ...style
    }}
    className={className}
  >
    {children}
  </button>
);

const NeuCard = ({ children, style = {} }) => (
  <div style={{
    background: '#E0E5EC',
    boxShadow: '8px 8px 16px #a3b1c6, -8px -8px 16px #ffffff',
    borderRadius: '20px',
    padding: '20px',
    ...style
  }}>
    {children}
  </div>
);

const NeuInput = ({ ...props }) => (
  <input 
    {...props}
    style={{
      width: '100%',
      padding: '12px',
      borderRadius: '12px',
      border: 'none',
      background: '#E0E5EC',
      boxShadow: 'inset 3px 3px 6px #a3b1c6, inset -3px -3px 6px #ffffff',
      color: '#4A5568',
      fontSize: '16px',
      outline: 'none',
      fontFamily: 'inherit',
      ...props.style
    }}
  />
);

const SettingCounter = ({ label, value, onChange, min, max, unit = 'ثانیه' }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
    <span style={{ color: '#4A5568', fontSize: '14px' }}>{label}</span>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <NeuButton 
        onClick={() => onChange(Math.max(min, value - 1))}
        style={{ width: '32px', height: '32px', padding: 0, borderRadius: '8px' }}
      >-</NeuButton>
      <span style={{ width: '50px', textAlign: 'center', fontVariantNumeric: 'tabular-nums', fontSize: '14px' }}>{value} {unit}</span>
      <NeuButton 
        onClick={() => onChange(Math.min(max, value + 1))}
        style={{ width: '32px', height: '32px', padding: 0, borderRadius: '8px' }}
      >+</NeuButton>
    </div>
  </div>
);

const ConfirmationModal = ({ title, message, onConfirm, onCancel }) => (
  <div style={{
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(224, 229, 236, 0.8)',
    backdropFilter: 'blur(5px)',
    zIndex: 200,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '20px'
  }}>
    <div style={{ animation: 'popIn 0.2s ease-out' }}>
      <NeuCard style={{ textAlign: 'center', minWidth: '280px', border: '1px solid rgba(255,255,255,0.5)' }}>
        <h2 style={{ margin: '0 0 16px 0', color: '#2D3748', fontSize: '20px' }}>{title}</h2>
        <p style={{ margin: '0 0 24px 0', color: '#718096' }}>{message}</p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <NeuButton onClick={onCancel} style={{ flex: 1, color: '#4A5568' }}>انصراف</NeuButton>
          <NeuButton onClick={onConfirm} style={{ flex: 1, color: '#E53E3E' }}>تایید</NeuButton>
        </div>
      </NeuCard>
    </div>
  </div>
);

const CompletionModal = ({ onClose }) => (
  <div style={{
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(224, 229, 236, 0.8)',
    backdropFilter: 'blur(5px)',
    zIndex: 100,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '20px'
  }}>
    <div style={{
      animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    }}>
      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <NeuCard style={{ textAlign: 'center', minWidth: '280px', border: '1px solid rgba(255,255,255,0.5)' }}>
        <div style={{ color: '#48BB78', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
          <Icons.CheckCircle />
        </div>
        <h2 style={{ margin: '0 0 8px 0', color: '#2D3748', fontSize: '24px' }}>اتمام ذکر</h2>
        <p style={{ margin: '0 0 24px 0', color: '#718096' }}>قبول باشد</p>
        <NeuButton onClick={onClose} style={{ width: '100%', fontSize: '16px', fontWeight: 'bold', color: '#667EEA' }}>
          بستن
        </NeuButton>
      </NeuCard>
    </div>
  </div>
);

const GuideModal = ({ onClose }) => (
  <div style={{
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(224, 229, 236, 0.95)',
    zIndex: 110,
    display: 'flex', flexDirection: 'column',
    padding: '24px'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
      <h2 style={{ margin: 0, color: '#2D3748' }}>راهنمای نور و نوا</h2>
      <NeuButton onClick={onClose} style={{ padding: '8px' }}>X</NeuButton>
    </div>
    
    <div style={{ overflowY: 'auto', flex: 1, paddingBottom: '20px' }}>
      <NeuCard style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#667EEA' }}>
          <Icons.Wind />
          <h3 style={{ margin: 0 }}>چرا ذکر تنفسی؟</h3>
        </div>
        <p style={{ lineHeight: '1.8', color: '#4A5568', fontSize: '14px', textAlign: 'justify' }}>
          ذکر تنفسی (Breathing Dhikr) پلی میان معنویت و آرامش جسمانی است. با هماهنگ کردن ذکر با الگوی دم و بازدم، ذهن از پراکندگی نجات یافته و «حضور قلب» افزایش می‌یابد. 
          <br/><br/>
          این روش به شما کمک می‌کند تا ذکر گفتن را از یک عمل مکانیکی به یک تجربه عمیق مدیتیشن تبدیل کنید. دایره مرکزی با ریتم تنفس شما باز و بسته می‌شود تا تمرکز شما بر لحظه حال باقی بماند.
        </p>
      </NeuCard>

      <NeuCard style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#ED8936' }}>
          <Icons.Home />
          <h3 style={{ margin: 0 }}>خانه و شمارش</h3>
        </div>
        <ul style={{ lineHeight: '1.8', color: '#4A5568', fontSize: '14px', paddingRight: '20px', margin: 0 }}>
          <li>برای شمارش، هر جای دایره مرکزی را لمس کنید.</li>
          <li>نوار دور دایره، پیشرفت شما تا هدف (مثلاً ۱۰۰ تایی) را نشان می‌دهد.</li>
          <li>برای فعال‌سازی راهنمای تنفس، دکمه باد (<Icons.Wind />) را بزنید.</li>
          <li>برای صفر کردن شمارنده، دکمه (<Icons.Refresh />) را بزنید.</li>
          <li>برای حالت تمام صفحه، دکمه (<Icons.Maximize />) را بزنید.</li>
        </ul>
      </NeuCard>

      <NeuCard style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#48BB78' }}>
          <Icons.Chart />
          <h3 style={{ margin: 0 }}>پیشرفت معنوی</h3>
        </div>
        <p style={{ lineHeight: '1.8', color: '#4A5568', fontSize: '14px' }}>
          در بخش آمار، می‌توانید "زنجیره" (تعداد روزهای متوالی) و نمودار فعالیت هفتگی خود را ببینید. حفظ زنجیره به شما در ایجاد عادت پایدار کمک می‌کند.
        </p>
      </NeuCard>

      <NeuCard>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#718096' }}>
          <Icons.Settings />
          <h3 style={{ margin: 0 }}>شخصی‌سازی</h3>
        </div>
        <p style={{ lineHeight: '1.8', color: '#4A5568', fontSize: '14px' }}>
          در تنظیمات می‌توانید ذکرهای اختصاصی با تعداد هدف دلخواه بسازید و زمان‌بندی دم، نگه داشتن و بازدم را متناسب با ظرفیت ریه‌های خود تنظیم کنید.
        </p>
      </NeuCard>
    </div>
  </div>
);

// --- Breathing Engine Component ---

const BreathingCircle = ({ 
  count, 
  target, 
  onTap, 
  breathingEnabled,
  config = DEFAULT_BREATHING_CONFIG,
  isFullScreen = false
}) => {
  const [breathPhase, setBreathPhase] = useState('pause');
  const [phaseText, setPhaseText] = useState('');
  const [currentDuration, setCurrentDuration] = useState(0);

  useEffect(() => {
    if (!breathingEnabled) {
      setBreathPhase('pause');
      setPhaseText('لمس کنید');
      return;
    }

    let timer;
    const runCycle = () => {
      setBreathPhase('inhale');
      setPhaseText('دم');
      setCurrentDuration(config.inhale);

      timer = setTimeout(() => {
        if (config.hold > 0) {
          setBreathPhase('hold');
          setPhaseText('نگه دارید');
          setCurrentDuration(config.hold);
          timer = setTimeout(() => {
            startExhale();
          }, config.hold * 1000);
        } else {
          startExhale();
        }
      }, config.inhale * 1000);
    };

    const startExhale = () => {
      setBreathPhase('exhale');
      setPhaseText('بازدم');
      setCurrentDuration(config.exhale);
      timer = setTimeout(() => {
        runCycle();
      }, config.exhale * 1000);
    };

    runCycle();
    return () => clearTimeout(timer);
  }, [breathingEnabled, config]);

  const getCircleSize = () => {
    if (isFullScreen) {
        if (!breathingEnabled) return '300px';
        if (breathPhase === 'inhale' || breathPhase === 'hold') return '360px';
        return '280px';
    }
    if (!breathingEnabled) return '220px';
    if (breathPhase === 'inhale' || breathPhase === 'hold') return '280px';
    return '180px';
  };

  const getShadow = () => {
    if (!breathingEnabled) return '20px 20px 60px #a3b1c6, -20px -20px 60px #ffffff';
    if (breathPhase === 'inhale' || breathPhase === 'hold') 
      return '30px 30px 60px #a3b1c6, -30px -30px 60px #ffffff';
    return '10px 10px 30px #a3b1c6, -10px -10px 30px #ffffff';
  };

  const getBackgroundColor = () => {
    if (!breathingEnabled) return '#E0E5EC';
    if (breathPhase === 'inhale') return '#EAF0F6'; 
    if (breathPhase === 'hold') return '#EAF0F6';
    return '#E0E5EC';
  };

  const progress = target > 0 ? (count % target) / target : 0;
  
  return (
    <div 
      onClick={(e) => {
        if (!isFullScreen) {
            vibrate();
            onTap();
        }
      }}
      style={{
        position: 'relative',
        width: isFullScreen ? '100%' : '320px',
        height: isFullScreen ? '100%' : '320px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <style>{`
        @keyframes subtle-pulse {
          0% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.02); filter: brightness(1.02); }
          100% { transform: scale(1); filter: brightness(1); }
        }
        @keyframes text-breathe {
          0% { opacity: 0.7; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-2px); }
          100% { opacity: 0.7; transform: translateY(0); }
        }
      `}</style>
      
      {/* Outer Progress Ring */}
      {target > 0 && (
        <svg 
          width={isFullScreen ? "90%" : "320"} 
          height={isFullScreen ? "90%" : "320"} 
          viewBox="0 0 320 320"
          style={{ position: 'absolute', transform: 'rotate(-90deg)', pointerEvents: 'none', maxWidth: '500px' }}
        >
          <circle 
            cx="160" cy="160" r="140" 
            stroke="#a3b1c6" strokeWidth="8" fill="transparent" opacity="0.2"
          />
          <circle 
            cx="160" cy="160" r="140" 
            stroke="#667EEA" strokeWidth="8" fill="transparent"
            strokeDasharray={2 * Math.PI * 140}
            strokeDashoffset={2 * Math.PI * 140 * (1 - progress)}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
          />
        </svg>
      )}

      {/* Breathing Core */}
      <div style={{
        width: getCircleSize(),
        height: getCircleSize(),
        borderRadius: '50%',
        background: getBackgroundColor(),
        boxShadow: getShadow(),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: `width ${currentDuration}s ease-in-out, height ${currentDuration}s ease-in-out, box-shadow ${currentDuration}s ease-in-out, background-color ${currentDuration}s ease`, 
        animation: breathPhase === 'hold' ? 'subtle-pulse 3s infinite ease-in-out' : 'none',
        position: 'relative',
        zIndex: 10
      }}>
        <span style={{ 
          fontSize: isFullScreen ? '80px' : '48px', 
          fontWeight: 'bold', 
          color: '#4A5568',
          fontVariantNumeric: 'tabular-nums'
        }}>
          {count}
        </span>
        <span style={{ 
          fontSize: isFullScreen ? '20px' : '16px', 
          color: '#A0AEC0',
          marginTop: '8px',
          opacity: 0.8,
          animation: breathingEnabled ? 'text-breathe 4s infinite ease-in-out' : 'none'
        }}>
          {breathingEnabled ? phaseText : (isFullScreen ? 'ضربه بزنید' : 'لمس کنید')}
        </span>
      </div>
    </div>
  );
};

// --- Pages ---

const DhikrPage = ({ state, updateState }) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleTap = () => {
    const newCount = state.count + 1;
    vibrate();
    
    // Update Streak logic
    const today = new Date().toDateString();
    let newStreak = state.streak;
    let newLastActive = state.lastActiveDate;

    if (state.lastActiveDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (state.lastActiveDate === yesterday.toDateString()) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
      newLastActive = today;
    }

    // Update History
    const todayDateStr = getTodayDate();
    const historyIndex = state.history.findIndex(h => h.date === todayDateStr);
    let newHistory = [...state.history];
    if (historyIndex >= 0) {
      newHistory[historyIndex].count += 1;
    } else {
      newHistory.push({ date: todayDateStr, count: 1 });
    }

    // Check target completion
    if (state.selectedDhikr.target > 0 && newCount % state.selectedDhikr.target === 0) {
      // Long vibration for completion
      vibrate([200, 100, 200]);
      updateState({ 
        count: newCount,
        totalLifetimeCount: state.totalLifetimeCount + 1,
        streak: newStreak,
        lastActiveDate: newLastActive,
        history: newHistory,
        showCompletion: true // Show modal
      });
    } else {
      // Normal update
      updateState({ 
        count: newCount, 
        totalLifetimeCount: state.totalLifetimeCount + 1,
        streak: newStreak,
        lastActiveDate: newLastActive,
        history: newHistory
      });
    }
  };

  const handleResetRequest = () => {
    if (state.count === 0) return;
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    updateState({ count: 0 });
    setShowResetConfirm(false);
  };

  const toggleBreath = () => {
    updateState({ breathingEnabled: !state.breathingEnabled });
  };

  if (isFullScreen) {
    return (
      <div 
        onClick={handleTap}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          backgroundColor: '#E0E5EC',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
          overflow: 'hidden'
        }}
      >
        {/* Breathing Animation Background (Subtle) */}
        {state.breathingEnabled && (
           <div style={{
             position: 'absolute', inset: 0,
             animation: 'bg-breathe 8s infinite ease-in-out',
             pointerEvents: 'none'
           }}>
             <style>{`
               @keyframes bg-breathe {
                 0% { background-color: #E0E5EC; }
                 50% { background-color: #E6EEF6; }
                 100% { background-color: #E0E5EC; }
               }
             `}</style>
           </div>
        )}

        <div 
          onClick={(e) => { e.stopPropagation(); setIsFullScreen(false); }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 1001,
            padding: '12px',
            background: 'rgba(255,255,255,0.4)',
            borderRadius: '50%',
            cursor: 'pointer'
          }}
        >
          <Icons.Minimize />
        </div>

        <BreathingCircle 
          count={state.count} 
          target={state.selectedDhikr.target} 
          onTap={() => {}} // Handled by container
          breathingEnabled={state.breathingEnabled}
          config={state.breathingConfig}
          isFullScreen={true}
        />
        
        <div style={{ marginTop: '40px', color: '#A0AEC0', fontSize: '14px', opacity: 0.6 }}>
           برای شمارش هر جای صفحه ضربه بزنید
        </div>
        
        {/* Completion Modal inside Fullscreen */}
        {state.showCompletion && (
           <div onClick={e => e.stopPropagation()} style={{ position: 'absolute', zIndex: 1002 }}>
             <CompletionModal onClose={() => updateState({ showCompletion: false })} />
           </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '24px 0'
    }}>
      {showResetConfirm && (
        <ConfirmationModal 
          title="صفر کردن شمارنده" 
          message="آیا از صفر کردن تعداد ذکر اطمینان دارید؟" 
          onConfirm={confirmReset} 
          onCancel={() => setShowResetConfirm(false)} 
        />
      )}

      <div style={{ textAlign: 'center', padding: '0 20px', width: '100%', position: 'relative' }}>
        <div 
          onClick={() => updateState({ showGuide: true })}
          style={{ position: 'absolute', right: '20px', top: '5px', color: '#A0AEC0', cursor: 'pointer' }}
        >
          <Icons.Help />
        </div>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#718096' }}>نور و نوا</h2>
        <h1 style={{ margin: 0, fontSize: '24px', color: '#2D3748' }}>{state.selectedDhikr.name}</h1>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <BreathingCircle 
          count={state.count} 
          target={state.selectedDhikr.target} 
          onTap={handleTap}
          breathingEnabled={state.breathingEnabled}
          config={state.breathingConfig}
        />
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center' }}>
        <NeuButton onClick={handleResetRequest}>
          <Icons.Refresh />
        </NeuButton>
        <NeuButton onClick={() => setIsFullScreen(true)}>
          <Icons.Maximize />
        </NeuButton>
        <NeuButton 
          onClick={toggleBreath} 
          active={state.breathingEnabled}
          style={{ width: '60px' }}
        >
          <Icons.Wind />
        </NeuButton>
      </div>
    </div>
  );
};

const StatsPage = ({ state }) => {
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('fa-IR');
      const dayName = d.toLocaleDateString('fa-IR', { weekday: 'short' });
      const record = state.history.find(h => h.date === dateStr);
      days.push({ day: dayName, count: record ? record.count : 0 });
    }
    return days;
  };

  const weekData = getLast7Days();
  const maxCount = Math.max(...weekData.map(d => d.count), 10);

  return (
    <div style={{ padding: '24px', height: '100%', overflowY: 'auto' }}>
      <h2 style={{ marginBottom: '24px', color: '#2D3748' }}>پیشرفت معنوی</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <NeuCard style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#667EEA' }}>{state.streak}</span>
          <span style={{ fontSize: '14px', color: '#A0AEC0' }}>روز زنجیره</span>
        </NeuCard>
        <NeuCard style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#ED8936' }}>{state.totalLifetimeCount.toLocaleString('fa-IR')}</span>
          <span style={{ fontSize: '14px', color: '#A0AEC0' }}>مجموع ذکرها</span>
        </NeuCard>
      </div>

      <NeuCard style={{ marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', color: '#718096' }}>فعالیت هفتگی</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '150px' }}>
          {weekData.map((d, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
              <div style={{ 
                width: '12px', 
                height: `${(d.count / maxCount) * 100}%`, 
                background: d.count > 0 ? '#667EEA' : '#CBD5E0',
                borderRadius: '6px',
                transition: 'height 0.5s ease',
                minHeight: '4px'
              }} />
              <span style={{ fontSize: '10px', color: '#A0AEC0' }}>{d.day}</span>
            </div>
          ))}
        </div>
      </NeuCard>

      <NeuCard>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#718096' }}>دستاوردها</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {state.totalLifetimeCount > 100 && (
            <span style={{ padding: '6px 12px', background: '#E0E5EC', borderRadius: '20px', fontSize: '12px', boxShadow: 'inset 3px 3px 6px #a3b1c6, inset -3px -3px 6px #ffffff', color: '#48BB78' }}>
              🌱 آغاز مسیر
            </span>
          )}
          {state.streak >= 3 && (
            <span style={{ padding: '6px 12px', background: '#E0E5EC', borderRadius: '20px', fontSize: '12px', boxShadow: 'inset 3px 3px 6px #a3b1c6, inset -3px -3px 6px #ffffff', color: '#ED8936' }}>
              🔥 ۳ روز مداومت
            </span>
          )}
          {state.totalLifetimeCount > 1000 && (
            <span style={{ padding: '6px 12px', background: '#E0E5EC', borderRadius: '20px', fontSize: '12px', boxShadow: 'inset 3px 3px 6px #a3b1c6, inset -3px -3px 6px #ffffff', color: '#667EEA' }}>
              ✨ ذاکر (۱۰۰۰+)
            </span>
          )}
        </div>
      </NeuCard>
    </div>
  );
};

const SettingsPage = ({ state, updateState }) => {
  const [newDhikrName, setNewDhikrName] = useState('');
  const [newDhikrTarget, setNewDhikrTarget] = useState(100);

  const updateBreathConfig = (key, value) => {
    updateState({
      breathingConfig: {
        ...state.breathingConfig,
        [key]: value
      }
    });
  };

  const handleCustomNameChange = (e) => {
    const newName = e.target.value;
    const isCustomSelected = state.selectedDhikr.id === 'custom';
    updateState({
      customDhikrName: newName,
      selectedDhikr: isCustomSelected ? { ...state.selectedDhikr, name: newName } : state.selectedDhikr
    });
  };

  const handleAddNewDhikr = () => {
    if (!newDhikrName.trim()) return;
    const newDhikr = {
      id: `user_${Date.now()}`,
      name: newDhikrName,
      target: Number(newDhikrTarget)
    };
    updateState({
      customDhikrs: [...(state.customDhikrs || []), newDhikr]
    });
    setNewDhikrName('');
    alert('ذکر با موفقیت اضافه شد');
  };

  const deleteDhikr = (id) => {
    if (window.confirm('آیا از حذف این ذکر مطمئن هستید؟')) {
      const filtered = state.customDhikrs.filter(d => d.id !== id);
      updateState({ 
        customDhikrs: filtered,
        // If selected was deleted, revert to default
        selectedDhikr: state.selectedDhikr.id === id ? DEFAULT_DHIKRS[0] : state.selectedDhikr
      });
    }
  };

  // Merge defaults with user dhikrs
  const allDhikrs = [...DEFAULT_DHIKRS, ...(state.customDhikrs || [])];

  return (
    <div style={{ padding: '24px', height: '100%', overflowY: 'auto', paddingBottom: '80px' }}>
      
      <div style={{ marginBottom: '32px' }}>
        <NeuButton onClick={() => updateState({ showGuide: true })} style={{ width: '100%' }}>
           <Icons.Info /> راهنمای برنامه و ذکر تنفسی
        </NeuButton>
      </div>

      {/* Add New Dhikr Section */}
      <h2 style={{ marginBottom: '16px', color: '#2D3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
         <Icons.Plus /> افزودن ذکر جدید
      </h2>
      <NeuCard style={{ marginBottom: '32px' }}>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#4A5568', fontSize: '14px' }}>عنوان ذکر</label>
          <NeuInput 
            value={newDhikrName} 
            onChange={e => setNewDhikrName(e.target.value)} 
            placeholder="مثال: صلوات خاصه..." 
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#4A5568', fontSize: '14px' }}>تعداد هدف</label>
           <NeuInput 
            type="number"
            value={newDhikrTarget} 
            onChange={e => setNewDhikrTarget(e.target.value)} 
            placeholder="مثال: ۱۰۰۰"
          />
        </div>
        <NeuButton onClick={handleAddNewDhikr} style={{ width: '100%' }}>
          افزودن به لیست
        </NeuButton>
      </NeuCard>

      {/* Breathing Settings */}
      <div style={{ marginBottom: '32px' }}>
         <h2 style={{ marginBottom: '16px', color: '#2D3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icons.Wind /> تنظیمات تنفس
        </h2>
        <NeuCard>
          <SettingCounter 
            label="زمان دم (Inhale)" 
            value={state.breathingConfig.inhale} 
            onChange={(v) => updateBreathConfig('inhale', v)} 
            min={1} max={10} 
          />
          <SettingCounter 
            label="زمان نگه داشتن (Hold)" 
            value={state.breathingConfig.hold} 
            onChange={(v) => updateBreathConfig('hold', v)} 
            min={0} max={10} 
          />
          <SettingCounter 
            label="زمان بازدم (Exhale)" 
            value={state.breathingConfig.exhale} 
            onChange={(v) => updateBreathConfig('exhale', v)} 
            min={1} max={10} 
          />
        </NeuCard>
      </div>

      <h2 style={{ marginBottom: '16px', color: '#2D3748' }}>انتخاب ذکر</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {allDhikrs.map(dhikr => {
          const isCustomSlot = dhikr.id === 'custom';
          const isUserCreated = dhikr.id.startsWith('user_');
          const isSelected = state.selectedDhikr.id === dhikr.id;
          const displayName = isCustomSlot ? state.customDhikrName : dhikr.name;

          return (
            <div 
              key={dhikr.id}
              onClick={() => {
                if (state.selectedDhikr.id !== dhikr.id) {
                    updateState({ selectedDhikr: isCustomSlot ? { ...dhikr, name: state.customDhikrName } : dhikr, count: 0 });
                }
              }}
            >
              <NeuCard style={{ 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: isSelected ? '2px solid #667EEA' : '2px solid transparent'
              }}>
                <div style={{ flex: 1 }}>
                  {isCustomSlot && isSelected ? (
                    <div onClick={e => e.stopPropagation()} style={{ marginBottom: '6px', marginRight: '-4px' }}>
                         <NeuInput
                            value={state.customDhikrName}
                            onChange={handleCustomNameChange}
                            placeholder="نام ذکر آزاد..."
                            style={{ padding: '8px', fontSize: '15px' }}
                        />
                    </div>
                  ) : (
                    <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '15px' }}>{displayName}</div>
                  )}
                  <div style={{ fontSize: '12px', color: '#A0AEC0' }}>
                    {dhikr.target > 0 ? `هدف: ${dhikr.target} مرتبه` : 'بدون محدودیت'}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {isSelected && <div style={{ color: '#667EEA' }}><Icons.Check /></div>}
                  {isUserCreated && (
                    <div 
                      onClick={(e) => { e.stopPropagation(); deleteDhikr(dhikr.id); }}
                      style={{ padding: '8px', cursor: 'pointer' }}
                    >
                      <Icons.Trash />
                    </div>
                  )}
                </div>
              </NeuCard>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Main App ---

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('noor_o_nava_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.breathingConfig) parsed.breathingConfig = DEFAULT_BREATHING_CONFIG;
        if (!parsed.customDhikrName) parsed.customDhikrName = 'ذکر آزاد';
        if (!parsed.customDhikrs) parsed.customDhikrs = []; // Initialize custom dhikrs list
        if (parsed.showCompletion === undefined) parsed.showCompletion = false;
        if (parsed.showGuide === undefined) parsed.showGuide = false;
        return parsed;
      } catch (e) {
        console.error('Failed to parse saved state', e);
      }
    }
    return {
      count: 0,
      selectedDhikr: DEFAULT_DHIKRS[0],
      history: [],
      totalLifetimeCount: 0,
      streak: 0,
      lastActiveDate: null,
      breathingEnabled: false,
      breathingConfig: DEFAULT_BREATHING_CONFIG,
      customDhikrName: 'ذکر آزاد',
      customDhikrs: [], // Store user created dhikrs
      showCompletion: false,
      showGuide: false
    };
  });

  useEffect(() => {
    localStorage.setItem('noor_o_nava_state', JSON.stringify(state));
  }, [state]);

  const updateState = (newState) => {
    setState(prev => ({ ...prev, ...newState }));
  };

  const closeCompletion = () => {
    updateState({ showCompletion: false });
  };

  const closeGuide = () => {
    updateState({ showGuide: false });
  };

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      backgroundColor: '#E0E5EC',
      direction: 'rtl' 
    }}>
      {/* Global Modals */}
      {state.showCompletion && <CompletionModal onClose={closeCompletion} />}
      {state.showGuide && <GuideModal onClose={closeGuide} />}

      {/* Content Area */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {activeTab === 'home' && <DhikrPage state={state} updateState={updateState} />}
        {activeTab === 'stats' && <StatsPage state={state} />}
        {activeTab === 'settings' && <SettingsPage state={state} updateState={updateState} />}
      </div>

      {/* Navigation Bar */}
      <div style={{ 
        padding: '16px 24px', 
        display: 'flex', 
        justifyContent: 'space-around', 
        backgroundColor: '#E0E5EC',
        boxShadow: '0 -4px 20px -5px rgba(163, 177, 198, 0.4)',
        zIndex: 50
      }}>
        <NeuButton 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')}
          style={{ borderRadius: '50%', width: '50px', height: '50px', padding: 0 }}
        >
          <Icons.Settings />
        </NeuButton>
        <NeuButton 
          active={activeTab === 'home'} 
          onClick={() => setActiveTab('home')}
          style={{ borderRadius: '50%', width: '50px', height: '50px', padding: 0 }}
        >
          <Icons.Home />
        </NeuButton>
        <NeuButton 
          active={activeTab === 'stats'} 
          onClick={() => setActiveTab('stats')}
          style={{ borderRadius: '50%', width: '50px', height: '50px', padding: 0 }}
        >
          <Icons.Chart />
        </NeuButton>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
