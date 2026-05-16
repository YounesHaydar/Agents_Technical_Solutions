'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useLanguage } from '../../providers/LanguageProvider';

type Language = 'en' | 'ar';

interface ProjectFormData {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  client: string;
  completionDate: string;
  socialLinks: Array<{
    platform: string;
    url: string;
    labelEn: string;
    labelAr: string;
  }>;
}

const initialFormData: ProjectFormData = {
  titleEn: '',
  titleAr: '',
  descriptionEn: '',
  descriptionAr: '',
  client: '',
  completionDate: '',
  socialLinks: [{ platform: '', url: '', labelEn: '', labelAr: '' }],
};

const texts = {
  en: {
    title: 'Creator Dashboard',
    subtitle: 'A bilingual project entry surface with a stronger, more technical presentation.',
    englishContent: 'English content',
    arabicContent: 'Arabic content',
    projectTitle: 'Project title',
    projectDescription: 'Project description',
    clientName: 'Client name',
    completionDate: 'Completion date',
    socialLinks: 'Social links',
    platform: 'Platform',
    url: 'URL',
    labelEn: 'Label (English)',
    labelAr: 'Label (Arabic)',
    addLink: 'Add social link',
    removeLink: 'Remove',
    submit: 'Save draft',
    submitting: 'Saving...',
    success: 'Draft prepared successfully.',
    error: 'There was a problem preparing the draft.',
    backToHome: 'Back to home',
    panelTitle: 'Structured for future content growth',
    panelCopy:
      'Each field is separated so the content model remains predictable and easy to extend later.',
    projectDetails: 'Project details',
    previewNotes: 'Preview notes',
    socialLinkHelp: 'Add platform, URL, and localized labels for the frontend link text.',
    englishPlaceholderTitle: 'Enter project title in English',
    englishPlaceholderDescription: 'Enter project description in English',
    clientPlaceholder: 'Enter client name',
    noteOne: 'Separate content for English and Arabic.',
    noteTwo: 'Social link labels can now match the frontend.',
    noteThree: 'The design system stays readable under both themes.',
  },
  ar: {
    title: 'لوحة المنشئ',
    subtitle: 'واجهة ثنائية اللغة لإدخال المشاريع بتصميم أكثر تقنية ووضوحاً.',
    englishContent: 'المحتوى الإنجليزي',
    arabicContent: 'المحتوى العربي',
    projectTitle: 'عنوان المشروع',
    projectDescription: 'وصف المشروع',
    clientName: 'اسم العميل',
    completionDate: 'تاريخ الإنجاز',
    socialLinks: 'الروابط الاجتماعية',
    platform: 'المنصة',
    url: 'الرابط',
    labelEn: 'التسمية (بالإنجليزية)',
    labelAr: 'التسمية (بالعربية)',
    addLink: 'إضافة رابط اجتماعي',
    removeLink: 'إزالة',
    submit: 'حفظ المسودة',
    submitting: 'جاري الحفظ...',
    success: 'تم تجهيز المسودة بنجاح.',
    error: 'حدثت مشكلة أثناء تجهيز المسودة.',
    backToHome: 'العودة للرئيسية',
    panelTitle: 'مهيأة لتوسيع المحتوى لاحقاً',
    panelCopy:
      'تم فصل كل حقل لكي يظل نموذج المحتوى متوقعاً وسهل التطوير في المستقبل.',
    projectDetails: 'تفاصيل المشروع',
    previewNotes: 'ملاحظات المعاينة',
    socialLinkHelp: 'أضف المنصة والرابط والتسميات المحلية لنص الرابط في الواجهة.',
    englishPlaceholderTitle: 'أدخل عنوان المشروع بالإنجليزية',
    englishPlaceholderDescription: 'أدخل وصف المشروع بالإنجليزية',
    clientPlaceholder: 'أدخل اسم العميل',
    noteOne: 'افصل المحتوى بين الإنجليزية والعربية.',
    noteTwo: 'يمكن أن تتطابق تسميات الروابط الاجتماعية مع الواجهة.',
    noteThree: 'يبقى نظام التصميم مقروءاً تحت كلا الوضعين.',
  },
} as const;

