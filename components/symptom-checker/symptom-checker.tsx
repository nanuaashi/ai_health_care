import { useState } from 'react';

type CheckerStep = 'start' | 'questions' | 'results';

interface SymptomResult {
  condition: string;
  urgency: 'low' | 'medium' | 'high';
  description: string;
}

export default function SymptomChecker({ onBack }: { onBack?: () => void }) {
  const [step, setStep] = useState<CheckerStep>('start');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customSymptom, setCustomSymptom] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const symptoms = [
    '🤒 Fever',
    '😷 Cough',
    '🤧 Runny Nose',
    '🤕 Headache',
    '😫 Fatigue',
    '🤮 Nausea',
    '🤔 Confusion',
    '😤 Difficulty Breathing',
  ];

  const results: SymptomResult[] = [
    {
      condition: 'Common Cold',
      urgency: 'low',
      description:
        'Rest, stay hydrated, and use over-the-counter medications for symptom relief.',
    },
    {
      condition: 'Influenza (Flu)',
      urgency: 'medium',
      description:
        'Contact a health worker. Antiviral treatment may be recommended within 48 hours.',
    },
  ];

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleAddCustomSymptom = () => {
    if (customSymptom.trim() && !selectedSymptoms.includes(customSymptom)) {
      setSelectedSymptoms([...selectedSymptoms, customSymptom]);
      setCustomSymptom('');
      setShowCustomInput(false);
    }
  };

  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => prev.filter(s => s !== symptom));
  };

  if (step === 'start') {
    return (
      <div className="space-y-6">
        <div>
          {onBack && (
            <button
              onClick={onBack}
              className="text-primary font-semibold text-sm flex items-center gap-1 hover:text-primary/80 mb-4"
            >
              ← Back
            </button>
          )}
        </div>

        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            AI Symptom Checker
          </h2>
          <p className="text-muted-foreground">
            Answer a few questions about your symptoms to get personalized health guidance
          </p>
        </div>

        <button
          onClick={() => setStep('questions')}
          className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:bg-primary/90 active:scale-95"
        >
          Start Symptom Check
        </button>

        <p className="text-xs text-muted-foreground text-center">
          This is not a medical diagnosis. Always consult with healthcare professionals.
        </p>
      </div>
    );
  }

  if (step === 'questions') {
    return (
      <div className="space-y-6">
        <div>
          {onBack && (
            <button
              onClick={onBack}
              className="text-primary font-semibold text-sm flex items-center gap-1 hover:text-primary/80 mb-4"
            >
              ← Back
            </button>
          )}
          <h2 className="text-xl font-bold text-foreground mb-4">
            What symptoms are you experiencing?
          </h2>
          <p className="text-muted-foreground mb-6">
            Select all that apply (step 1 of 3)
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {symptoms.map((symptom) => (
            <button
              key={symptom}
              onClick={() => toggleSymptom(symptom)}
              className={`p-4 rounded-lg font-semibold transition-all ${
                selectedSymptoms.includes(symptom)
                  ? 'bg-primary text-primary-foreground border-2 border-primary'
                  : 'bg-card border-2 border-border text-foreground hover:border-primary'
              }`}
            >
              {symptom}
            </button>
          ))}
        </div>

        {selectedSymptoms.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">Selected Symptoms:</p>
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map((symptom) => (
                <div
                  key={symptom}
                  className="bg-primary/20 border border-primary rounded-full px-3 py-1 flex items-center gap-2 text-sm text-foreground"
                >
                  {symptom}
                  <button
                    onClick={() => removeSymptom(symptom)}
                    className="text-primary hover:text-primary/80 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-secondary/10 border-2 border-secondary rounded-lg p-4">
          <button
            onClick={() => setShowCustomInput(!showCustomInput)}
            className="w-full text-left font-semibold text-foreground hover:text-primary transition-colors"
          >
            + Add Custom Symptom
          </button>
          
          {showCustomInput && (
            <div className="mt-3 space-y-3">
              <input
                type="text"
                value={customSymptom}
                onChange={(e) => setCustomSymptom(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddCustomSymptom()}
                placeholder="Describe your symptom..."
                className="w-full px-3 py-2 rounded-lg bg-background border-2 border-border text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddCustomSymptom}
                  disabled={!customSymptom.trim()}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setShowCustomInput(false);
                    setCustomSymptom('');
                  }}
                  className="flex-1 py-2 bg-muted text-muted-foreground rounded-lg font-semibold hover:bg-muted/80"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-primary h-2 rounded-full w-1/3"></div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setStep('start')}
            className="flex-1 py-3 bg-muted text-muted-foreground rounded-lg font-bold hover:bg-muted/80"
          >
            Back
          </button>
          <button
            onClick={() => setStep('results')}
            disabled={selectedSymptoms.length === 0}
            className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        {onBack && (
          <button
            onClick={onBack}
            className="text-primary font-semibold text-sm flex items-center gap-1 hover:text-primary/80 mb-4"
          >
            ← Back
          </button>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Based on your symptoms:
        </h2>
        <p className="text-muted-foreground mb-6">
          {selectedSymptoms.join(', ')}
        </p>
      </div>

      <div className="space-y-4">
        {results.map((result, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg border-2 ${
              result.urgency === 'high'
                ? 'bg-destructive/10 border-destructive'
                : result.urgency === 'medium'
                  ? 'bg-accent/10 border-accent'
                  : 'bg-secondary/10 border-secondary'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-foreground">{result.condition}</h3>
              <span
                className={`text-xs font-bold px-3 py-1 rounded ${
                  result.urgency === 'high'
                    ? 'bg-destructive text-destructive-foreground'
                    : result.urgency === 'medium'
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {result.urgency.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{result.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-lg">
        <p className="font-semibold text-foreground mb-2">Next Steps:</p>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>✓ Start a consultation with AI Assistant</li>
          <li>✓ Schedule remote consultation with health worker</li>
          <li>✓ Visit nearest health center if urgent</li>
        </ul>
      </div>

      <button
        onClick={() => setStep('start')}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90"
      >
        New Check
      </button>
    </div>
  );
}
