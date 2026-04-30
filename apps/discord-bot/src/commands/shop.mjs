/**
 * /shop — Zeigt den aktuellen Fortnite Item Shop als Embed
 */

import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { fetchItemShop } from '../lib/fortnite-api.mjs';

export const data = new SlashCommandBuilder()
  .setName('shop')
  .setDescription('Zeigt den aktuellen Fortnite Item Shop');

export async function execute(interaction) {
  await interaction.deferReply();

  try {
    const { date, items } = await fetchItemShop('de');

    // Top Items nach Rarity sortieren
    const rarityOrder = { Mythic: 0, Exotic: 1, Legendary: 2, Epic: 3, Rare: 4, Uncommon: 5, Common: 6 };
    const sorted = [...items].sort(
      (a, b) => (rarityOrder[a.rarity] ?? 9) - (rarityOrder[b.rarity] ?? 9),
    );

    // Rare Items (90+ Tage nicht gesehen)
    const rareItems = items.filter((i) => i.daysSinceLast >= 90);

    // Featured Items (Top 10)
    const featured = sorted.slice(0, 10);

    const shopDate = new Date(date).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const embed = new EmbedBuilder()
      .setTitle(`🛒 Fortnite Item Shop — ${shopDate}`)
      .setColor(0xff0055)
      .setURL('https://fortnitenexus.space/item-shop')
      .setDescription(
        `**${items.length} Items** im heutigen Shop.\n\n` +
          featured
            .map(
              (i) =>
                `${rarityEmoji(i.rarity)} **${i.name}** — ${i.price} V-Bucks *(${i.rarity})*`,
            )
            .join('\n'),
      )
      .setFooter({
        text: 'Fortnite Nexus · fortnitenexus.space',
      })
      .setTimestamp();

    // Rare Items Feld
    if (rareItems.length > 0) {
      embed.addFields({
        name: '🔥 Seltene Returns',
        value: rareItems
          .slice(0, 5)
          .map((i) => `**${i.name}** — ${i.daysSinceLast} Tage nicht im Shop`)
          .join('\n'),
        inline: false,
      });
    }

    // CTA
    embed.addFields({
      name: '🔗 Alle Items ansehen',
      value: '[→ fortnitenexus.space/item-shop](https://fortnitenexus.space/item-shop)',
      inline: false,
    });

    await interaction.editReply({ embeds: [embed] });
  } catch (err) {
    console.error('Shop-Command Fehler:', err);
    await interaction.editReply({
      content: '❌ Item Shop konnte nicht geladen werden. Versuch es gleich nochmal.',
    });
  }
}

function rarityEmoji(rarity) {
  const map = {
    Mythic: '🟡',
    Exotic: '🟠',
    Legendary: '🟠',
    Epic: '🟣',
    Rare: '🔵',
    Uncommon: '🟢',
    Common: '⚪',
    Marvel: '🔴',
    Dc: '🔵',
    Icon: '🌟',
    Gaming: '🎮',
  };
  return map[rarity] || '⬜';
}
