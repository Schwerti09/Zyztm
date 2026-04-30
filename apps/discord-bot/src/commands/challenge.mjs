/**
 * /challenge — Weekly Challenge System
 *
 * Subcommands:
 *   /challenge current  — Aktuelle Challenge anzeigen
 *   /challenge submit   — Score einreichen
 *   /challenge leaderboard — Top 10 anzeigen
 */

import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STORE_PATH = path.join(__dirname, '..', '..', 'data', 'challenges.json');

function ensureDir() {
  const dir = path.dirname(STORE_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function load() {
  ensureDir();
  if (!fs.existsSync(STORE_PATH)) {
    return {
      current: {
        title: 'Kill-Challenge',
        description: 'Sammle so viele Eliminations wie möglich in einer Woche!',
        metric: 'kills',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      submissions: {},
    };
  }
  try {
    return JSON.parse(fs.readFileSync(STORE_PATH, 'utf-8'));
  } catch {
    return { current: null, submissions: {} };
  }
}

function save(data) {
  ensureDir();
  fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2));
}

export const data = new SlashCommandBuilder()
  .setName('challenge')
  .setDescription('Weekly Fortnite Challenge')
  .addSubcommand((sub) =>
    sub.setName('current').setDescription('Zeige die aktuelle Weekly Challenge'),
  )
  .addSubcommand((sub) =>
    sub
      .setName('submit')
      .setDescription('Reiche deinen Score ein')
      .addIntegerOption((opt) =>
        opt.setName('score').setDescription('Dein Score (z.B. Anzahl Kills)').setRequired(true),
      )
      .addStringOption((opt) =>
        opt.setName('beweis').setDescription('Screenshot-Link als Beweis (optional)').setRequired(false),
      ),
  )
  .addSubcommand((sub) =>
    sub.setName('leaderboard').setDescription('Zeige das aktuelle Leaderboard'),
  );

export async function execute(interaction) {
  const sub = interaction.options.getSubcommand();
  const store = load();

  switch (sub) {
    case 'current': {
      if (!store.current) {
        await interaction.reply('ℹ️ Gerade läuft keine Challenge. Schau nächste Woche vorbei!');
        return;
      }

      const end = new Date(store.current.endDate);
      const remaining = Math.max(0, Math.ceil((end.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
      const participants = Object.keys(store.submissions).length;

      const embed = new EmbedBuilder()
        .setTitle(`🏆 Weekly Challenge: ${store.current.title}`)
        .setColor(0xf5c518)
        .setDescription(store.current.description)
        .addFields(
          { name: '⏰ Verbleibend', value: `${remaining} Tage`, inline: true },
          { name: '👥 Teilnehmer', value: `${participants}`, inline: true },
          { name: '📊 Metrik', value: store.current.metric, inline: true },
        )
        .setFooter({ text: 'Nutze /challenge submit um deinen Score einzureichen' });

      await interaction.reply({ embeds: [embed] });
      break;
    }

    case 'submit': {
      if (!store.current) {
        await interaction.reply({ content: 'ℹ️ Gerade läuft keine Challenge.', ephemeral: true });
        return;
      }

      const score = interaction.options.getInteger('score');
      const proof = interaction.options.getString('beweis') || null;
      const userId = interaction.user.id;
      const username = interaction.user.username;

      const existing = store.submissions[userId];
      store.submissions[userId] = {
        username,
        score: Math.max(score, existing?.score || 0),
        proof: proof || existing?.proof || null,
        updatedAt: new Date().toISOString(),
      };
      save(store);

      const rank = getRank(store.submissions, userId);

      await interaction.reply({
        content: `✅ Score eingereicht: **${score}** ${store.current.metric}\n📊 Dein aktueller Rang: **#${rank}**`,
        ephemeral: true,
      });
      break;
    }

    case 'leaderboard': {
      const entries = Object.entries(store.submissions)
        .map(([id, data]) => ({ id, ...data }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

      if (entries.length === 0) {
        await interaction.reply('📋 Noch keine Einreichungen. Sei der Erste mit `/challenge submit`!');
        return;
      }

      const medals = ['🥇', '🥈', '🥉'];
      const lines = entries.map(
        (e, i) =>
          `${medals[i] || `**${i + 1}.**`} ${e.username} — **${e.score}** ${store.current?.metric || 'Punkte'}`,
      );

      const embed = new EmbedBuilder()
        .setTitle(`🏆 Challenge Leaderboard: ${store.current?.title || 'Weekly Challenge'}`)
        .setColor(0xf5c518)
        .setDescription(lines.join('\n'))
        .setFooter({ text: `${Object.keys(store.submissions).length} Teilnehmer insgesamt` })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
      break;
    }
  }
}

function getRank(submissions, userId) {
  const sorted = Object.entries(submissions)
    .map(([id, d]) => ({ id, score: d.score }))
    .sort((a, b) => b.score - a.score);
  return sorted.findIndex((e) => e.id === userId) + 1;
}
