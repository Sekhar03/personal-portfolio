import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch("/api/contact", { 
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus(''), 5000);
      } else {
        // Fallback to error state which triggers the mailto button
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      setStatus('error');
    }
  };

  const handleMailto = () => {
    const mailtoLink = `mailto:sekharparida2003@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
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
                name="name"
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
                name="email"
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
              name="subject"
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
              name="message"
              placeholder="Hello Sekhar, I'd like to talk about..."
              className="w-full bg-dark/40 border border-white/5 rounded-2xl px-6 py-4 focus:border-primary/50 outline-none transition-all placeholder:text-slate-700 font-semibold resize-none"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            ></textarea>
          </div>

          {status === 'error' ? (
            <button 
              type="button" 
              onClick={handleMailto}
              className="w-full py-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 font-bold uppercase tracking-widest hover:bg-red-500/20 transition-all flex items-center justify-center gap-4"
            >
              <i className="fas fa-envelope-open-text"></i>
              Open Email Client to Send Directly
            </button>
          ) : (
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
          )}
          
          {status === 'error' && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-[10px] font-bold text-slate-500 mt-4 uppercase tracking-[0.2em]"
            >
              Automatic delivery failed. Use the direct link above to send manually.
            </motion.p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
