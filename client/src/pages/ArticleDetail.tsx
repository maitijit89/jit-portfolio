import { useParams } from 'wouter';
import { ArrowLeft, Clock, Calendar, Tag, Share2, Check, User } from 'lucide-react';
import { useState } from 'react';
import { GlassmorphicCard } from '@/components/GlassmorphicCard';
import { ARTICLES } from '@/data/articles';
import NotFound from '@/pages/NotFound';

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);

  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return <NotFound />;
  }

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <a
              href="/articles"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All Articles
            </a>
            <span className="text-slate-300">/</span>
            <span className="text-xs sm:text-sm text-slate-500 truncate max-w-50 sm:max-w-xs">
              {article.category}
            </span>
          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 border border-slate-200/90 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:border-indigo-300 shadow-2xs transition-all cursor-pointer"
            aria-label="Share article"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        {/* Article Container */}
        <GlassmorphicCard hover={false} glowColor="indigo" className="p-6 sm:p-10 md:p-14 mb-10">
          {/* Category & Metadata */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-600 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {article.readTime}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-600 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {article.publishedAt}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
            {article.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 font-normal">
            {article.subtitle}
          </p>

          {/* Author Byline */}
          <div className="flex items-center gap-3.5 py-4 border-y border-slate-100 mb-8">
            <div className="w-11 h-11 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              {article.author.avatar}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{article.author.name}</p>
              <p className="text-xs text-slate-500">{article.author.role}</p>
            </div>
          </div>

          {/* Article Body */}
          <article className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed space-y-6 text-slate-700">
            {article.content.map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2
                    key={index}
                    className="text-xl sm:text-2xl font-bold text-slate-900 pt-4 pb-1 border-b border-slate-100"
                  >
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <div key={index} className="flex items-start gap-2 pl-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span className="text-slate-700">{paragraph.replace('- ', '')}</span>
                  </div>
                );
              }
              if (/^\d+\./.test(paragraph)) {
                return (
                  <div key={index} className="pl-2 font-medium text-slate-800">
                    {paragraph}
                  </div>
                );
              }
              return (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </article>

          {/* Tags */}
          <div className="pt-8 mt-10 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Topics &amp; Technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium bg-slate-100/80 text-slate-700 border border-slate-200/60"
                >
                  <Tag className="w-3 h-3 text-slate-400" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </GlassmorphicCard>

        {/* Next Articles / Navigation Footer */}
        <div className="flex items-center justify-between pt-4">
          <a
            href="/articles"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-xs sm:text-sm font-semibold text-slate-700 hover:text-indigo-600 shadow-2xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Articles
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-semibold hover:bg-indigo-700 shadow-sm shadow-indigo-500/25 transition-colors"
          >
            <span>Visit Portfolio</span>
          </a>
        </div>
      </div>
    </div>
  );
}
