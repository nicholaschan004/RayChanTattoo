import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Upload, X, Check } from 'lucide-react';
import { toast } from 'sonner';

const placements = ['Full Sleeve', 'Half Sleeve', 'Back Piece', 'Chest', 'Ribs', 'Forearm', 'Upper Arm', 'Thigh', 'Calf', 'Other'];
const sizes = ['Small (2-4 inches)', 'Medium (5-8 inches)', 'Large (9-12 inches)', 'Extra Large (Full panel/sleeve)'];

export default function BookingSection() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    tattoo_idea: '',
    placement: '',
    size: '',
    reference_images: [],
    preferred_date: '',
  });

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploadingFile(true);
    const urls = files.map((file) => URL.createObjectURL(file));
    update('reference_images', [...form.reference_images, ...urls]);
    setUploadingFile(false);
  };

  const removeImage = (idx) => {
    update('reference_images', form.reference_images.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.tattoo_idea || !form.placement || !form.size) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSubmitting(true);
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitting(false);
    setSubmitted(true);
  };

  const stepTitles = ['Your Details', 'Your Vision', 'Schedule'];

  if (submitted) {
    return (
      <section id="booking" className="relative py-32 bg-charcoal">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center mx-auto">
              <Check className="text-gold" size={28} strokeWidth={1.5} />
            </div>
            <h2 className="font-syne text-3xl md:text-4xl font-bold text-silk uppercase tracking-tight">
              Request Received
            </h2>
            <p className="font-inter text-silk/40 text-sm tracking-wider leading-relaxed max-w-md mx-auto">
              All bookings are reviewed and confirmed manually. You will receive a response within 48 hours.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="relative py-32 bg-charcoal overflow-hidden">
      {/* Decorative kanji */}
      <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 opacity-[0.03]">
        <span className="font-serif text-[200px] text-silk" style={{ writingMode: 'vertical-rl' }}>予約</span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-5 gap-16 lg:gap-20">
          {/* Left sticky panel */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:sticky lg:top-32"
            >
              <span className="font-serif text-gold/40 text-sm tracking-wider">予約</span>
              <h2 className="font-syne text-4xl md:text-5xl font-bold tracking-tight text-silk mt-2 uppercase">
                Book Your<br />Session
              </h2>
              <div className="w-12 h-[0.5px] bg-gold/50 mt-6 mb-8" />
              <p className="font-inter text-silk/40 text-sm tracking-wider leading-relaxed">
                Begin the ritual. Share your vision and let's create something timeless together.
              </p>

              {/* Step indicators */}
              <div className="mt-12 space-y-4">
                {stepTitles.map((title, i) => (
                  <button
                    key={i}
                    onClick={() => setStep(i)}
                    className={`flex items-center gap-4 transition-all duration-500 ${step === i ? 'opacity-100' : 'opacity-30 hover:opacity-50'
                      }`}
                  >
                    <div className={`w-8 h-8 flex items-center justify-center border text-xs font-inter transition-all ${step === i ? 'border-gold text-gold' : 'border-silk/20 text-silk/40'
                      }`}>
                      {i + 1}
                    </div>
                    <span className="font-inter text-xs tracking-[0.15em] uppercase text-silk">{title}</span>
                  </button>
                ))}
              </div>

              <p className="mt-12 font-inter text-silk/20 text-[11px] tracking-wider italic">
                All bookings are reviewed and confirmed manually
              </p>
            </motion.div>
          </div>

          {/* Right form panel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="space-y-10">
              {step === 0 && (
                <div className="space-y-8">
                  <InputField label="Full Name" value={form.name} onChange={(v) => update('name', v)} required />
                  <InputField label="Email Address" type="email" value={form.email} onChange={(v) => update('email', v)} required />
                  <InputField label="Phone Number" value={form.phone} onChange={(v) => update('phone', v)} />
                </div>
              )}

              {step === 1 && (
                <div className="space-y-8">
                  <div>
                    <label className="block font-inter text-[10px] tracking-[0.25em] uppercase text-silk/40 mb-4">
                      Tattoo Idea <span className="text-gold">*</span>
                    </label>
                    <textarea
                      value={form.tattoo_idea}
                      onChange={(e) => update('tattoo_idea', e.target.value)}
                      rows={5}
                      placeholder="Describe your vision — the story, elements, symbolism..."
                      className="w-full bg-transparent border-b border-silk/10 focus:border-gold/50 text-silk font-inter text-sm tracking-wide pb-3 placeholder:text-silk/15 outline-none resize-none transition-colors duration-500"
                    />
                  </div>

                  <div>
                    <label className="block font-inter text-[10px] tracking-[0.25em] uppercase text-silk/40 mb-4">
                      Body Placement <span className="text-gold">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {placements.map((p) => (
                        <button
                          key={p}
                          onClick={() => update('placement', p)}
                          className={`px-4 py-2 border text-xs tracking-wider font-inter transition-all duration-300 ${form.placement === p
                              ? 'border-gold bg-gold/10 text-gold'
                              : 'border-silk/10 text-silk/30 hover:border-silk/20'
                            }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-inter text-[10px] tracking-[0.25em] uppercase text-silk/40 mb-4">
                      Approximate Size <span className="text-gold">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => update('size', s)}
                          className={`px-4 py-2 border text-xs tracking-wider font-inter transition-all duration-300 ${form.size === s
                              ? 'border-gold bg-gold/10 text-gold'
                              : 'border-silk/10 text-silk/30 hover:border-silk/20'
                            }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reference images */}
                  <div>
                    <label className="block font-inter text-[10px] tracking-[0.25em] uppercase text-silk/40 mb-4">
                      Reference Images
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-36 border border-dashed border-silk/10 hover:border-gold/30 cursor-pointer transition-all duration-500 group">
                      <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
                      {uploadingFile ? (
                        <Loader2 size={20} className="text-gold animate-spin" />
                      ) : (
                        <>
                          <Upload size={20} className="text-silk/20 group-hover:text-gold/50 transition-colors mb-2" strokeWidth={1.5} />
                          <span className="font-inter text-[10px] tracking-wider text-silk/20 group-hover:text-silk/40 transition-colors">
                            Drop references here
                          </span>
                        </>
                      )}
                    </label>
                    {form.reference_images.length > 0 && (
                      <div className="flex gap-3 mt-4 flex-wrap">
                        {form.reference_images.map((url, i) => (
                          <div key={i} className="relative w-16 h-16 group">
                            <img src={url} alt="Reference" className="w-full h-full object-cover" />
                            <button
                              onClick={() => removeImage(i)}
                              className="absolute -top-1 -right-1 w-5 h-5 bg-obsidian border border-silk/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={10} className="text-silk/60" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <InputField
                    label="Preferred Date"
                    type="date"
                    value={form.preferred_date}
                    onChange={(v) => update('preferred_date', v)}
                  />
                  <div className="pt-4 border-t border-silk/5">
                    <h4 className="font-inter text-[10px] tracking-[0.25em] uppercase text-silk/40 mb-4">Summary</h4>
                    <div className="space-y-3 font-inter text-sm text-silk/50">
                      <SummaryRow label="Name" value={form.name} />
                      <SummaryRow label="Email" value={form.email} />
                      <SummaryRow label="Idea" value={form.tattoo_idea} />
                      <SummaryRow label="Placement" value={form.placement} />
                      <SummaryRow label="Size" value={form.size} />
                      {form.preferred_date && <SummaryRow label="Date" value={form.preferred_date} />}
                      {form.reference_images.length > 0 && <SummaryRow label="References" value={`${form.reference_images.length} image(s)`} />}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center pt-8">
                {step > 0 ? (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="font-inter text-xs tracking-[0.15em] uppercase text-silk/30 hover:text-silk/60 transition-colors"
                  >
                    ← Back
                  </button>
                ) : <div />}

                {step < 2 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="px-8 py-3 border border-gold/40 text-gold font-inter text-xs tracking-[0.15em] uppercase hover:bg-gold hover:text-obsidian transition-all duration-500"
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="px-10 py-3.5 bg-gold text-obsidian font-inter text-xs tracking-[0.15em] uppercase font-medium hover:bg-gold-light transition-all duration-500 disabled:opacity-50 flex items-center gap-2"
                  >
                    {submitting && <Loader2 size={14} className="animate-spin" />}
                    Request Appointment
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[0.5px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}

function InputField({ label, type = 'text', value, onChange, required }) {
  return (
    <div>
      <label className="block font-inter text-[10px] tracking-[0.25em] uppercase text-silk/40 mb-4">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-silk/10 focus:border-gold/50 text-silk font-inter text-sm tracking-wide pb-3 placeholder:text-silk/15 outline-none transition-colors duration-500"
      />
    </div>
  );
}

function SummaryRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4">
      <span className="text-silk/30 shrink-0">{label}</span>
      <span className="text-silk/60 text-right truncate">{value}</span>
    </div>
  );
}