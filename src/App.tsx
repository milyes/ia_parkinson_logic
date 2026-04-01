import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Mic, 
  BrainCircuit, 
  FileAudio, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Play, 
  Square,
  CheckCircle2
} from 'lucide-react';
import { 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

const riskData = [
  { date: '01/03', score: 12 },
  { date: '08/03', score: 14 },
  { date: '15/03', score: 18 },
  { date: '22/03', score: 15 },
  { date: '29/03', score: 22 },
  { date: '05/04', score: 28 },
  { date: '12/04', score: 35 },
];

const historyData = [
  { id: 'AN-892', date: '12/04/2026', duration: '0:45', jitter: '1.2%', shimmer: '3.4%', risk: 'Élevé', status: 'completed' },
  { id: 'AN-891', date: '05/04/2026', duration: '1:12', jitter: '0.9%', shimmer: '2.8%', risk: 'Modéré', status: 'completed' },
  { id: 'AN-890', date: '29/03/2026', duration: '0:58', jitter: '0.7%', shimmer: '2.1%', risk: 'Faible', status: 'completed' },
  { id: 'AN-889', date: '22/03/2026', duration: '1:05', jitter: '0.5%', shimmer: '1.9%', risk: 'Faible', status: 'completed' },
];

export default function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [analysisState, setAnalysisState] = useState<'idle' | 'recording' | 'analyzing' | 'complete'>('idle');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleRecordToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      setAnalysisState('analyzing');
      setTimeout(() => {
        setAnalysisState('complete');
        setRecordingTime(0);
      }, 3000);
    } else {
      setIsRecording(true);
      setAnalysisState('recording');
      setRecordingTime(0);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex h-screen bg-[var(--color-background)] text-[var(--color-text)] overflow-hidden selection:bg-[var(--color-primary)] selection:text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-[var(--color-border)]">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 text-black" />
          </div>
          <span className="font-bold text-lg tracking-tight">IA Parkinson Logic</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <NavItem icon={<Activity />} label="Tableau de bord" active />
          <NavItem icon={<Mic />} label="Analyse Vocale" />
          <NavItem icon={<FileAudio />} label="Historique" />
          <NavItem icon={<TrendingUp />} label="Évolution" />
        </nav>

        <div className="p-4 border-t border-[var(--color-border)] space-y-2">
          <NavItem icon={<Settings />} label="Paramètres" />
          <NavItem icon={<LogOut />} label="Déconnexion" className="text-red-400 hover:text-red-300 hover:bg-red-400/10" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 border-b border-[var(--color-border)] flex items-center justify-between px-8 bg-[var(--color-background)]/80 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-semibold">Vue d'ensemble du patient</h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">ID Patient: #PT-8492 • Dr. Laurent</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-medium">Jean Dupont</div>
              <div className="text-xs text-[var(--color-text-muted)]">Dernière visite: 12/04/2026</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-[var(--color-border)] border-2 border-[var(--color-primary)] overflow-hidden">
              <img src="https://picsum.photos/seed/patient/100/100" alt="Patient" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8 max-w-7xl mx-auto">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KpiCard 
              title="Score de Risque Actuel" 
              value="35" 
              unit="/ 100"
              trend="+7 pts"
              trendUp={true}
              icon={<Activity className="text-[var(--color-primary)]" />}
              color="var(--color-primary)"
            />
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-secondary)]/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
              <div className="flex justify-between items-start relative z-10">
                <span className="text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Indicateurs Vocaux</span>
                <Mic className="text-[var(--color-secondary)]" />
              </div>
              <div className="mt-4 relative z-10">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm text-[var(--color-text-muted)]">Jitter (Instabilité freq.)</span>
                  <span className="font-mono text-[var(--color-secondary)]">1.2%</span>
                </div>
                <div className="w-full bg-[var(--color-border)] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[var(--color-secondary)] h-full rounded-full" style={{ width: '60%' }}></div>
                </div>
                
                <div className="flex justify-between items-end mt-4 mb-2">
                  <span className="text-sm text-[var(--color-text-muted)]">Shimmer (Instabilité amp.)</span>
                  <span className="font-mono text-[var(--color-secondary)]">3.4%</span>
                </div>
                <div className="w-full bg-[var(--color-border)] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[var(--color-secondary)] h-full rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
            <KpiCard 
              title="Fiabilité du Modèle IA" 
              value="94.2" 
              unit="%"
              trend="Stable"
              trendUp={null}
              icon={<BrainCircuit className="text-[var(--color-primary)]" />}
              color="var(--color-primary)"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Voice Analysis Section */}
            <div className="lg:col-span-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Nouvelle Analyse</h2>
                {analysisState === 'recording' && (
                  <span className="flex items-center gap-2 text-xs font-mono text-red-400 bg-red-400/10 px-2 py-1 rounded-md">
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                    ENR. {formatTime(recordingTime)}
                  </span>
                )}
              </div>

              <div className="flex-1 flex flex-col items-center justify-center py-8">
                <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                  {/* Ripple effect when recording */}
                  {isRecording && (
                    <>
                      <div className="absolute inset-0 rounded-full border border-[var(--color-secondary)]/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                      <div className="absolute inset-4 rounded-full border border-[var(--color-secondary)]/50 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]"></div>
                    </>
                  )}
                  
                  <button 
                    onClick={handleRecordToggle}
                    disabled={analysisState === 'analyzing'}
                    className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg
                      ${isRecording 
                        ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' 
                        : analysisState === 'analyzing'
                          ? 'bg-[var(--color-border)] cursor-not-allowed'
                          : 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] hover:scale-105 shadow-[var(--color-primary)]/20 text-black'
                      }`}
                  >
                    {isRecording ? (
                      <Square className="w-8 h-8 fill-current" />
                    ) : analysisState === 'analyzing' ? (
                      <div className="w-8 h-8 border-4 border-[var(--color-text-muted)] border-t-[var(--color-primary)] rounded-full animate-spin"></div>
                    ) : (
                      <Mic className="w-10 h-10" />
                    )}
                  </button>
                </div>

                <div className="text-center h-16">
                  {analysisState === 'idle' && (
                    <p className="text-[var(--color-text-muted)]">Appuyez pour commencer l'enregistrement vocal (phonème "A" soutenu)</p>
                  )}
                  {analysisState === 'recording' && (
                    <div className="flex items-center justify-center gap-1 h-8">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                        <div 
                          key={i} 
                          className="w-1.5 bg-[var(--color-secondary)] rounded-full"
                          style={{ 
                            height: `${Math.max(20, Math.random() * 100)}%`,
                            animation: `pulse ${0.5 + Math.random()}s ease-in-out infinite alternate`
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                  {analysisState === 'analyzing' && (
                    <p className="text-[var(--color-primary)] animate-pulse">Extraction des biomarqueurs vocaux en cours...</p>
                  )}
                  {analysisState === 'complete' && (
                    <div className="flex items-center justify-center gap-2 text-[var(--color-secondary)]">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Analyse terminée avec succès</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Risk Chart */}
            <div className="lg:col-span-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Évolution du Score de Risque</h2>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[var(--color-primary)]"></div>
                    <span className="text-[var(--color-text-muted)]">Score IA</span>
                  </div>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={riskData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      stroke="var(--color-text-muted)" 
                      fontSize={12} 
                      tickLine={false}
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis 
                      stroke="var(--color-text-muted)" 
                      fontSize={12} 
                      tickLine={false}
                      axisLine={false}
                      dx={-10}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--color-surface)', 
                        borderColor: 'var(--color-border)',
                        borderRadius: '8px',
                        color: 'var(--color-text)'
                      }}
                      itemStyle={{ color: 'var(--color-primary)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="var(--color-primary)" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorScore)" 
                      activeDot={{ r: 6, fill: 'var(--color-secondary)', stroke: 'var(--color-background)', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* History Table */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
              <h2 className="text-lg font-semibold">Historique des Analyses</h2>
              <button className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 font-medium">Voir tout</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--color-background)]/50 text-[var(--color-text-muted)] text-sm uppercase tracking-wider">
                    <th className="p-4 font-medium">ID Analyse</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Durée</th>
                    <th className="p-4 font-medium">Jitter</th>
                    <th className="p-4 font-medium">Shimmer</th>
                    <th className="p-4 font-medium">Niveau de Risque</th>
                    <th className="p-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {historyData.map((row) => (
                    <tr key={row.id} className="hover:bg-[var(--color-surface-hover)] transition-colors">
                      <td className="p-4 font-mono text-sm">{row.id}</td>
                      <td className="p-4 text-sm">{row.date}</td>
                      <td className="p-4 text-sm text-[var(--color-text-muted)]">{row.duration}</td>
                      <td className="p-4 font-mono text-sm">{row.jitter}</td>
                      <td className="p-4 font-mono text-sm">{row.shimmer}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                          ${row.risk === 'Élevé' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                            row.risk === 'Modéré' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                            'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] border-[var(--color-secondary)]/20'}`}
                        >
                          {row.risk}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="p-2 hover:bg-[var(--color-border)] rounded-lg transition-colors text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                          <Play className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, className = "" }: { icon: React.ReactNode, label: string, active?: boolean, className?: string }) {
  return (
    <a 
      href="#" 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
        ${active 
          ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium' 
          : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]'}
        ${className}
      `}
    >
      <span className={active ? 'text-[var(--color-primary)]' : ''}>{icon}</span>
      <span>{label}</span>
    </a>
  );
}

function KpiCard({ title, value, unit, trend, trendUp, icon, color }: any) {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 relative overflow-hidden group">
      <div 
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 opacity-10"
        style={{ backgroundColor: color }}
      ></div>
      <div className="flex justify-between items-start relative z-10">
        <span className="text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-wider">{title}</span>
        {icon}
      </div>
      <div className="mt-4 flex items-baseline gap-2 relative z-10">
        <span className="text-4xl font-mono font-medium tracking-tight">{value}</span>
        <span className="text-[var(--color-text-muted)]">{unit}</span>
      </div>
      <div className="mt-4 flex items-center gap-2 relative z-10">
        {trendUp !== null && (
          <span className={`text-xs font-medium px-2 py-1 rounded-md ${trendUp ? 'bg-red-500/10 text-red-400' : 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]'}`}>
            {trend}
          </span>
        )}
        {trendUp === null && (
          <span className="text-xs font-medium px-2 py-1 rounded-md bg-[var(--color-border)] text-[var(--color-text-muted)]">
            {trend}
          </span>
        )}
        <span className="text-xs text-[var(--color-text-muted)]">vs mois dernier</span>
      </div>
    </div>
  );
}
