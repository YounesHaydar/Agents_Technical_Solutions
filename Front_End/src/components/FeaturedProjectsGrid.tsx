"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

type Project = {
  _id?: string;
  title?: string;
  description?: string;
  images?: Array<{ asset?: { url?: string } } | string> | string[];
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 16 } },
};

export default function FeaturedProjectsGrid({ projects, fullWidth = false }: { projects: Project[]; fullWidth?: boolean }) {
  const router = useRouter();

  async function handleDelete(id?: string) {
    if (!id) return;
    if (!confirm('Delete this project? This action cannot be undone.')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      router.refresh();
    } catch (err) {
      console.error(err);
      alert('Failed to delete project');
    }
  }
  return (
    <div className={`grid gap-6 ${fullWidth ? 'grid-cols-1' : 'sm:grid-cols-2 mt-10'}`}>
      {projects.map((p, idx) => (
        <motion.div 
          key={p._id ?? idx} 
          variants={item} 
          initial="hidden" 
          whileInView="visible"
          className="group overflow-hidden rounded-3xl bg-white/80 dark:bg-slate-900/60 panel-border shadow-lg"
        >
          <Link href={`/projects/${p._id ?? ''}`} className="block">
            <div className="relative h-64 w-full bg-zinc-200 dark:bg-zinc-950/60 overflow-hidden">
              {(() => {
                const first = p.images?.[0];
                const url = !first ? undefined : typeof first === 'string' ? first : first.asset?.url;
                return url ? (
                  <Image
                    src={url}
                    alt={p.title}
                    width={1280}
                    height={720}
                    className="h-full w-full object-cover blur-up transition-transform duration-500 group-hover:scale-105"
                    onLoad={(e) => (e.currentTarget.classList.remove('blur-up'))}
                  />
                ) : null;
              })()}
              {/* Initial gradient and title overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity duration-300" />
              <div className="absolute inset-x-0 bottom-0 p-6 pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-2xl font-semibold text-white">{p.title}</h3>
              </div>
              
              {/* Description overlay on hover */}
              <motion.div
                initial="hidden"
                whileHover="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1,
                    transition: { 
                      staggerChildren: 0.1,
                      type: 'spring', 
                      stiffness: 120, 
                      damping: 16 
                    }
                  }
                }}
                className="absolute inset-0 bg-black/85 p-6 flex flex-col justify-end"
              >
                <motion.p
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                  className="text-sm text-white/95 leading-relaxed mb-4 dark:text-slate-100"
                >
                  {p.description}
                </motion.p>
                <div className="flex gap-4">
                  <motion.button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); e.preventDefault(); router.push(`/projects/${p._id ?? ''}`); }}
                    variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors w-fit bg-transparent"
                  >
                    Read More →
                  </motion.button>

                  <motion.button
                    onClick={async (e: React.MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); e.preventDefault(); await handleDelete(p._id); }}
                    variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                    className="text-red-400 hover:text-red-300 font-semibold transition-colors w-fit bg-transparent"
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
