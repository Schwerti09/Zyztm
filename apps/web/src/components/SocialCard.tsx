import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export interface Channel {
  id: string;
  name: string;
  icon: string;
  url: string;
  color: string;
  bgColor: string;
  stats: string;
  live: boolean;
  preview: { type: 'video' | 'image'; src: string } | null;
}

export default function SocialCard({ channel, index }: { channel: Channel; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (channel.preview?.type === 'video' && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.debug('Video autoplay prevented:', err);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (channel.preview?.type === 'video' && videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.a
      id={`card-${channel.id}`}
      href={channel.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="cyber-card rounded-lg p-6 text-center cursor-pointer no-underline flex flex-col items-center relative overflow-hidden"
      style={{
        borderColor: isHovered ? channel.color : `${channel.color}30`,
        boxShadow: isHovered
          ? `0 0 30px ${channel.color}40, 0 0 60px ${channel.color}20`
          : undefined,
        background: channel.bgColor,
        minHeight: '220px',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* Video preview */}
      {channel.preview?.type === 'video' && channel.preview.src && (
        <video
          ref={videoRef}
          src={channel.preview.src}
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ opacity: isHovered ? 0.3 : 0, transition: 'opacity 0.3s ease', zIndex: 0 }}
        />
      )}

      {/* Image preview */}
      {channel.preview?.type === 'image' && channel.preview.src && (
        <img
          src={channel.preview.src}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ opacity: isHovered ? 0.3 : 0, transition: 'opacity 0.3s ease', zIndex: 0 }}
        />
      )}

      {/* Live badge */}
      {channel.live && (
        <div className="absolute top-3 right-3 flex items-center gap-1 z-10">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: '#53fc18', boxShadow: '0 0 6px #53fc18' }}
          />
          <span className="font-cyber text-xs" style={{ color: '#53fc18' }}>
            LIVE
          </span>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center flex-1 justify-between w-full">
        <div className="flex flex-col items-center">
          <div className="text-5xl mb-4">{channel.icon}</div>
          <h3 className="font-cyber text-xl font-bold mb-1" style={{ color: channel.color }}>
            {channel.name}
          </h3>
          <div className="text-white font-bold text-lg mb-1">{channel.stats}</div>
        </div>
        <div
          className="mt-4 text-xs font-cyber tracking-widest py-2 px-4 border rounded w-full text-center"
          style={{ color: channel.color, borderColor: `${channel.color}50` }}
        >
          FOLGEN →
        </div>
      </div>
    </motion.a>
  );
}
