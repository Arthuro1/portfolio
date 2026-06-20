"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-12">{a.title}</h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-5 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>{a.bio1}</p>
            <p>{a.bio2}</p>
            <p>{a.bio3}</p>
          </div>
          <div className="space-y-4">
            <InfoRow label={a.location} value={a.locationValue} />
            <InfoRow label={a.education} value={a.educationValue} />
            <InfoRow label={a.languages} value={a.languagesValue} />
            <InfoRow label={a.interests} value={a.interestsValue} />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="flex gap-3">
      <span className="text-sm font-semibold text-gray-400 dark:text-gray-500 w-28 shrink-0 pt-0.5">{label}</span>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-700 dark:text-blue-400 hover:underline">{value}</a>
      ) : (
        <span className="text-sm text-gray-700 dark:text-gray-300">{value}</span>
      )}
    </div>
  );
}
