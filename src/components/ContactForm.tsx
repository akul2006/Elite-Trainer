import * as React from 'react';
import { Mail, Share2, MessageSquare, Copy, Check, CheckCircle2, Building, UserCircle, School, ChevronDown } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  companyName?: string;
  teamSize?: string;
  linkedinUrl?: string;
  institutionName?: string;
}

interface FormErrors { name?: string; email?: string; message?: string; companyName?: string; linkedinUrl?: string; }
interface ContactFormProps { initialService: string; onServiceChange: (serviceId: string) => void; }

export default function ContactForm({ initialService, onServiceChange }: ContactFormProps) {
  const [form, setForm] = React.useState<FormState>({ name: '', email: '', subject: 'corporate', message: '' });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [copiedEmail, setCopiedEmail] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

  // Downward sync: updates track value if card above is pressed
  React.useEffect(() => {
    if (initialService) {
      setForm((prev) => ({ 
        ...prev, 
        subject: initialService,
        message: prev.message === "" || prev.message.includes("looking to configure")
          ? `We are looking to configure a customized ${initialService.replace('-', ' ')} training program tier for our team layout.`
          : prev.message
      }));
    }
  }, [initialService]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors((prev) => ({ ...prev, [name]: undefined }));

    // Upward sync: updates card layout above if select dropdown menu changes down here
    if (name === 'subject') {
      onServiceChange(value);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full Name is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email)) newErrors.email = 'Valid corporate email required';
    if (form.subject === 'corporate' && !form.companyName?.trim()) newErrors.companyName = 'Company name is required';
    if (form.subject === 'executive' && !form.linkedinUrl?.trim()) newErrors.linkedinUrl = 'LinkedIn profile link is required';
    if (!form.message.trim()) newErrors.message = "Please describe your goals";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setForm({ name: '', email: '', subject: 'corporate', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally { setIsSubmitting(false); }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('garimajk1900@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const customMessage = `Hello Garima, I would like to inquire about a customized ${initialService.replace('-', ' ')} track layout program.`;
  const whatsappUrl = `https://wa.me/918080121277?text=${encodeURIComponent(customMessage)}`;

  return (
    <section id="contact" className="scroll-mt-20 py-20 bg-surface-container-low px-4 md:px-16 transition-all duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          <div className="bg-surface-container-lowest p-6 sm:p-10 rounded-2xl shadow-xl border border-outline-variant/20 relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary font-display mb-6">
              Inquire for <span className="text-secondary capitalize">{form.subject.replace('-', ' ')}</span>
            </h2>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm flex items-start gap-3">
                <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                <div><p className="font-bold">Transmission Complete</p></div>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-5">
              
              {/* TWO-WAY BOUND SUBJECT DROPDOWN */}
              <div className="space-y-2 relative">
                <label className="text-[10px] font-bold text-primary uppercase tracking-wider">Select Training Track Program</label>
                <div className="relative">
                  <select 
                    name="subject" 
                    value={form.subject} 
                    onChange={handleInputChange} 
                    className="w-full bg-surface-container-low border border-transparent text-sm rounded-lg p-4 outline-none appearance-none pr-10 text-primary font-medium focus:ring-1 ring-secondary cursor-pointer"
                  >
                    <option value="corporate">Corporate Training</option>
                    <option value="institutional">Institutional</option>
                    <option value="executive">Executive 1-on-1</option>
                    <option value="digital-presence">Digital Presence & Virtual Leadership</option>
                    <option value="crisis-comm">Strategic Crisis Communication</option>
                    <option value="eq-training">Emotional Intelligence (EQ)</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-wider">Full Name</label>
                  <input name="name" value={form.name} onChange={handleInputChange} className={`w-full bg-surface-container-low border text-sm rounded-lg p-4 outline-none ${errors.name ? 'border-rose-400' : 'border-transparent focus:ring-1 ring-secondary'}`} placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-wider">Work Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleInputChange} className={`w-full bg-surface-container-low border text-sm rounded-lg p-4 outline-none ${errors.email ? 'border-rose-400' : 'border-transparent focus:ring-1 ring-secondary'}`} placeholder="jane@company.com" />
                </div>
              </div>

              {/* DYNAMIC FORM REGIONS */}
              {form.subject === 'corporate' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in duration-200">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1"><Building size={12}/> Company Name</label>
                    <input name="companyName" value={form.companyName || ''} onChange={handleInputChange} className={`w-full bg-surface-container-low border text-sm rounded-lg p-4 outline-none ${errors.companyName ? 'border-rose-400' : 'border-transparent'}`} placeholder="Global Tech Inc." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-primary uppercase tracking-wider">Team Size</label>
                    <input name="teamSize" type="number" value={form.teamSize || ''} onChange={handleInputChange} className="w-full bg-surface-container-low border border-transparent text-sm rounded-lg p-4 outline-none" placeholder="25" />
                  </div>
                </div>
              )}

              {form.subject === 'executive' && (
                <div className="space-y-2 animate-in fade-in duration-200">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1"><UserCircle size={12}/> LinkedIn Profile URL</label>
                  <input name="linkedinUrl" value={form.linkedinUrl || ''} onChange={handleInputChange} className={`w-full bg-surface-container-low border text-sm rounded-lg p-4 outline-none ${errors.linkedinUrl ? 'border-rose-400' : 'border-transparent'}`} placeholder="linkedin.com/in/username" />
                </div>
              )}

              {form.subject === 'institutional' && (
                <div className="space-y-2 animate-in fade-in duration-200">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1"><School size={12}/> Institution Name</label>
                  <input name="institutionName" value={form.institutionName || ''} onChange={handleInputChange} className="w-full bg-surface-container-low border border-transparent text-sm rounded-lg p-4 outline-none" placeholder="Academy Name" />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-primary uppercase tracking-wider">Inquiry Requirements</label>
                <textarea name="message" value={form.message} onChange={handleInputChange} rows={3} className={`w-full bg-surface-container-low border text-sm rounded-lg p-4 outline-none ${errors.message ? 'border-rose-400' : 'border-transparent focus:ring-1 ring-secondary'}`} />
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
                {isSubmitting ? 'Transmitting...' : 'Confirm Inquiry'}
              </button>
            </form>
          </div>

          {/* Right Links Channels Panel */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <span className="text-[10px] font-bold text-secondary uppercase tracking-widest block mb-1">Direct Channels</span>
              <h3 className="text-xl sm:text-2xl font-bold text-primary font-display">Direct Touchpoints</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mt-2">Integrating your corporate leadership calendar natively with our directors.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-5 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 group">
                <div className="w-12 h-12 bg-secondary-container/20 rounded-xl flex items-center justify-center text-secondary shrink-0"><Mail size={22} /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-outline uppercase font-bold tracking-widest">Email Me</p>
                  <p className="font-semibold text-primary text-sm truncate">garimajk1900@gmail.com</p>
                </div>
                <button type="button" onClick={copyEmailToClipboard} className="p-2 hover:bg-surface-container-high rounded-lg cursor-pointer">{copiedEmail ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}</button>
              </div>

              <a href="https://linkedin.com/in/garima-s-spn" target="_blank" rel="noreferrer noopener" className="flex items-center gap-4 p-5 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 group transition-all hover:shadow-md">
                <div className="w-12 h-12 bg-secondary-container/20 rounded-xl flex items-center justify-center text-secondary shrink-0"><Share2 size={22} /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-outline uppercase font-bold tracking-widest">LinkedIn Network</p>
                  <p className="font-semibold text-primary text-sm">Garima Srivastava</p>
                </div>
                <span className="text-xs font-bold text-secondary group-hover:translate-x-1 transition-transform">Visit →</span>
              </a>
            </div>

            <div className="pt-2">
              <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-[#25D366] text-white rounded-xl font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                <MessageSquare size={20} className="fill-white text-transparent shrink-0" />
                <span>Connect on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}