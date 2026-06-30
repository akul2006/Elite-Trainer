import * as React from 'react';
import { Mail, Share2, MessageSquare, Copy, Check, CheckCircle2, Building, UserCircle, School, ChevronDown, FileText, X } from 'lucide-react';

// All available skills extracted from the Services section
const AVAILABLE_SKILLS = [
  'Business Etiquette', 'Communication Skills', 'Email Writing', 'Emotional Intelligence',
  'Group Discussion Skills', 'Interpersonal and Teamwork', 'Interview Skills', 'Johari Window',
  'Ownership', 'Personality Development', 'Presentation Skills', 'Problem Solving',
  'Public Speaking', 'Resume Writing', 'Service Orientation', 'Stress Management',
  'SWOT Analysis', 'Telephone Etiquette', 'Time Management', 'Training and Mentoring'
].sort(); // Sorted alphabetically for easier reading

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  companyName?: string;
  teamSize?: string;
  linkedinUrl?: string;
  institutionName?: string;
  customSkills: string[]; // Added array for custom skill selection
}

interface FormErrors { 
  name?: string; 
  email?: string; 
  message?: string; 
  companyName?: string; 
  linkedinUrl?: string; 
  customSkills?: string; // Validation for custom skills
}

interface ContactFormProps { 
  initialService: string; 
  onServiceChange: (serviceId: string) => void; 
}

export default function ContactForm({ initialService, onServiceChange }: ContactFormProps) {
  const [form, setForm] = React.useState<FormState>({ name: '', email: '', subject: 'corporate', message: '', customSkills: [] });
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
    if (form.subject === 'custom' && form.customSkills.length === 0) newErrors.customSkills = 'Please select at least one skill';
    if (!form.message.trim()) newErrors.message = "Please describe your goals";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // 1. Define the base URL using Vite's environment variables
      const API_URL = (import.meta as any).env?.VITE_API_URL || '';
      
      // 2. Add the base URL to your fetch path
      const response = await fetch(`${API_URL}/api/inquire`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');

        setForm({
          name: '',
          email: '',
          subject: form.subject,
          message: '',
          companyName: '',
          teamSize: '',
          linkedinUrl: '',
          institutionName: '',
          customSkills: [] // Reset custom skills array
        });

        setTimeout(() => {
          setSubmitStatus('idle');
        }, 6000);

      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Network connectivity issue:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('garimasri@gmail.com');
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
              Inquire about {/* <span className="text-secondary capitalize">{form.subject.replace('-', ' ')}</span> */}
            </h2>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-200 text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="font-bold">Submitted Successfully</p>
                  <p className="text-xs opacity-90">Your inquiry has been sent successfully.</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-800 dark:text-rose-200 text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                <X className="text-rose-500 shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="font-bold">Submission Failed</p>
                  <p className="text-xs opacity-90">There was a problem connecting to the server. Please try again or email us directly.</p>
                </div>
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
                    <option value="corporate">Corporate & Professional Development</option>
                    <option value="institutional">Institutional Readiness</option>
                    <option value="executive">Executive & Leadership</option>
                    <option value="communication">Communication & Presentation</option>
                    <option value="interpersonal">Interpersonal & Team Dynamics</option>
                    <option value="eq-training">Emotional Intelligence (EQ)</option>
                    <option value="custom">Custom Skills Track</option>
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
                    <label className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1"><Building size={12} /> Company Name</label>
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
                  <label className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1"><UserCircle size={12} /> LinkedIn Profile URL</label>
                  <input name="linkedinUrl" value={form.linkedinUrl || ''} onChange={handleInputChange} className={`w-full bg-surface-container-low border text-sm rounded-lg p-4 outline-none ${errors.linkedinUrl ? 'border-rose-400' : 'border-transparent'}`} placeholder="linkedin.com/in/username" />
                </div>
              )}

              {form.subject === 'institutional' && (
                <div className="space-y-2 animate-in fade-in duration-200">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1"><School size={12} /> Institution Name</label>
                  <input name="institutionName" value={form.institutionName || ''} onChange={handleInputChange} className="w-full bg-surface-container-low border border-transparent text-sm rounded-lg p-4 outline-none" placeholder="Academy Name" />
                </div>
              )}

              {/* CUSTOM SKILLS GRID SELECTION */}
              {form.subject === 'custom' && (
                <div className="space-y-2 animate-in fade-in duration-200">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-wider">Select Skill Sets</label>
                  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-52 overflow-y-auto p-4 bg-surface-container-low border rounded-lg ${errors.customSkills ? 'border-rose-400' : 'border-transparent'}`}>
                    {AVAILABLE_SKILLS.map((skill) => (
                      <label key={skill} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-secondary accent-primary"
                          checked={form.customSkills.includes(skill)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setForm(prev => ({ ...prev, customSkills: [...prev.customSkills, skill] }));
                            } else {
                              setForm(prev => ({ ...prev, customSkills: prev.customSkills.filter(s => s !== skill) }));
                            }
                            if (errors.customSkills) setErrors(prev => ({ ...prev, customSkills: undefined }));
                          }}
                        />
                        <span className="text-primary text-sm">{skill}</span>
                      </label>
                    ))}
                  </div>
                  {errors.customSkills && <p className="text-xs text-rose-500 mt-1">{errors.customSkills}</p>}
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
              <span className="text-[10px] font-bold text-secondary uppercase tracking-widest block mb-1">Direct Contacts</span>
              <h3 className="text-xl sm:text-2xl font-bold text-primary font-display">Reach Out to Me</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-5 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 group">
                <div className="w-12 h-12 bg-secondary-container/20 rounded-xl flex items-center justify-center text-secondary shrink-0"><Mail size={22} /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-outline uppercase font-bold tracking-widest">Email Me</p>
                  <p className="font-semibold text-primary text-sm truncate">garimasri@gmail.com</p>
                </div>
                <button type="button" onClick={copyEmailToClipboard} className="p-2 hover:bg-surface-container-high rounded-lg cursor-pointer">{copiedEmail ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}</button>
              </div>

              <div className="space-y-3">
                <a href="https://linkedin.com/in/garima-s-spn" target="_blank" rel="noreferrer noopener" className="flex items-center gap-4 p-5 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 group transition-all hover:shadow-md">
                  <div className="w-12 h-12 bg-secondary-container/20 rounded-xl flex items-center justify-center text-secondary shrink-0"><Share2 size={22} /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-outline uppercase font-bold tracking-widest">LinkedIn Network</p>
                    <p className="font-semibold text-primary text-sm">Garima Srivastava</p>
                  </div>
                  <span className="text-xs font-bold text-secondary group-hover:translate-x-1 transition-transform">Visit →</span>
                </a>

                <a href="./public/resume.pdf" target="_blank" rel="noreferrer noopener" className="flex items-center gap-4 p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 group transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-secondary-container/20 rounded-xl flex items-center justify-center text-secondary shrink-0"><FileText size={18} /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-outline uppercase font-bold tracking-widest">View My Resume</p>
                    {/* <p className="font-semibold text-primary text-sm"></p> */}
                  </div>
                  <span className="text-xs font-bold text-secondary group-hover:translate-x-1 transition-transform">View →</span>
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
      </div>
    </section>
  );
}