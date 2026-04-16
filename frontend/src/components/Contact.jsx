import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate successful submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(''), 5000);
    }, 1500);
  };

  return (
    <div className="bento-item p-10 md:p-16 relative overflow-hidden max-w-4xl mx-auto">
      {/* Background Decor */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-[100px]"></div>

      <div className="relative z-10">
        <div className="text-center mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">Secure Channel</p>
          <h3 className="text-4xl md:text-5xl font-black font-outfit tracking-tighter uppercase">Drop a Message</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Identity</label>
              <input 
                type="text" 
                placeholder="Name"
                className="w-full bg-dark/40 border border-white/5 rounded-2xl px-6 py-4 focus:border-primary/50 outline-none transition-all placeholder:text-slate-700 font-semibold"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Transmission Address</label>
              <input 
                type="email" 
                placeholder="Email"
                className="w-full bg-dark/40 border border-white/5 rounded-2xl px-6 py-4 focus:border-primary/50 outline-none transition-all placeholder:text-slate-700 font-semibold"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Protocol / Subject</label>
            <input 
              type="text" 
              placeholder="Reason for Contact"
              className="w-full bg-dark/40 border border-white/5 rounded-2xl px-6 py-4 focus:border-primary/50 outline-none transition-all placeholder:text-slate-700 font-semibold"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Payload / Message</label>
            <textarea 
              rows="6"
              placeholder="Hello Sekhar, I'd like to talk about..."
              className="w-full bg-dark/40 border border-white/5 rounded-2xl px-6 py-4 focus:border-primary/50 outline-none transition-all placeholder:text-slate-700 font-semibold resize-none"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={status === 'sending'}
            className="btn-primary w-full py-5 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
          >
            <div className="relative z-10 flex items-center justify-center gap-4">
              {status === 'sending' ? 'Establishing Connection...' : status === 'success' ? 'Transmission Successful!' : 'Send Message'}
              <i className={`fas ${status === 'success' ? 'fa-check-circle' : 'fa-paper-plane'} text-xs group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform`}></i>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
