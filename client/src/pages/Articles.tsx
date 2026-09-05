import { useState } from 'react';
import { ArrowLeft, BookOpen, Clock, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { GlassmorphicCard } from '@/components/GlassmorphicCard';
import { ARTICLES, Article } from '@/data/articles';

export default function Articles() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(ARTICLES.map(a => a.category)))];

  const filteredArticles = selectedCategory === 'All'
    ? ARTICLES
    : ARTICLES.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <div className="flex items-center justify-between mb-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-slate-200/90 text-xs font-semibold text-slate-700 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Engineering Publications</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <p className="text-xs sm:text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-2">
            Technical Insights &amp; Case Studies
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Engineering <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Articles &amp; Architecture</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            In-depth guides, distributed systems design, mobile optimization, and AI agent architectures based on real-world production engineering experience.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                  : 'bg-white/90 text-slate-700 border border-slate-200/80 hover:bg-slate-100/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {filteredArticles.map((article: Article) => (
            <a
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group block"
            >
              <GlassmorphicCard
                glowColor="indigo"
                className="h-full flex flex-col p-6 sm:p-7 hover:border-indigo-300 transition-colors"
              >
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <span className="px-2.5 py-0.5 rounded-full text-2xs sm:text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-3 text-2xs sm:text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {article.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {article.publishedAt}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2 leading-snug">
                  {article.title}
                </h2>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-5 flex-1">
                  {article.summary}
                </p>

                {/* Tags & Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-2xs font-medium rounded-md bg-slate-100 text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:translate-x-0.5 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </GlassmorphicCard>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
