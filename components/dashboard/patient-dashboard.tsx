import { useState } from 'react';
import ChatInterface from '../chat/chat-interface';
import SymptomChecker from '../symptom-checker/symptom-checker';
import RemoteConsultation from '../consultation/remote-consultation';
import HealthRecords from '../health-records/health-records';
import PatientFeedback from '../feedback/patient-feedback';

interface PatientDashboardProps {
  onLogout: () => void;
}

interface Reminder {
  id: string;
  title: string;
  description: string;
  time: string;
  category: 'medicine' | 'vaccination' | 'checkup' | 'custom';
  isActive: boolean;
}

export default function PatientDashboard({ onLogout }: PatientDashboardProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'symptoms' | 'consultation' | 'records' | 'feedback'>('home');
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: '💉 Vaccination Due',
      description: 'COVID-19 booster due this week',
      time: '',
      category: 'vaccination',
      isActive: true,
    },
    {
      id: '2',
      title: '💊 Medicine Reminder',
      description: 'Take your blood pressure medication at 9 AM',
      time: '09:00',
      category: 'medicine',
      isActive: true,
    },
    {
      id: '3',
      title: '👶 Pregnancy Checkup',
      description: 'Regular checkup scheduled for next Monday',
      time: '',
      category: 'checkup',
      isActive: true,
    },
  ]);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    time: '',
    category: 'custom' as const,
  });

  const handleAddReminder = () => {
    if (newReminder.title.trim()) {
      const reminder: Reminder = {
        id: Date.now().toString(),
        title: newReminder.title,
        description: newReminder.description,
        time: newReminder.time,
        category: newReminder.category,
        isActive: true,
      };
      setReminders([...reminders, reminder]);
      setNewReminder({
        title: '',
        description: '',
        time: '',
        category: 'custom',
      });
      setShowAddReminder(false);
    }
  };

  const handleRemoveReminder = (id: string) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  const handleToggleReminder = (id: string) => {
    setReminders(
      reminders.map((r) =>
        r.id === id ? { ...r, isActive: !r.isActive } : r
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-gradient-to-r from-card to-card/50 border-b border-border/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-md">
              <span className="text-2xl">🏥</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                HealthCare Hub
              </h1>
              <p className="text-xs text-muted-foreground">Your Personal Health Manager</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 text-sm font-bold text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto p-4 pb-28">
        {activeTab === 'home' && (
          <div className="space-y-8">
            {/* Emergency SOS */}
            <div className="mb-8">
              <button className="w-full py-6 px-6 bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-destructive/40 active:scale-95 transition-all shadow-lg">
                🆘 EMERGENCY - CALL FOR HELP
              </button>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveTab('symptoms')}
                  className="group p-6 bg-card border-2 border-border rounded-2xl hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all active:scale-95"
                >
                  <div className="text-4xl mb-3 group-hover:scale-125 transition-transform">🔍</div>
                  <div className="font-bold text-foreground">Check Symptoms</div>
                  <p className="text-xs text-muted-foreground mt-1">AI diagnosis</p>
                </button>

                <button
                  onClick={() => setActiveTab('chat')}
                  className="group p-6 bg-card border-2 border-border rounded-2xl hover:border-accent hover:shadow-xl hover:shadow-accent/10 transition-all active:scale-95"
                >
                  <div className="text-4xl mb-3 group-hover:scale-125 transition-transform">💬</div>
                  <div className="font-bold text-foreground">AI Assistant</div>
                  <p className="text-xs text-muted-foreground mt-1">Get guidance</p>
                </button>

                <button
                  onClick={() => setActiveTab('consultation')}
                  className="group p-6 bg-card border-2 border-border rounded-2xl hover:border-secondary hover:shadow-xl hover:shadow-secondary/10 transition-all active:scale-95"
                >
                  <div className="text-4xl mb-3 group-hover:scale-125 transition-transform">📞</div>
                  <div className="font-bold text-foreground">Consultation</div>
                  <p className="text-xs text-muted-foreground mt-1">Talk to doctor</p>
                </button>

                <button
                  onClick={() => setActiveTab('feedback')}
                  className="group p-6 bg-card border-2 border-border rounded-2xl hover:border-accent hover:shadow-xl hover:shadow-accent/10 transition-all active:scale-95"
                >
                  <div className="text-4xl mb-3 group-hover:scale-125 transition-transform">⭐</div>
                  <div className="font-bold text-foreground">Feedback</div>
                  <p className="text-xs text-muted-foreground mt-1">Share thoughts</p>
                </button>
              </div>
            </div>

            {/* Reminders Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Your Health Reminders</h2>
                <button
                  onClick={() => setShowAddReminder(!showAddReminder)}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg text-sm font-bold hover:shadow-lg transition-all"
                >
                  + Add Reminder
                </button>
              </div>

              {showAddReminder && (
                <div className="bg-secondary/5 border-2 border-secondary rounded-2xl p-6 space-y-4">
                  <input
                    type="text"
                    value={newReminder.title}
                    onChange={(e) =>
                      setNewReminder({ ...newReminder, title: e.target.value })
                    }
                    placeholder="Reminder title (e.g., Take Medicine)"
                    className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none transition-all"
                  />
                  <input
                    type="text"
                    value={newReminder.description}
                    onChange={(e) =>
                      setNewReminder({ ...newReminder, description: e.target.value })
                    }
                    placeholder="Description (optional)"
                    className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none transition-all"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="time"
                      value={newReminder.time}
                      onChange={(e) =>
                        setNewReminder({ ...newReminder, time: e.target.value })
                      }
                      className="px-4 py-3 rounded-xl bg-background border-2 border-border text-foreground focus:border-primary focus:outline-none transition-all"
                    />
                    <select
                      value={newReminder.category}
                      onChange={(e) =>
                        setNewReminder({ ...newReminder, category: e.target.value as any })
                      }
                      className="px-4 py-3 rounded-xl bg-background border-2 border-border text-foreground focus:border-primary focus:outline-none transition-all"
                    >
                      <option value="medicine">Medicine</option>
                      <option value="vaccination">Vaccination</option>
                      <option value="checkup">Checkup</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleAddReminder}
                      disabled={!newReminder.title.trim()}
                      className="flex-1 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-bold hover:shadow-lg disabled:opacity-50 transition-all"
                    >
                      Save Reminder
                    </button>
                    <button
                      onClick={() => setShowAddReminder(false)}
                      className="flex-1 py-3 bg-muted text-muted-foreground rounded-xl font-semibold hover:bg-muted/80 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {reminders.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">
                    No reminders yet. Click + Add Reminder to create one!
                  </p>
                ) : (
                  reminders.map((reminder) => (
                    <div
                      key={reminder.id}
                      className={`p-4 rounded-xl border-l-4 transition-all ${
                        reminder.category === 'medicine'
                          ? 'bg-accent/10 border-accent'
                          : reminder.category === 'vaccination'
                            ? 'bg-secondary/10 border-secondary'
                            : reminder.category === 'checkup'
                              ? 'bg-primary/10 border-primary'
                              : 'bg-muted/10 border-muted'
                      } ${!reminder.isActive ? 'opacity-50' : ''}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-bold text-foreground text-lg">
                            {reminder.title}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {reminder.description}
                          </p>
                          {reminder.time && (
                            <p className="text-xs text-muted-foreground mt-2">
                              🕐 {reminder.time}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2 ml-3">
                          <button
                            onClick={() => handleToggleReminder(reminder.id)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              reminder.isActive
                                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
                          >
                            {reminder.isActive ? 'On' : 'Off'}
                          </button>
                          <button
                            onClick={() => handleRemoveReminder(reminder.id)}
                            className="px-2 py-1 text-destructive hover:text-destructive/80 font-bold text-lg"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chat' && <ChatInterface onBack={() => setActiveTab('home')} />}
        {activeTab === 'symptoms' && <SymptomChecker onBack={() => setActiveTab('home')} />}
        {activeTab === 'consultation' && <RemoteConsultation />}
        {activeTab === 'records' && <HealthRecords />}
        {activeTab === 'feedback' && <PatientFeedback onBack={() => setActiveTab('home')} />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/50 backdrop-blur-md shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-around">
          {[
            { id: 'home' as const, icon: '🏠', label: 'Home' },
            { id: 'chat' as const, icon: '💬', label: 'Chat' },
            { id: 'symptoms' as const, icon: '🔍', label: 'Check' },
            { id: 'consultation' as const, icon: '📞', label: 'Doctor' },
            { id: 'feedback' as const, icon: '⭐', label: 'Feedback' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-4 gap-1 font-bold transition-all ${
                activeTab === tab.id
                  ? 'text-primary scale-110'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="text-2xl">{tab.icon}</span>
              <span className="text-xs">{tab.label}</span>
            </button>
          ))}
        </div>
        <div className="text-center py-2 text-xs text-muted-foreground border-t border-border/50">
          Developed by X-Warriors
        </div>
      </nav>
    </div>
  );
}
