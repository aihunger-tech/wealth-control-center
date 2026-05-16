'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { User, Target, ShieldAlert, Zap, Award, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useProfileStore } from '@/hooks/useProfileStore';
import Link from 'next/link';

export default function ProfilePage() {
  const { profile, updateProfile, addXP } = useProfileStore();
  
  const tierXP = {
    'Novice': 1000,
    'Novice-Plus': 2500,
    'Strategist': 5000,
    'Architect': 10000,
    'RICH': 100000,
  };

  const currentTierLimit = tierXP[profile.currentTier as keyof typeof tierXP] || 1000;
  const progress = Math.min(100, (profile.experiencePoints / currentTierLimit) * 100);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 sm:p-8 max-w-4xl mx-auto w-full">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-1">
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-4 text-sm font-mono">
            ← Return to Intelligence Hub
          </Link>
          <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3">
            <User className="text-blue-500" /> Wealth <span className="text-blue-500">DNA</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Current Tier</p>
            <p className="text-lg font-black font-mono text-blue-400">{profile.currentTier}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Persona & Goal Section */}
        <div className="space-y-6">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-md space-y-6">
            <h3 className="text-white font-bold flex items-center gap-2 mb-4">
              <Target size={18} className="text-blue-500" /> Identity Core
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Wealth Persona</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Novice', 'Intermediate', 'Professional', 'Institutional'].map((p) => (
                    <button 
                      key={p}
                      onClick={() => updateProfile({ persona: p as any })}
                      className={cn(
                        "px-3 py-2 rounded-lg text-xs font-bold transition-all border",
                        profile.persona === p ? "bg-blue-500 border-blue-500 text-white" : "bg-black border-white/10 text-gray-500 hover:border-white/30"
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Investment Goal</label>
                <select 
                  value={profile.goal} 
                  onChange={(e) => updateProfile({ goal: e.target.value as any })}
                  className="w-full bg-black border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-blue-500 transition-all"
                >
                  <option value="Preservation">Wealth Preservation</option>
                  <option value="Balanced Growth">Balanced Growth</option>
                  <option value="Hyper Growth">Hyper Growth</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Risk Appetite</label>
                <div className="flex gap-2">
                  {['Conservative', 'Moderate', 'Aggressive'].map((r) => (
                    <button 
                      key={r}
                      onClick={() => updateProfile({ riskAppetite: r as any })}
                      className={cn(
                        "flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all border",
                        profile.riskAppetite === r ? "bg-blue-500 border-blue-500 text-white" : "bg-black border-white/10 text-gray-500 hover:border-white/30"
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Growth & Knowledge Section */}
        <div className="space-y-6">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-md space-y-8">
            <h3 className="text-white font-bold flex items-center gap-2 mb-4">
              <Award size={18} className="text-blue-500" /> Competency Level
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <p className="text-gray-500 text-xs font-mono uppercase">Knowledge Index</p>
                <p className="text-2xl font-black font-mono text-white">{profile.knowledgeLevel}%</p>
              </div>
              <div className="relative h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${profile.knowledgeLevel}%` }}
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                />
              </div>
              <p className="text-[10px] text-gray-500 italic text-center">
                Level up by completing strategy playbooks and optimizing your portfolio.
              </p>
            </div>

             <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
               <div className="flex items-center justify-between">
                 <span className="text-[10px] text-gray-500 uppercase font-bold">Current Tier: {profile.currentTier}</span>
                 <span className="text-blue-400 font-bold text-[10px] uppercase tracking-widest">{profile.targetTier}</span>
               </div>
               <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${progress}%` }}
                   className="h-full bg-blue-500" 
                 />
               </div>
               <div className="flex justify-between items-center">
                 <p className="text-zinc-500 text-[10px] font-mono uppercase">XP: {profile.experiencePoints}</p>
                 <p className="text-zinc-500 text-[10px] font-mono uppercase">{Math.floor(currentTierLimit)} XP Target</p>
               </div>
               <button 
                onClick={() => addXP(Math.floor(Math.random() * 100))}
                className="w-full py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-2"
               >
                <Zap size={12} /> Simulate XP Gain
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