export default function DashboardPage() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const t = texts[(language === 'ar' ? 'ar' : 'en') as Language];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Omit<ProjectFormData, 'socialLinks'>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSocialLinkChange = (
    index: number,
    field: 'platform' | 'url' | 'labelEn' | 'labelAr',
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link, i) =>
        i === index ? { ...link, [field]: value } : link,
      ),
    }));
  };

  const addSocialLink = () => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: '', url: '', labelEn: '', labelAr: '' }],
    }));
  };

  const removeSocialLink = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Project data:', formData);
      setSubmitStatus('success');
      setFormData(initialFormData);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen text-zinc-950 dark:text-zinc-100">
      <section className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 lg:px-12">
        <div className="glass-panel panel-border rounded-4xl p-6 md:p-8 reveal-up">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mono-accent text-xs uppercase tracking-widest text-muted">نظام التحرير</p>
              <h1 className="headline-serif mt-3 text-4xl font-semibold tracking-tight md:text-6xl">{t.title}</h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">{t.subtitle}</p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-slate-300/80 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-800 transition duration-300 hover:-translate-y-0.5 hover:border-sky-400/60 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-100"
            >
              {t.backToHome}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-24 md:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {submitStatus === 'success' && (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-emerald-700 dark:text-emerald-300">{t.success}</div>
            )}

            {submitStatus === 'error' && (
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-rose-700 dark:text-rose-300">{t.error}</div>
            )}

            <div className="glass-panel panel-border rounded-4xl p-6 md:p-8 reveal-up">
              <h2 className="text-2xl font-semibold tracking-tight">{t.englishContent}</h2>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">{t.projectTitle}</label>
                  <input
                    type="text"
                    value={formData.titleEn}
                    onChange={(e) => handleChange(e, 'titleEn')}
                    className="w-full rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-3 text-zinc-950 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30 dark:border-slate-700/80 dark:bg-slate-950/60 dark:text-zinc-100"
                    placeholder={t.englishPlaceholderTitle}
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">{t.projectDescription}</label>
                  <textarea
                    value={formData.descriptionEn}
                    onChange={(e) => handleChange(e, 'descriptionEn')}
                    rows={5}
                    className="w-full rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-3 text-zinc-950 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30 dark:border-slate-700/80 dark:bg-slate-950/60 dark:text-zinc-100"
                    placeholder={t.englishPlaceholderDescription}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="glass-panel panel-border rounded-4xl p-6 md:p-8 reveal-up" style={{ animationDelay: '80ms' }}>
              <h2 className="text-2xl font-semibold tracking-tight">{t.arabicContent}</h2>
              <div className="mt-6 space-y-4" dir="rtl">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">{t.projectTitle}</label>
                  <input
                    type="text"
                    value={formData.titleAr}
                    onChange={(e) => handleChange(e, 'titleAr')}
                    className="w-full rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-3 text-right text-zinc-950 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30 dark:border-slate-700/80 dark:bg-slate-950/60 dark:text-zinc-100"
                    placeholder="أدخل عنوان المشروع بالعربية"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">{t.projectDescription}</label>
                  <textarea
                    value={formData.descriptionAr}
                    onChange={(e) => handleChange(e, 'descriptionAr')}
                    rows={5}
                    className="w-full rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-3 text-right text-zinc-950 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30 dark:border-slate-700/80 dark:bg-slate-950/60 dark:text-zinc-100"
                    placeholder="أدخل وصف المشروع بالعربية"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="glass-panel panel-border rounded-4xl p-6 md:p-8 reveal-up" style={{ animationDelay: '140ms' }}>
              <h2 className="text-2xl font-semibold tracking-tight">{t.projectDetails}</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">{t.clientName}</label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => handleChange(e, 'client')}
                    className="w-full rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-3 text-zinc-950 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30 dark:border-slate-700/80 dark:bg-slate-950/60 dark:text-zinc-100"
                    placeholder={t.clientPlaceholder}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">{t.completionDate}</label>
                  <input
                    type="date"
                    value={formData.completionDate}
                    onChange={(e) => handleChange(e, 'completionDate')}
                    className="w-full rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-3 text-zinc-950 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30 dark:border-slate-700/80 dark:bg-slate-950/60 dark:text-zinc-100"
                  />
                </div>
              </div>
            </div>

            <div className="glass-panel panel-border rounded-4xl p-6 md:p-8 reveal-up" style={{ animationDelay: '180ms' }}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">{t.socialLinks}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{t.socialLinkHelp}</p>
                </div>
                <button
                  type="button"
                  onClick={addSocialLink}
                  className="rounded-full border border-slate-300/80 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-800 transition duration-300 hover:-translate-y-0.5 hover:border-sky-400/60 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-100"
                >
                  + {t.addLink}
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {formData.socialLinks.map((link, index) => (
                  <div key={index} className="grid gap-3 rounded-3xl border border-slate-200/80 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/50 xl:grid-cols-5">
                    <input
                      type="text"
                      value={link.platform}
                      onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                      placeholder={t.platform}
                      className="rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-3 text-zinc-950 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30 dark:border-slate-700/80 dark:bg-slate-950/60 dark:text-zinc-100"
                    />
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                      placeholder={t.url}
                      className="rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-3 text-zinc-950 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30 dark:border-slate-700/80 dark:bg-slate-950/60 dark:text-zinc-100"
                    />
                    <input
                      type="text"
                      value={link.labelEn}
                      onChange={(e) => handleSocialLinkChange(index, 'labelEn', e.target.value)}
                      placeholder={t.labelEn}
                      className="rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-3 text-zinc-950 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30 dark:border-slate-700/80 dark:bg-slate-950/60 dark:text-zinc-100"
                    />
                    <input
                      type="text"
                      value={link.labelAr}
                      onChange={(e) => handleSocialLinkChange(index, 'labelAr', e.target.value)}
                      placeholder={t.labelAr}
                      dir="rtl"
                      className="rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-3 text-right text-zinc-950 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30 dark:border-slate-700/80 dark:bg-slate-950/60 dark:text-zinc-100"
                    />
                    <button
                      type="button"
                      onClick={() => removeSocialLink(index)}
                      className="rounded-2xl border border-rose-300/50 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-700 transition duration-300 hover:-translate-y-0.5 hover:bg-rose-500/15 dark:text-rose-300"
                    >
                      {t.removeLink}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-slate-900/20 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              {isSubmitting ? t.submitting : t.submit}
            </button>
          </form>

          <aside className="space-y-6">
            <div className="glass-panel panel-border rounded-4xl p-6 md:p-8 reveal-up lg:sticky lg:top-28">
              <p className="mono-accent text-xs uppercase tracking-widest text-muted">{t.previewNotes}</p>
              <h2 className="headline-serif mt-3 text-3xl font-semibold tracking-tight">{t.panelTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{t.panelCopy}</p>

              <div className="mt-8 grid gap-3">
                {[
                  t.noteOne,
                  t.noteTwo,
                  t.noteThree,
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-300">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
