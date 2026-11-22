import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import type { WPPost } from '../types/wp';
import { ResilientImage } from './ResilientImage';

interface InsightsSectionProps {
  posts: WPPost[];
  asPageHeading?: boolean;
}

export function InsightsSection({ posts, asPageHeading = false }: InsightsSectionProps) {
  const [activePost, setActivePost] = useState<WPPost | null>(null);
  const HeadingTag = asPageHeading ? 'h1' : 'h2';

  return (
    <section
      id="insights-section"
      aria-labelledby="insights-heading"
      className="border-t border-slate-200 bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-medium tracking-wider text-sky-700 uppercase">
            04. Technical Insights
          </p>
          <HeadingTag
            id="insights-heading"
            className="font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl"
          >
            Process Engineering Notes &amp; Exhibition Updates
          </HeadingTag>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            Indexed WordPress editorial posts with clean canonical slugs and Article
            Schema.org structured data.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white sm:flex-row"
            >
              <button
                type="button"
                onClick={() => setActivePost(post)}
                className="aspect-[4/3] w-full shrink-0 overflow-hidden bg-slate-100 sm:aspect-auto sm:w-48 cursor-pointer"
              >
                <ResilientImage
                  src={post.featured_image}
                  alt={post.featured_image_alt}
                  className="h-full w-full object-cover"
                />
              </button>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  {/* Zero-pill unboxed metadata */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-medium text-sky-700">{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={post.date} className="font-mono tabular-nums">
                      {post.date}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{post.read_time}</span>
                  </div>

                  <h3 className="mt-2 font-display text-base font-semibold leading-snug text-slate-950">
                    <button
                      type="button"
                      onClick={() => setActivePost(post)}
                      className="text-left hover:text-sky-700 transition-colors cursor-pointer"
                    >
                      {post.title.rendered}
                    </button>
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                    {post.excerpt.rendered}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActivePost(post)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-950 hover:text-sky-700 transition-colors cursor-pointer"
                  >
                    Read Technical Note
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {activePost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
        >
          <div className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-medium text-sky-700">{activePost.category}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={activePost.date} className="font-mono tabular-nums">
                  {activePost.date}
                </time>
              </div>
              <button
                type="button"
                onClick={() => setActivePost(null)}
                aria-label="Close article"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
              <ResilientImage
                src={activePost.featured_image}
                alt={activePost.featured_image_alt}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-4 p-6">
              <h3
                id="article-modal-title"
                className="font-display text-xl font-bold leading-snug text-slate-950 sm:text-2xl"
              >
                {activePost.title.rendered}
              </h3>

              <p className="text-sm font-medium leading-relaxed text-slate-700">
                {activePost.excerpt.rendered}
              </p>

              <p className="text-sm leading-relaxed text-slate-600">
                {activePost.content.rendered}
              </p>

              <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-xs">
                <div className="font-medium text-slate-700">WordPress Canonical SEO</div>
                <div className="mt-1 font-mono text-sky-700 break-all">
                  {activePost.yoast_head_json.canonical}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
