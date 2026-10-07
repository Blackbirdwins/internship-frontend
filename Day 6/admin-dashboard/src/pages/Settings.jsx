import { useState } from 'react';
import { User, Bell, Shield, Save } from 'lucide-react';
import { Card, Button } from '../components/UI';
import { FadeUp } from '../components/MotionWrappers';

export default function Settings() {
  const [form, setForm] = useState({ name: 'Anas Khan', email: 'anas@example.pk', bio: 'Full Stack Developer' });
  const [prefs, setPrefs] = useState({ emailNotif: true, pushNotif: false, marketing: true });

  const Toggle = ({ on, onToggle }) => (
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors ${on ? 'bg-gradient-to-r from-violet-500 to-purple-600' : 'bg-white/10'}`}
    >
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
    </button>
  );

  return (
    <div className="space-y-6 w-full">
      <FadeUp>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-1">
            <span className="text-gradient">Settings</span>
          </h1>
          <p className="text-sm text-slate-500">Manage your account and preferences.</p>
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <FadeUp delay={0.1}>
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-violet-500/15 flex items-center justify-center">
                <User size={16} className="text-violet-300" />
              </div>
              <div>
                <h3 className="text-sm font-bold">Profile</h3>
                <p className="text-[11px] text-slate-500">Your personal information</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[11px] uppercase tracking-widest text-slate-500 font-bold mb-1.5 block">Full Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-violet-400/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-widest text-slate-500 font-bold mb-1.5 block">Email</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-violet-400/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-widest text-slate-500 font-bold mb-1.5 block">Bio</label>
                <textarea
                  rows={3}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-violet-400/50 transition-colors resize-none"
                />
              </div>
              <div>
                <Button>
                  <span className="flex items-center gap-1.5">
                    <Save size={14} />
                    Save Changes
                  </span>
                </Button>
              </div>
            </div>
          </Card>
        </FadeUp>

        <div className="space-y-6">
          <FadeUp delay={0.2}>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/15 flex items-center justify-center">
                  <Bell size={16} className="text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Notifications</h3>
                  <p className="text-[11px] text-slate-500">How you get notified</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'emailNotif', label: 'Email Notifications', desc: 'Receive updates via email' },
                  { key: 'pushNotif', label: 'Push Notifications', desc: 'Browser push alerts' },
                  { key: 'marketing', label: 'Marketing Emails', desc: 'Product updates and offers' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-[11px] text-slate-500">{item.desc}</p>
                    </div>
                    <Toggle on={prefs[item.key]} onToggle={() => setPrefs({ ...prefs, [item.key]: !prefs[item.key] })} />
                  </div>
                ))}
              </div>
            </Card>
          </FadeUp>

          <FadeUp delay={0.3}>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-rose-500/15 flex items-center justify-center">
                  <Shield size={16} className="text-rose-300" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Security</h3>
                  <p className="text-[11px] text-slate-500">Password and 2FA</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Change Password</Button>
            </Card>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}