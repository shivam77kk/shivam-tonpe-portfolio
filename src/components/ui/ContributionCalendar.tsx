'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
  weekday?: number;
}

interface CalendarProps {
  weeks: Array<{ contributionDays: ContributionDay[] }>;
  totalContributions: number;
}

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

const levelStyles = [
  'bg-[var(--bg-elevated)]',                                          
  'bg-[var(--accent-1-20)]',                                         
  'bg-[var(--accent-1-40)]',                                         
  'bg-[var(--accent-1-65)]',                                         
  'bg-[var(--accent-1)] shadow-[0_0_6px_1px_var(--accent-1-40)]',  
] as const;

export function ContributionCalendar({ weeks, totalContributions }: CalendarProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const stats = useMemo(() => {
    const allDays = weeks.flatMap(w => w.contributionDays);
    const activeDays = allDays.filter(d => d.contributionCount > 0).length;
    const bestDay = Math.max(...allDays.map(d => d.contributionCount));

    let streak = 0;
    const sortedDays = [...allDays].reverse();
    for (const day of sortedDays) {
      if (day.contributionCount > 0) streak++;
      else break;
    }

    return { activeDays, bestDay, streak };
  }, [weeks]);

  const DAYS   = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  return (
    <section className="relative py-24">
      <div className="mb-12">
        <span className="section-label">// Neural Activity</span>
        <motion.h2
          className="text-display font-space font-bold text-[var(--text-primary)] mt-4"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          365 days of{' '}
          <span className="text-gradient">building.</span>
        </motion.h2>
        <p className="text-[var(--text-secondary)] text-subhead mt-2">
          {totalContributions.toLocaleString()} contributions in the last year
        </p>
      </div>

      <div className="relative rounded-2xl p-6 md:p-8 bg-[var(--bg-surface)]/60 backdrop-blur-xl border border-white/[0.06] shadow-[var(--shadow-float)] overflow-x-auto">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-1-30)] to-transparent" />

        <div ref={ref} className="flex gap-[3px] min-w-max">
          <div className="flex flex-col gap-[3px] mr-2">
            {DAYS.map((d, i) => (
              <div key={i} className="h-[11px] text-[10px] font-mono text-[var(--text-tertiary)] flex items-center">
                {d}
              </div>
            ))}
          </div>

          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-[3px]">
              {Array.from({ length: 7 }).map((_, dayIdx) => {
                const day = week.contributionDays.find(d => {
                  if (d.weekday !== undefined) return d.weekday === dayIdx;
                  // Fallback: parse date string (YYYY-MM-DD)
                  const dateParts = d.date.split('-');
                  if (dateParts.length === 3) {
                    // Create date object at noon to avoid timezone shift
                    return new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]), 12, 0, 0).getDay() === dayIdx;
                  }
                  return new Date(d.date).getDay() === dayIdx;
                });

                if (!day) {
                  return <div key={`empty-${weekIdx}-${dayIdx}`} className="w-[11px] h-[11px] bg-transparent pointer-events-none" />;
                }

                const level = getLevel(day.contributionCount);
                const delay = weekIdx * 0.008;

                return (
                  <motion.div
                    key={day.date}
                    className={`w-[11px] h-[11px] rounded-[3px] cursor-pointer transition-all duration-150 ${levelStyles[level]}`}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay, duration: 0.2, ease: 'easeOut' }}
                    whileHover={{ scale: 1.5, zIndex: 10 }}
                    onMouseEnter={(e) => {
                      setHoveredDay(day);
                      const rect = (e.target as HTMLElement).getBoundingClientRect();
                      setTooltipPos({ x: rect.left + rect.width/2, y: rect.top });
                    }}
                    onMouseLeave={() => setHoveredDay(null)}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-white/[0.06]">
          {[
            { icon: '⚡', value: totalContributions, label: 'Total Commits' },
            { icon: '🔥', value: stats.streak, label: 'Day Streak' },
            { icon: '📅', value: stats.activeDays, label: 'Active Days' },
            { icon: '🏆', value: stats.bestDay, label: 'Best Day' },
          ].map(({ icon, value, label }) => (
            <motion.div
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm"
              whileHover={{ scale: 1.04, borderColor: 'var(--border-mid)' }}
            >
              <span className="text-sm">{icon}</span>
              <span className="font-space font-bold text-[var(--text-primary)] tabular-nums">
                {value.toLocaleString()}
              </span>
              <span className="text-micro text-[var(--text-tertiary)] font-mono uppercase tracking-wide">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {hoveredDay && (
        <motion.div
          className="fixed z-50 pointer-events-none"
          style={{ left: tooltipPos.x, top: tooltipPos.y - 60, translateX: '-50%' }}
          initial={{ opacity: 0, y: 4, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-[var(--bg-float)]/90 backdrop-blur-xl border border-[var(--border-mid)] rounded-xl px-3 py-2 text-center shadow-[var(--shadow-float)]">
            <div className="text-heading font-bold text-gradient tabular-nums">
              {hoveredDay.contributionCount}
            </div>
            <div className="text-nano text-[var(--text-secondary)] font-mono uppercase tracking-wide">
              {new Date(hoveredDay.date).toLocaleDateString('en-IN', {
                month: 'short', day: 'numeric', year: 'numeric'
              })}
            </div>
          </div>
          <div className="w-2 h-2 bg-[var(--bg-float)] border-b border-r border-[var(--border-mid)] rotate-45 mx-auto -mt-1" />
        </motion.div>
      )}
    </section>
  );
}
