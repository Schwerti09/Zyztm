/**
 * /wishlist — Verwalte deine Skin-Wishlist
 *
 * Subcommands:
 *   /wishlist add <item>    — Item hinzufügen
 *   /wishlist remove <item> — Item entfernen
 *   /wishlist show          — Deine Wishlist anzeigen
 */

import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from '../lib/wishlist-store.mjs';

export const data = new SlashCommandBuilder()
  .setName('wishlist')
  .setDescription('Verwalte deine Fortnite Skin-Wishlist')
  .addSubcommand((sub) =>
    sub
      .setName('add')
      .setDescription('Füge ein Item zu deiner Wishlist hinzu')
      .addStringOption((opt) =>
        opt.setName('item').setDescription('Name des Items (z.B. "Renegade Raider")').setRequired(true),
      ),
  )
  .addSubcommand((sub) =>
    sub
      .setName('remove')
      .setDescription('Entferne ein Item von deiner Wishlist')
      .addStringOption((opt) =>
        opt.setName('item').setDescription('Name des Items').setRequired(true),
      ),
  )
  .addSubcommand((sub) =>
    sub.setName('show').setDescription('Zeige deine aktuelle Wishlist'),
  );

export async function execute(interaction) {
  const sub = interaction.options.getSubcommand();
  const userId = interaction.user.id;

  switch (sub) {
    case 'add': {
      const itemName = interaction.options.getString('item');
      const added = addToWishlist(userId, itemName);

      if (added) {
        await interaction.reply({
          content: `✅ **${itemName}** wurde zu deiner Wishlist hinzugefügt!\nIch benachrichtige dich, wenn es im Shop erscheint.`,
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: `ℹ️ **${itemName}** ist bereits auf deiner Wishlist.`,
          ephemeral: true,
        });
      }
      break;
    }

    case 'remove': {
      const itemName = interaction.options.getString('item');
      const removed = removeFromWishlist(userId, itemName);

      if (removed) {
        await interaction.reply({
          content: `🗑️ **${itemName}** wurde von deiner Wishlist entfernt.`,
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: `❌ **${itemName}** war nicht auf deiner Wishlist.`,
          ephemeral: true,
        });
      }
      break;
    }

    case 'show': {
      const items = getWishlist(userId);

      if (items.length === 0) {
        await interaction.reply({
          content: '📋 Deine Wishlist ist leer. Nutze `/wishlist add` um Items hinzuzufügen.',
          ephemeral: true,
        });
        return;
      }

      const embed = new EmbedBuilder()
        .setTitle('📋 Deine Fortnite Wishlist')
        .setColor(0x00f2ff)
        .setDescription(items.map((item, i) => `${i + 1}. **${item}**`).join('\n'))
        .setFooter({
          text: `${items.length} Item${items.length > 1 ? 's' : ''} · Du wirst benachrichtigt wenn eins im Shop erscheint`,
        });

      await interaction.reply({ embeds: [embed], ephemeral: true });
      break;
    }
  }
}
