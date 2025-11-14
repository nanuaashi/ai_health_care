'use client';

import { ThemeToggle } from '@/components/theme/theme-toggle';
import { useTheme } from '@/components/theme/theme-provider';
import { useEffect } from 'react';

interface RoleSelectionProps {
  onSelectRole: (role: 'patient' | 'health-worker' | 'admin') => void;
}

export default function RoleSelection({ onSelectRole }: RoleSelectionProps) {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/8 via-background to-secondary/5 flex flex-col items-center justify-center p-6 relative">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="max-w-2xl w-full space-y-8">
        {/* Header with Hero Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
              <span className="text-5xl">🏥</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            HealthCare Hub
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Smart Healthcare for Rural Communities
          </p>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            AI-powered diagnosis, remote consultations, and health management—all in one platform
          </p>
        </div>

        <div className="space-y-3 grid md:grid-cols-3 gap-4">
          <button
            onClick={() => onSelectRole('patient')}
            className="group p-8 bg-card border-2 border-border rounded-2xl hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all active:scale-95 backdrop-blur-sm"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">👤</div>
            <div className="font-bold text-xl text-foreground">Patient</div>
            <div className="text-sm text-muted-foreground mt-2">
              Manage health, get AI guidance
            </div>
          </button>

          <button
            onClick={() => onSelectRole('health-worker')}
            className="group p-8 bg-card border-2 border-border rounded-2xl hover:border-accent hover:shadow-xl hover:shadow-accent/10 transition-all active:scale-95 backdrop-blur-sm"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">👨‍⚕️</div>
            <div className="font-bold text-xl text-foreground">Health Worker</div>
            <div className="text-sm text-muted-foreground mt-2">
              Track patients & visits
            </div>
          </button>

          <button
            onClick={() => onSelectRole('admin')}
            className="group p-8 bg-card border-2 border-border rounded-2xl hover:border-secondary hover:shadow-xl hover:shadow-secondary/10 transition-all active:scale-95 backdrop-blur-sm"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📊</div>
            <div className="font-bold text-xl text-foreground">Administrator</div>
            <div className="text-sm text-muted-foreground mt-2">
              Oversee resources
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground space-y-2 pt-4 border-t border-border">
          <p className="font-medium">Available in: English, Hindi, Chhattisgarhi</p>
          <p className="text-xs opacity-75">Developed by X-Warriors</p>
        </div>
      </div>
    </div>
  );
}
