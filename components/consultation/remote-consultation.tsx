import { useState } from 'react';

type ConsultationStep = 'options' | 'waiting' | 'active' | 'summary';

interface ConsultationSession {
  doctorName: string;
  consultationTime: string;
  notes: string;
}

export default function RemoteConsultation() {
  const [step, setStep] = useState<ConsultationStep>('options');
  const [selectedMode, setSelectedMode] = useState<'video' | 'audio' | null>(null);
  const [sessionTime, setSessionTime] = useState(0);
  const [sessionNotes, setSessionNotes] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const modes = [
    { id: 'video', icon: '📹', label: 'Video Call', desc: 'Face-to-face consultation' },
    { id: 'audio', icon: '📱', label: 'Audio Call', desc: 'Phone consultation' },
  ];

  const doctors = [
    { name: 'Dr. Rajesh Kumar', specialty: 'General Physician', waitTime: '5 min' },
    { name: 'Dr. Priya Singh', specialty: 'Pediatrician', waitTime: '12 min' },
    { name: 'Dr. Amit Patel', specialty: 'Cardiologist', waitTime: '20 min' },
  ];

  if (step === 'options') {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📞</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Remote Consultation
          </h2>
          <p className="text-muted-foreground">
            Connect with healthcare professionals
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-foreground mb-4">Select consultation mode:</h3>
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                setSelectedMode(mode.id as 'video' | 'audio');
                setStep('waiting');
              }}
              className="w-full p-4 bg-card border-2 border-border rounded-lg hover:border-primary hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{mode.icon}</span>
                <div>
                  <div className="font-bold text-foreground">{mode.label}</div>
                  <div className="text-sm text-muted-foreground">{mode.desc}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-bold text-foreground mb-3">Available Doctors:</h3>
          <div className="space-y-2">
            {doctors.map((doc, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                <div>
                  <p className="font-semibold text-foreground">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.specialty}</p>
                </div>
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                  {doc.waitTime}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'waiting') {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="text-4xl mb-4 animate-bounce">⏳</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Connecting you...
          </h2>
          <p className="text-muted-foreground">
            Your consultation request has been sent
          </p>
        </div>

        <div className="p-6 bg-card border-2 border-border rounded-lg space-y-4">
          <h3 className="font-bold text-foreground">Pre-Consultation Summary:</h3>

          <div className="space-y-3">
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Consultation Mode</p>
              <p className="font-semibold text-foreground">
                {selectedMode === 'video' ? '📹 Video Call' : '📱 Audio Call'}
              </p>
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Your Symptoms</p>
              <p className="font-semibold text-foreground">Fever, Cough, Fatigue</p>
              <p className="text-xs text-muted-foreground mt-1">Duration: 2 days</p>
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Estimated Wait Time</p>
              <p className="font-semibold text-foreground">5-10 minutes</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setStep('active')}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90"
        >
          Doctor Ready - Start Consultation
        </button>

        <button
          onClick={() => setStep('options')}
          className="w-full py-3 bg-muted text-muted-foreground rounded-lg font-bold hover:bg-muted/80"
        >
          Cancel
        </button>
      </div>
    );
  }

  if (step === 'active') {
    return (
      <div className="space-y-6">
        {/* Video/Audio Frame */}
        <div className="relative bg-muted rounded-lg overflow-hidden aspect-video flex items-center justify-center border-2 border-border">
          <div className="text-center">
            <div className="text-6xl mb-4">👨‍⚕️</div>
            <p className="font-bold text-foreground">Dr. Rajesh Kumar</p>
            <p className="text-sm text-muted-foreground">Connected</p>
          </div>

          {/* Timer */}
          <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold">
            {Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, '0')}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3 justify-center">
          <button className="p-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90">
            🎤
          </button>
          <button className="p-4 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/90">
            📹
          </button>
          <button className="p-4 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90">
            📞
          </button>
        </div>

        {/* Image Upload */}
        <div className="bg-card border-2 border-border rounded-lg p-4">
          <p className="font-bold text-foreground mb-3">Share Medical Images</p>
          <input
            type="file"
            multiple
            accept="image/*"
            className="w-full text-sm"
            onChange={(e) => {
              if (e.target.files) {
                setUploadedImages(Array.from(e.target.files).map((f) => f.name));
              }
            }}
          />
          {uploadedImages.length > 0 && (
            <p className="text-xs text-primary mt-2">{uploadedImages.length} image(s) uploaded</p>
          )}
        </div>

        {/* Chat/Notes */}
        <div className="bg-card border-2 border-border rounded-lg p-4">
          <p className="font-bold text-foreground mb-3">Consultation Notes</p>
          <textarea
            value={sessionNotes}
            onChange={(e) => setSessionNotes(e.target.value)}
            placeholder="Doctor's notes and recommendations will appear here..."
            className="w-full p-3 bg-background border border-border rounded text-foreground text-sm resize-none"
            rows={4}
          />
        </div>

        <button
          onClick={() => setStep('summary')}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90"
        >
          End Consultation
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <div className="text-4xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Consultation Complete
        </h2>
        <p className="text-muted-foreground">Thank you for using our service</p>
      </div>

      <div className="space-y-4">
        {/* Summary Card */}
        <div className="p-6 bg-card border-2 border-border rounded-lg space-y-4">
          <h3 className="font-bold text-foreground text-lg">Consultation Summary</h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">Doctor</p>
              <p className="font-semibold text-foreground text-sm">Dr. Rajesh Kumar</p>
            </div>
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="font-semibold text-foreground text-sm">12 minutes</p>
            </div>
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <p className="text-xs text-muted-foreground mb-2">Recommendations</p>
            <ul className="text-sm text-foreground space-y-1">
              <li>✓ Rest for 2-3 days</li>
              <li>✓ Drink plenty of water</li>
              <li>✓ Take prescribed medication</li>
              <li>✓ Follow-up in 1 week</li>
            </ul>
          </div>
        </div>

        {/* Prescription */}
        <div className="p-6 bg-secondary/10 border-2 border-secondary rounded-lg">
          <h3 className="font-bold text-foreground mb-3">Prescribed Medications</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-foreground">Paracetamol 500mg</span>
              <span className="text-muted-foreground">2x daily</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground">Cough Syrup</span>
              <span className="text-muted-foreground">3x daily</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90">
            📥 Download Report
          </button>
          <button
            onClick={() => setStep('options')}
            className="w-full py-3 bg-muted text-muted-foreground rounded-lg font-bold hover:bg-muted/80"
          >
            Book Another Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
