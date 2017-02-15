import React from 'react';
import { CompositeDecorator } from 'draft-js';

import { applyImmutableEntity } from './draft-helpers';

const TOKEN_KEY = 'TOKEN';

const TokenSpan = (props) => (
  <span className="token">{props.children}</span>
);

const tokenStategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (char) => {
      const entityKey = char.getEntity();

      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === TOKEN_KEY
      );
    },
    callback,
  );
};

export const applyTokenEntity = applyImmutableEntity(TOKEN_KEY);
export const decorator = new CompositeDecorator([
  {
    strategy: tokenStategy,
    component: TokenSpan,
  }
]);
