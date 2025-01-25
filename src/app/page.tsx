"use client"

import { SpotifyPlaylist } from "@/components/SpotifyPlaylist"
import CategoryPuzzle from '@/components/CategoryPuzzle';

const sad = 'Somebody died';
const dance = 'Most known as a dance';
const dumb = 'Are song lyrics getting dumber these days?';
const piano = 'Spine-tingling piano serenades'

const config = {
  items: [
  {
    title: 'Holes In The Floor Of Heaven',
    description: 'Steve Wariner',
    category: sad
  },
  {
    title: 'Y.M.C.A.',
    description: 'Village People',
    category: dance
  },
  {
    title: 'Tick-Tack',
    description: 'ILLIT',
    category: dumb
  },
  {
    title: 'Cha Cha Slide',
    description: 'Mr. C',
    category: dance
  },
  {
    title: 'Macarena',
    description: 'Los Del Rio',
    category: dance
  },
  {
    title: 'Boot Scootin\' Boogie',
    description: 'Brooks & Dunn',
    category: dance
  },
  {
    title: 'If I Ain\'t Got You',
    description: 'Alica Keys',
    category: piano
  },
  {
    title: 'When I Was Your Man',
    description: 'Bruno Mars',
    category: piano
  },
  {
    title: 'Weightless',
    description: 'Black Lab',
    category: sad
  },
  {
    title: 'Someone like you',
    description: 'Adele',
    category: piano
  },
  {
    title: 'Work',
    description: 'Rihanna, Drake',
    category: dumb
  },
  {
    title: 'Honky Tonk Badonkadonk',
    description: 'Trace Adkins',
    category: dumb
  },
  {
    title: 'Whiskey Lullaby',
    description: 'Brad Paisley, Alison Krauss',
    category: sad
  },
  {
    title: 'Wake me up when September ends',
    description: 'Green Day',
    category: sad
  },
  {
    title: 'Gucci Gang',
    description: 'Lil Pump',
    category: dumb
  },
  {
    title: 'Almost is never enough',
    description: 'Ariana Grande, Nathan Sykes',
    category: piano
  }

  ]
}

export default function SpotifyConnections() {
  return (
    <div>
    <CategoryPuzzle config={config}></CategoryPuzzle>
    <SpotifyPlaylist></SpotifyPlaylist>
    </div>
  )
}

