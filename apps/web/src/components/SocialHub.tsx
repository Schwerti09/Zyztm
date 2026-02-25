import { motion } from 'framer-motion';
import SocialCard, { type Channel } from './SocialCard';
import PowerButton from './PowerButton';
import profile from '../creatorProfile.json';

const { socials } = profile;

/** Maps creatorProfile socials to SocialCard Channel format. */
const socialChannels: Channel[] = [
  {
    id: 'kick',
    name: 'KICK',
    icon: socials.kick.icon,
    url: socials.kick.url,
    color: '#53fc18',
    bgColor: 'linear-gradient(135deg, rgba(15,40,15,0.9) 0%, rgba(13,17,23,0.95) 100%)',
    stats: `${(socials.kick.followers / 1000).toFixed(0)}K Follower`,
    live: true,
    preview: { type: 'video', src: '/vids/kick-preview.mp4' },
  },
  {
    id: 'youtube',
    name: 'YOUTUBE',
    icon: socials.youtube.icon,
    url: socials.youtube.url,
    color: '#ff0000',
    bgColor: 'linear-gradient(135deg, rgba(40,5,5,0.9) 0%, rgba(13,17,23,0.95) 100%)',
    stats: `${(socials.youtube.followers / 1000000).toFixed(2).replace('.', ',')}M Abonnenten`,
    live: false,
    preview: { type: 'image', src: '/images/yt-fallback.jpg' },
  },
  {
    id: 'tiktok',
    name: 'TIKTOK',
    icon: socials.tiktok.icon,
    url: socials.tiktok.url,
    color: '#ff0055',
    bgColor: 'linear-gradient(135deg, rgba(30,10,20,0.9) 0%, rgba(13,17,23,0.95) 100%)',
    stats: `${(socials.tiktok.followers / 1000).toFixed(0)}K Follower`,
    live: false,
    preview: null,
  },
  {
    id: 'discord',
    name: 'DISCORD',
    icon: socials.discord.icon,
    url: socials.discord.url,
    color: '#5865f2',
    bgColor: 'linear-gradient(135deg, rgba(10,15,40,0.9) 0%, rgba(13,17,23,0.95) 100%)',
    stats: `${(socials.discord.followers / 1000).toFixed(0)}K Mitglieder`,
    live: false,
    preview: null,
  },
  {
    id: 'instagram',
    name: 'INSTAGRAM',
    icon: socials.instagram.icon,
    url: socials.instagram.url,
    color: '#e1306c',
    bgColor: 'linear-gradient(135deg, rgba(40,5,20,0.9) 0%, rgba(13,17,23,0.95) 100%)',
    stats: 'Folg uns!',
    live: false,
    preview: null,
  },
  {
    id: 'linktree',
    name: 'LINKTREE',
    icon: socials.linktree.icon,
    url: socials.linktree.url,
    color: '#43e55e',
    bgColor: 'linear-gradient(135deg, rgba(10,35,15,0.9) 0%, rgba(13,17,23,0.95) 100%)',
    stats: 'Alle Links',
    live: false,
    preview: null,
  },
];

export default function SocialHub() {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-4">
            THE <span className="text-neon-blue neon-text-blue">COMMAND CENTER</span>
          </h2>
          <p className="text-white/50">Live-Daten aus allen Plattformen</p>
        </motion.div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-16">
          {socialChannels.map((channel, i) => (
            <SocialCard key={channel.id} channel={channel} index={i} />
          ))}
        </div>

        {/* Power Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <PowerButton channels={socialChannels} />
        </motion.div>

        {/* Discord Widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <h3 className="font-cyber text-2xl font-bold text-white mb-6 text-center">
            <span style={{ color: '#5865f2' }}>💬</span> DISCORD COMMUNITY
          </h3>
          {socials.discord.serverId !== 'DEINE_DISCORD_SERVER_ID' ? (
            <iframe
              src={`https://discord.com/widget?id=${socials.discord.serverId}&theme=dark`}
              width="350"
              height="500"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              className="rounded-lg border border-indigo-500/30"
              title="Discord Server Widget"
            />
          ) : (
            <a
              href={socials.discord.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-card rounded-lg p-8 text-center no-underline flex flex-col items-center gap-4 max-w-sm w-full"
              style={{ borderColor: '#5865f230' }}
            >
              <div className="text-6xl">💬</div>
              <p className="font-cyber text-xl font-bold" style={{ color: '#5865f2' }}>
                JOIN DISCORD
              </p>
              <p className="text-white/50 text-sm">Werde Teil der Community!</p>
              <div
                className="text-xs font-cyber tracking-widest py-2 px-6 border rounded"
                style={{ color: '#5865f2', borderColor: '#5865f250' }}
              >
                SERVER BEITRETEN →
              </div>
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}

