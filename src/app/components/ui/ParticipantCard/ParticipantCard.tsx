'use client';

import type { Participant } from '@/src/core/domain/models/participant';

import Image from 'next/image';
import clsx from "clsx";
import Link from 'next/link';

import { useFavorites } from '@/src/app/contexts/FavoritesContext';
import { FavoriteButton } from '@/src/app/components/ui/FavoriteButton';

import classes from './ParticipantCard.module.scss';

export interface ParticipantProps {
  participant: Participant;
  path: string;
}

export const ParticipantCard = ({ participant, path }: ParticipantProps) => {
  const { isFavoriteParticipant, toggleFavoriteParticipant } = useFavorites();
  const favoritesParticipant = {
    id: participant.id,
    sportType: participant.sportType
  };

  const isInFavorites = isFavoriteParticipant(favoritesParticipant);

  const clickHandler = () => {
    toggleFavoriteParticipant(favoritesParticipant);
  };

  return (
    <div className={classes.participant}>
      <Link className={classes.link} href={`${path}${participant.id}`}>
        {participant.logo && (
          <Image
            src={participant.logo}
            alt={participant.name}
            width={50}
            height={50}
          />
        )}
        {participant.name}
      </Link>

      <FavoriteButton
        type={isInFavorites ? 'active' : 'empty'}
        onClick={clickHandler}
      />
    </div>
  );
};

ParticipantCard.displayName = 'ParticipantCard';